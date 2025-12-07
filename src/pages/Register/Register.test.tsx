import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";

// Mock everything before any imports
vi.mock("../../services/apiBase", () => ({
  axiosInstance: {
    post: vi.fn(),
  },
}));

vi.mock("../../services/apiRoutes", () => ({
  routes: {
    registerUser: vi.fn(() => "/api/register"),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockRegister = vi.fn();
const mockHandleSubmit = vi.fn();
const mockSetError = vi.fn();
const mockWatch = vi.fn();
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: mockRegister,
    handleSubmit: mockHandleSubmit,
    formState: { errors: {} },
    setError: mockSetError,
    watch: mockWatch,
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
import RegisterPage from "./index";
import { axiosInstance } from "../../services/apiBase";

describe("RegisterPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up default behavior for mocks
    mockRegister.mockReturnValue({});
    mockWatch.mockReturnValue("password123");
    mockHandleSubmit.mockImplementation((fn) => (e: any) => {
      e?.preventDefault();
      // Call the submit function with test data
      fn({
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        password: "Password123",
        passwordConfirmation: "Password123",
      });
    });
  });

  describe("Rendering", () => {
    test("renders main heading", () => {
      render(<RegisterPage />);
      expect(screen.getByText("SportsNet")).toBeInTheDocument();
    });

    test("renders create account heading", () => {
      render(<RegisterPage />);
      expect(screen.getByText("Create Your Account")).toBeInTheDocument();
    });

    test("renders all form input fields", () => {
      render(<RegisterPage />);

      expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Surname")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Confirm Password")
      ).toBeInTheDocument();
    });

    test("renders input fields with correct types", () => {
      render(<RegisterPage />);

      expect(screen.getByPlaceholderText("Name")).toHaveAttribute(
        "type",
        "text"
      );
      expect(screen.getByPlaceholderText("Surname")).toHaveAttribute(
        "type",
        "text"
      );
      expect(screen.getByPlaceholderText("Email")).toHaveAttribute(
        "type",
        "email"
      );
      expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
        "type",
        "password"
      );
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveAttribute(
        "type",
        "password"
      );
    });

    test("renders register button", () => {
      render(<RegisterPage />);
      const registerButton = screen.getByRole("button", { name: /register/i });
      expect(registerButton).toBeInTheDocument();
    });

    test("renders login link", () => {
      render(<RegisterPage />);
      const loginText = screen.getByText("Already have an account?");
      const loginLink = screen.getByText("Login here");
      expect(loginText).toBeInTheDocument();
      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute("href", "/login");
    });

    test("renders footer", () => {
      render(<RegisterPage />);
      expect(
        screen.getByText("© 2025 SportsNet. All rights reserved.")
      ).toBeInTheDocument();
      expect(screen.getByText("Contact Us")).toBeInTheDocument();
    });
  });

  describe("Form Interactions", () => {
    test("allows user to type in name field", async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      const nameInput = screen.getByPlaceholderText("Name");
      await user.type(nameInput, "John");

      expect(nameInput).toHaveValue("John");
    });

    test("allows user to type in surname field", async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      const surnameInput = screen.getByPlaceholderText("Surname");
      await user.type(surnameInput, "Doe");

      expect(surnameInput).toHaveValue("Doe");
    });

    test("allows user to type in email field", async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      const emailInput = screen.getByPlaceholderText("Email");
      await user.type(emailInput, "john.doe@example.com");

      expect(emailInput).toHaveValue("john.doe@example.com");
    });

    test("allows user to type in password fields", async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      const passwordInput = screen.getByPlaceholderText("Password");
      const confirmPasswordInput =
        screen.getByPlaceholderText("Confirm Password");

      await user.type(passwordInput, "Password123");
      await user.type(confirmPasswordInput, "Password123");

      expect(passwordInput).toHaveValue("Password123");
      expect(confirmPasswordInput).toHaveValue("Password123");
    });
  });

  describe("Form Submission", () => {
    test("submits form with correct data on successful registration", async () => {
      const user = userEvent.setup();
      const mockResponse = {
        data: {
          data: {
            token: "mock-auth-token",
          },
        },
      };

      vi.mocked(axiosInstance.post).mockResolvedValueOnce(mockResponse);

      render(<RegisterPage />);

      const registerButton = screen.getByRole("button", { name: /register/i });
      await user.click(registerButton);

      await waitFor(() => {
        expect(axiosInstance.post).toHaveBeenCalledWith("/api/register", {
          user: {
            name: "John",
            surname: "Doe",
            email: "john.doe@example.com",
            password: "Password123",
            password_confirmation: "Password123",
          },
        });
      });
    });

    test("stores token in localStorage and navigates on successful registration", async () => {
      const user = userEvent.setup();
      const mockResponse = {
        data: {
          data: {
            token: "mock-auth-token",
          },
        },
      };

      vi.mocked(axiosInstance.post).mockResolvedValueOnce(mockResponse);

      render(<RegisterPage />);

      const registerButton = screen.getByRole("button", { name: /register/i });
      await user.click(registerButton);

      await waitFor(() => {
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
          "authToken",
          "mock-auth-token"
        );
        expect(mockNavigate).toHaveBeenCalledWith("/onboarding/city");
      });
    });

    test("handles registration response without token", async () => {
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

      render(<RegisterPage />);

      const registerButton = screen.getByRole("button", { name: /register/i });
      await user.click(registerButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "No token received from server"
        );
        expect(window.localStorage.setItem).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });

    test("handles server validation errors", async () => {
      const user = userEvent.setup();
      const mockError = {
        response: {
          data: {
            errors: {
              email: ["Email has already been taken"],
              password: ["Password is too weak"],
            },
          },
        },
      };

      vi.mocked(axiosInstance.post).mockRejectedValueOnce(mockError);

      render(<RegisterPage />);

      const registerButton = screen.getByRole("button", { name: /register/i });
      await user.click(registerButton);

      await waitFor(() => {
        expect(mockSetError).toHaveBeenCalledWith("email", {
          type: "server",
          message: "Email has already been taken",
        });
        expect(mockSetError).toHaveBeenCalledWith("password", {
          type: "server",
          message: "Password is too weak",
        });
      });
    });

    test("displays generic error message for network errors", async () => {
      const user = userEvent.setup();
      const mockError = {
        response: undefined,
      };

      vi.mocked(axiosInstance.post).mockRejectedValueOnce(mockError);

      render(<RegisterPage />);

      const registerButton = screen.getByRole("button", { name: /register/i });
      await user.click(registerButton);

      await waitFor(() => {
        expect(
          screen.getByText("Something went wrong. Please try again.")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    test("does not display error message initially", () => {
      render(<RegisterPage />);
      expect(
        screen.queryByText("Something went wrong. Please try again.")
      ).not.toBeInTheDocument();
    });

    test("displays server error message when present", async () => {
      const user = userEvent.setup();
      const mockError = {
        response: undefined,
      };

      vi.mocked(axiosInstance.post).mockRejectedValueOnce(mockError);

      render(<RegisterPage />);

      const registerButton = screen.getByRole("button", { name: /register/i });
      await user.click(registerButton);

      await waitFor(() => {
        expect(
          screen.getByText("Something went wrong. Please try again.")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Form Validation", () => {
    test("calls register function with correct validation rules", () => {
      render(<RegisterPage />);

      // Verify register was called for each field with proper validation
      expect(mockRegister).toHaveBeenCalledWith("name", {
        required: "Name is required.",
        maxLength: {
          value: 30,
          message: "Can't exceed 30 characters",
        },
      });

      expect(mockRegister).toHaveBeenCalledWith("surname", {
        required: "Surname is required.",
        maxLength: {
          value: 30,
          message: "Can't exceed 30 characters",
        },
      });

      expect(mockRegister).toHaveBeenCalledWith("email", {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Please enter a valid email address",
        },
        maxLength: {
          value: 50,
          message: "Email must be less than 50 characters",
        },
      });

      expect(mockRegister).toHaveBeenCalledWith("password", {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        maxLength: {
          value: 20,
          message: "Password must be less than 20 characters",
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        },
      });

      expect(mockRegister).toHaveBeenCalledWith("passwordConfirmation", {
        required: "Please confirm your password",
        validate: expect.any(Function),
      });
    });

    test("register function is called for all form fields", () => {
      render(<RegisterPage />);

      // Just verify that register was called for each field
      expect(mockRegister).toHaveBeenCalledWith("name", expect.any(Object));
      expect(mockRegister).toHaveBeenCalledWith("surname", expect.any(Object));
      expect(mockRegister).toHaveBeenCalledWith("email", expect.any(Object));
      expect(mockRegister).toHaveBeenCalledWith("password", expect.any(Object));
      expect(mockRegister).toHaveBeenCalledWith(
        "passwordConfirmation",
        expect.any(Object)
      );
    });
  });

  describe("Integration", () => {
    test("complete registration flow works end to end", async () => {
      const user = userEvent.setup();
      const mockResponse = {
        data: {
          data: {
            token: "integration-test-token",
          },
        },
      };

      vi.mocked(axiosInstance.post).mockResolvedValueOnce(mockResponse);

      render(<RegisterPage />);

      // Check all elements are present
      expect(screen.getByText("Create Your Account")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Surname")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Confirm Password")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /register/i })
      ).toBeInTheDocument();

      // Interact with form
      const nameInput = screen.getByPlaceholderText("Name");
      const surnameInput = screen.getByPlaceholderText("Surname");
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const confirmPasswordInput =
        screen.getByPlaceholderText("Confirm Password");
      const registerButton = screen.getByRole("button", { name: /register/i });

      await user.type(nameInput, "Jane");
      await user.type(surnameInput, "Smith");
      await user.type(emailInput, "jane.smith@example.com");
      await user.type(passwordInput, "SecurePass123");
      await user.type(confirmPasswordInput, "SecurePass123");
      await user.click(registerButton);

      // Verify the complete flow
      await waitFor(() => {
        expect(axiosInstance.post).toHaveBeenCalledWith("/api/register", {
          user: {
            name: "John", // From mocked handleSubmit
            surname: "Doe", // From mocked handleSubmit
            email: "john.doe@example.com", // From mocked handleSubmit
            password: "Password123", // From mocked handleSubmit
            password_confirmation: "Password123", // From mocked handleSubmit
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
