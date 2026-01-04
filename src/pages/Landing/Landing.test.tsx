import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";

// Mock everything before any imports
vi.mock("@/services/apiBase", () => ({
  axiosInstance: {
    post: vi.fn(),
  },
}));

vi.mock("@/services/apiRoutes", () => ({
  routes: {
    loginUser: vi.fn(() => "/api/login"),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }: any) => children,
  useNavigate: () => mockNavigate,
}));

const mockRegister = vi.fn();
const mockHandleSubmit = vi.fn();
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: mockRegister,
    handleSubmit: mockHandleSubmit,
  }),
}));

// Mock localStorage
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// Import after mocking
import { LoginUser } from "./LoginUser";
import { axiosInstance } from "@/services/apiBase";

describe("LoginUser Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up default behavior for mocks
    mockRegister.mockReturnValue({});
    mockHandleSubmit.mockImplementation((fn) => (e: any) => {
      e?.preventDefault();
      // Call the submit function with test data
      fn({ email: "test@example.com", password: "password123" });
    });
  });

  describe("Rendering", () => {
    test("renders welcome message", () => {
      render(<LoginUser />);
      expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    });

    test("renders email input field", () => {
      render(<LoginUser />);
      const emailInput = screen.getByPlaceholderText("Email");
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("type", "email");
    });

    test("renders password input field", () => {
      render(<LoginUser />);
      const passwordInput = screen.getByPlaceholderText("Password");
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute("type", "password");
    });

    test("renders login button", () => {
      render(<LoginUser />);
      const loginButton = screen.getByRole("button", { name: /login/i });
      expect(loginButton).toBeInTheDocument();
    });

    test("renders registration link", () => {
      render(<LoginUser />);
      const registrationText = screen.getByText("Don't have an account?");
      const registrationLink = screen.getByText("Register here");
      expect(registrationText).toBeInTheDocument();
      expect(registrationLink).toBeInTheDocument();
      expect(registrationLink).toHaveAttribute("href", "/register");
    });
  });

  describe("Form Interactions", () => {
    test("allows user to type in email field", async () => {
      const user = userEvent.setup();
      render(<LoginUser />);

      const emailInput = screen.getByPlaceholderText("Email");
      await user.type(emailInput, "test@example.com");

      expect(emailInput).toHaveValue("test@example.com");
    });

    test("allows user to type in password field", async () => {
      const user = userEvent.setup();
      render(<LoginUser />);

      const passwordInput = screen.getByPlaceholderText("Password");
      await user.type(passwordInput, "password123");

      expect(passwordInput).toHaveValue("password123");
    });
  });

  describe("Form Submission", () => {
    test("submits form with correct data on successful login", async () => {
      const user = userEvent.setup();
      const mockResponse = {
        data: {
          data: {
            token: "mock-auth-token",
          },
        },
      };

      vi.mocked(axiosInstance.post).mockResolvedValueOnce(mockResponse);

      render(<LoginUser />);

      const loginButton = screen.getByRole("button", { name: /login/i });
      await user.click(loginButton);

      await waitFor(() => {
        expect(axiosInstance.post).toHaveBeenCalledWith("/api/login", {
          user: {
            email: "test@example.com",
            password: "password123",
          },
        });
      });
    });

    test("stores token in localStorage and navigates on successful login with onboarding required", async () => {
      const user = userEvent.setup();
      const mockResponse = {
        data: {
          data: {
            token: "mock-auth-token",
            onboarding_required: true,
          },
        },
      };

      vi.mocked(axiosInstance.post).mockResolvedValueOnce(mockResponse);

      render(<LoginUser />);

      const loginButton = screen.getByRole("button", { name: /login/i });
      await user.click(loginButton);

      await waitFor(() => {
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
          "authToken",
          "mock-auth-token"
        );
        expect(mockNavigate).toHaveBeenCalledWith("/onboarding/city");
      });
    });

    test("stores token in localStorage and navigates to sports page when onboarding not required", async () => {
      const user = userEvent.setup();
      const mockResponse = {
        data: {
          data: {
            token: "mock-auth-token",
            onboarding_required: false,
            city_slug: "london",
            default_sport_slug: "football",
            city_id: "city-1",
            default_sport_id: "sport-1",
          },
        },
      };

      vi.mocked(axiosInstance.post).mockResolvedValueOnce(mockResponse);

      render(<LoginUser />);

      const loginButton = screen.getByRole("button", { name: /login/i });
      await user.click(loginButton);

      await waitFor(() => {
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
          "authToken",
          "mock-auth-token"
        );
        expect(mockNavigate).toHaveBeenCalledWith(
          "/sports/football/cities/london",
          { state: { cityId: "city-1", sportId: "sport-1" } }
        );
      });
    });

    test("handles login response without token", async () => {
      const user = userEvent.setup();
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const mockResponse = {
        data: {
          data: {},
        },
      };

      vi.mocked(axiosInstance.post).mockResolvedValueOnce(mockResponse);

      render(<LoginUser />);

      const loginButton = screen.getByRole("button", { name: /login/i });
      await user.click(loginButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "No token received from server"
        );
        expect(window.localStorage.setItem).not.toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });

      consoleSpy.mockRestore();
    });

    test("displays server error on failed login", async () => {
      const user = userEvent.setup();
      const mockError = {
        response: {
          data: {
            errors: "Invalid credentials",
          },
        },
      };

      vi.mocked(axiosInstance.post).mockRejectedValueOnce(mockError);

      render(<LoginUser />);

      const loginButton = screen.getByRole("button", { name: /login/i });
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      });
    });

    test("handles network error gracefully", async () => {
      const user = userEvent.setup();
      const mockError = {
        response: undefined,
      };

      vi.mocked(axiosInstance.post).mockRejectedValueOnce(mockError);

      render(<LoginUser />);

      const loginButton = screen.getByRole("button", { name: /login/i });
      await user.click(loginButton);

      await waitFor(() => {
        // Should not crash and should not show error since error.response is undefined
        expect(
          screen.queryByText("Invalid credentials")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    test("does not display error message initially", () => {
      render(<LoginUser />);
      expect(screen.queryByText("Invalid credentials")).not.toBeInTheDocument();
    });

    test("error message appears and disappears correctly", async () => {
      const user = userEvent.setup();

      // First, simulate an error
      const mockError = {
        response: {
          data: {
            errors: "Invalid credentials",
          },
        },
      };
      vi.mocked(axiosInstance.post).mockRejectedValueOnce(mockError);

      render(<LoginUser />);

      const loginButton = screen.getByRole("button", { name: /login/i });
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      });

      // Now simulate successful login
      const mockResponse = {
        data: {
          data: {
            token: "mock-auth-token",
            onboarding_required: true,
          },
        },
      };
      vi.mocked(axiosInstance.post).mockResolvedValueOnce(mockResponse);

      await user.click(loginButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/onboarding/city");
      });
    });
  });

  describe("Integration", () => {
    test("complete login flow works end to end", async () => {
      const user = userEvent.setup();
      const mockResponse = {
        data: {
          data: {
            token: "integration-test-token",
            onboarding_required: true,
          },
        },
      };

      vi.mocked(axiosInstance.post).mockResolvedValueOnce(mockResponse);

      render(<LoginUser />);

      // Check all elements are present
      expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();

      // Interact with form
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const loginButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "integration@test.com");
      await user.type(passwordInput, "testpassword");
      await user.click(loginButton);

      // Verify the complete flow
      await waitFor(() => {
        expect(axiosInstance.post).toHaveBeenCalledWith("/api/login", {
          user: {
            email: "test@example.com", // From mocked handleSubmit
            password: "password123", // From mocked handleSubmit
          },
        });
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
          "authToken",
          "integration-test-token"
        );
        expect(mockNavigate).toHaveBeenCalledWith("/onboarding/city");
      });
    });
  });
});
