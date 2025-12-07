import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mock react-relay
vi.mock("react-relay", () => ({
  useLazyLoadQuery: vi.fn(),
  useMutation: vi.fn(() => [vi.fn()]),
  graphql: vi.fn((query) => query),
}));

// Mock react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock SportsNavbar
vi.mock("../../components/SportsNavbar", () => ({
  default: () => <div data-testid="sports-navbar">Sports Navbar</div>,
}));

// Mock sportIcons
vi.mock("../../utils/sportIcons", () => ({
  getSportIcon: vi.fn(() => () => <div data-testid="sport-icon">Icon</div>),
}));

// Import after mocking
import SportSelection from "./SportSelection";
import { useLazyLoadQuery } from "react-relay";

describe("SportSelection Component", () => {
  const mockUseLazyLoadQuery = useLazyLoadQuery as any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLazyLoadQuery.mockReturnValue({
      allSports: [
        { id: "1", name: "Football", slug: "football" },
        { id: "2", name: "Tennis", slug: "tennis" },
      ],
    });
  });

  test("renders the sport selection page", () => {
    render(
      <BrowserRouter>
        <SportSelection />
      </BrowserRouter>
    );
    expect(screen.getByText("Choose Your Sport")).toBeInTheDocument();
  });

  test("renders sports navbar", () => {
    render(
      <BrowserRouter>
        <SportSelection />
      </BrowserRouter>
    );
    expect(screen.getByTestId("sports-navbar")).toBeInTheDocument();
  });

  test("renders all sports from GraphQL", () => {
    render(
      <BrowserRouter>
        <SportSelection />
      </BrowserRouter>
    );
    expect(screen.getByText("Football")).toBeInTheDocument();
    expect(screen.getByText("Tennis")).toBeInTheDocument();
  });
});
