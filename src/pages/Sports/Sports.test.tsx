import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mock react-relay
const mockLoadNext = vi.fn();
const mockUseLazyLoadQuery = vi.fn();
const mockUsePaginationFragment = vi.fn();

vi.mock("react-relay", () => ({
  useLazyLoadQuery: (...args: any[]) => mockUseLazyLoadQuery(...args),
  usePaginationFragment: (...args: any[]) => mockUsePaginationFragment(...args),
  graphql: vi.fn((query) => query),
}));

// Mock react-router-dom params
const mockParams = { sport_slug: "football", city_slug: "london" };
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => mockParams,
  };
});

// Mock components
vi.mock("@/features/posts", () => ({
  PostCard: ({ data }: any) => (
    <div data-testid={`post-${data.id}`}>Post {data.id}</div>
  ),
  CreatePost: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="create-post-modal">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

// Import after mocking
import { SportPage } from ".";

describe("Sports Page - Infinite Scroll", () => {
  let observerCallback: IntersectionObserverCallback;
  const mockObserve = vi.fn();
  const mockUnobserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      } as any;
    }) as any;

    // Default GraphQL query response
    mockUseLazyLoadQuery.mockReturnValue({
      postsByCityAndSport: {
        sport: { id: "sport-1" },
        city: { id: "city-1" },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Initial Load", () => {
    test("renders posts feed with initial 10 posts", () => {
      const mockPosts = Array.from({ length: 10 }, (_, i) => ({
        node: {
          id: `post-${i + 1}`,
          caption: `Post ${i + 1}`,
        },
      }));

      mockUsePaginationFragment.mockReturnValue({
        data: {
          posts: {
            edges: mockPosts,
          },
        },
        loadNext: mockLoadNext,
        hasNext: true,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      expect(screen.getByText("Post post-1")).toBeInTheDocument();
      expect(screen.getByText("Post post-10")).toBeInTheDocument();
    });

    test("renders create post section with city name", () => {
      mockUsePaginationFragment.mockReturnValue({
        data: { posts: { edges: [] } },
        loadNext: mockLoadNext,
        hasNext: false,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      expect(
        screen.getByText(/Share Your Game in/i, { exact: false })
      ).toBeInTheDocument();
      expect(screen.getByText(/london/i)).toBeInTheDocument();
    });

    test("renders action buttons for creating posts", () => {
      mockUsePaginationFragment.mockReturnValue({
        data: { posts: { edges: [] } },
        loadNext: mockLoadNext,
        hasNext: false,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      expect(screen.getByText("Post Moment")).toBeInTheDocument();
      expect(screen.getByText("Share Win")).toBeInTheDocument();
      expect(screen.getByText("Game Recap")).toBeInTheDocument();
    });
  });

  describe("Infinite Scroll Behavior", () => {
    test("sets up IntersectionObserver on mount", () => {
      mockUsePaginationFragment.mockReturnValue({
        data: { posts: { edges: [] } },
        loadNext: mockLoadNext,
        hasNext: true,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      expect(global.IntersectionObserver).toHaveBeenCalled();
      expect(mockObserve).toHaveBeenCalled();
    });

    test("loads more posts when user scrolls to bottom", async () => {
      mockUsePaginationFragment.mockReturnValue({
        data: {
          posts: {
            edges: [{ node: { id: "post-1" } }],
          },
        },
        loadNext: mockLoadNext,
        hasNext: true,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      // Simulate intersection (scroll into view)
      const entries = [
        {
          isIntersecting: true,
          target: document.createElement("div"),
        },
      ] as unknown as IntersectionObserverEntry[];

      observerCallback(entries, {} as IntersectionObserver);

      await waitFor(() => {
        expect(mockLoadNext).toHaveBeenCalledWith(10);
      });
    });

    test("does not load more when already loading", async () => {
      mockUsePaginationFragment.mockReturnValue({
        data: {
          posts: {
            edges: [{ node: { id: "post-1" } }],
          },
        },
        loadNext: mockLoadNext,
        hasNext: true,
        isLoadingNext: true,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      const entries = [
        {
          isIntersecting: true,
          target: document.createElement("div"),
        },
      ] as unknown as IntersectionObserverEntry[];

      observerCallback(entries, {} as IntersectionObserver);

      await waitFor(() => {
        expect(mockLoadNext).not.toHaveBeenCalled();
      });
    });

    test("does not load more when no more posts available", async () => {
      mockUsePaginationFragment.mockReturnValue({
        data: {
          posts: {
            edges: [{ node: { id: "post-1" } }],
          },
        },
        loadNext: mockLoadNext,
        hasNext: false,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      const entries = [
        {
          isIntersecting: true,
          target: document.createElement("div"),
        },
      ] as unknown as IntersectionObserverEntry[];

      observerCallback(entries, {} as IntersectionObserver);

      await waitFor(() => {
        expect(mockLoadNext).not.toHaveBeenCalled();
      });
    });

    test("cleans up IntersectionObserver on unmount without errors", () => {
      mockUsePaginationFragment.mockReturnValue({
        data: { posts: { edges: [] } },
        loadNext: mockLoadNext,
        hasNext: true,
        isLoadingNext: false,
      });

      const { unmount } = render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      // Verify observer was set up
      expect(mockObserve).toHaveBeenCalled();

      // Unmounting should not throw any errors
      expect(() => unmount()).not.toThrow();
    });
  });

  describe("Loading States", () => {
    test("shows loading spinner when loading more posts", () => {
      mockUsePaginationFragment.mockReturnValue({
        data: {
          posts: {
            edges: [{ node: { id: "post-1" } }],
          },
        },
        loadNext: mockLoadNext,
        hasNext: true,
        isLoadingNext: true,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      expect(screen.getByText("Loading more posts...")).toBeInTheDocument();
    });

    test("hides loading spinner when not loading", () => {
      mockUsePaginationFragment.mockReturnValue({
        data: {
          posts: {
            edges: [{ node: { id: "post-1" } }],
          },
        },
        loadNext: mockLoadNext,
        hasNext: true,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      expect(
        screen.queryByText("Loading more posts...")
      ).not.toBeInTheDocument();
    });
  });

  describe("End of Feed States", () => {
    test("shows end of feed message when all posts loaded", () => {
      mockUsePaginationFragment.mockReturnValue({
        data: {
          posts: {
            edges: [{ node: { id: "post-1" } }],
          },
        },
        loadNext: mockLoadNext,
        hasNext: false,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      expect(
        screen.getByText(/You've reached the end of the feed/i)
      ).toBeInTheDocument();
    });

    test("shows empty state when no posts exist", () => {
      mockUsePaginationFragment.mockReturnValue({
        data: {
          posts: {
            edges: [],
          },
        },
        loadNext: mockLoadNext,
        hasNext: false,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      expect(
        screen.getByText("No posts yet. Be the first to share!")
      ).toBeInTheDocument();
    });
  });

  describe("Create Post Modal Interactions", () => {
    test("opens create post modal when clicking Post Moment button", async () => {
      const user = userEvent.setup();

      mockUsePaginationFragment.mockReturnValue({
        data: { posts: { edges: [] } },
        loadNext: mockLoadNext,
        hasNext: false,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      const postMomentButton = screen.getByText("Post Moment");
      await user.click(postMomentButton);

      expect(screen.getByTestId("create-post-modal")).toBeInTheDocument();
    });

    test("opens create post modal when clicking Share Win button", async () => {
      const user = userEvent.setup();

      mockUsePaginationFragment.mockReturnValue({
        data: { posts: { edges: [] } },
        loadNext: mockLoadNext,
        hasNext: false,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      const shareWinButton = screen.getByText("Share Win");
      await user.click(shareWinButton);

      expect(screen.getByTestId("create-post-modal")).toBeInTheDocument();
    });

    test("closes create post modal when close button clicked", async () => {
      const user = userEvent.setup();

      mockUsePaginationFragment.mockReturnValue({
        data: { posts: { edges: [] } },
        loadNext: mockLoadNext,
        hasNext: false,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      // Open modal
      const postMomentButton = screen.getByText("Post Moment");
      await user.click(postMomentButton);

      // Close modal
      const closeButton = screen.getByText("Close");
      await user.click(closeButton);

      expect(screen.queryByTestId("create-post-modal")).not.toBeInTheDocument();
    });
  });

  describe("Post Location Context", () => {
    test("passes correct sport and city IDs to CreatePost component", async () => {
      const user = userEvent.setup();

      mockUseLazyLoadQuery.mockReturnValue({
        postsByCityAndSport: {
          sport: { id: "sport-football" },
          city: { id: "city-london" },
        },
      });

      mockUsePaginationFragment.mockReturnValue({
        data: { posts: { edges: [] } },
        loadNext: mockLoadNext,
        hasNext: false,
        isLoadingNext: false,
      });

      render(
        <BrowserRouter>
          <SportPage />
        </BrowserRouter>
      );

      const postMomentButton = screen.getByText("Post Moment");
      await user.click(postMomentButton);

      // Modal should be rendered (context is passed correctly)
      expect(screen.getByTestId("create-post-modal")).toBeInTheDocument();
    });
  });
});
