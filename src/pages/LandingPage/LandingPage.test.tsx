// TODO - Fix tests - uncomment below

// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { BrowserRouter } from "react-router-dom";
// import LoginUser from "./LoginUser";
// import { axiosInstance } from "../../services/apiBase";
// import { routes } from "../../services/apiRoutes";

// // Mock dependencies
// jest.mock("../../services/apiBase");
// jest.mock("../../services/apiRoutes");
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: jest.fn(),
// }));

// const mockNavigate = jest.fn();
// const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;
// const mockRoutes = routes as jest.Mocked<typeof routes>;

// // Mock localStorage
// const localStorageMock = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
//   clear: jest.fn(),
// };
// Object.defineProperty(window, "localStorage", {
//   value: localStorageMock,
// });

// const renderWithRouter = (component) => {
//   return render(<BrowserRouter>{component}</BrowserRouter>);
// };

// describe("LoginUser", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     const { useNavigate } = require("react-router-dom");
//     useNavigate.mockReturnValue(mockNavigate);
//     mockRoutes.loginUser.mockReturnValue("/api/login");
//   });

//   describe("Rendering", () => {
//     test("renders the welcome message", () => {
//       renderWithRouter(<LoginUser />);
//       expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
//     });

//     test("renders email input field", () => {
//       renderWithRouter(<LoginUser />);
//       const emailInput = screen.getByRole("textbox", { name: /email/i });
//       expect(emailInput).toBeInTheDocument();
//     });

//     test("renders password input field", () => {
//       renderWithRouter(<LoginUser />);
//       const passwordInput = screen.getByLabelText(/password/i);
//       expect(passwordInput).toBeInTheDocument();
//       expect(passwordInput).toHaveAttribute("type", "password");
//     });

//     test("renders login button", () => {
//       renderWithRouter(<LoginUser />);
//       const loginButton = screen.getByRole("button", { name: /login/i });
//       expect(loginButton).toBeInTheDocument();
//     });

//     test("renders registration link", () => {
//       renderWithRouter(<LoginUser />);
//       const registrationText = screen.getByText("Don't have an account?");
//       const registrationLink = screen.getByText("Register here");
//       expect(registrationText).toBeInTheDocument();
//       expect(registrationLink).toBeInTheDocument();
//     });
//   });

//   describe("Form Interactions", () => {
//     test("allows user to type in email field", async () => {
//       const user = userEvent.setup();
//       renderWithRouter(<LoginUser />);

//       const emailInput = screen.getByRole("textbox", { name: /email/i });
//       await user.type(emailInput, "test@example.com");

//       expect(emailInput).toHaveValue("test@example.com");
//     });

//     test("allows user to type in password field", async () => {
//       const user = userEvent.setup();
//       renderWithRouter(<LoginUser />);

//       const passwordInput = screen.getByLabelText(/password/i);
//       await user.type(passwordInput, "password123");

//       expect(passwordInput).toHaveValue("password123");
//     });
//   });

//   describe("Form Submission", () => {
//     test("submits form with correct data on successful login", async () => {
//       const user = userEvent.setup();
//       const mockResponse = {
//         data: {
//           data: {
//             token: "mock-auth-token",
//           },
//         },
//       };

//       mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

//       renderWithRouter(<LoginUser />);

//       const emailInput = screen.getByRole("textbox", { name: /email/i });
//       const passwordInput = screen.getByLabelText(/password/i);
//       const loginButton = screen.getByRole("button", { name: /login/i });

//       await user.type(emailInput, "test@example.com");
//       await user.type(passwordInput, "password123");
//       await user.click(loginButton);

//       expect(mockAxiosInstance.post).toHaveBeenCalledWith("/api/login", {
//         user: {
//           email: "test@example.com",
//           password: "password123",
//         },
//       });
//     });

//     test("stores token in localStorage and navigates on successful login", async () => {
//       const user = userEvent.setup();
//       const mockResponse = {
//         data: {
//           data: {
//             token: "mock-auth-token",
//           },
//         },
//       };

//       mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

//       renderWithRouter(<LoginUser />);

//       const emailInput = screen.getByRole("textbox", { name: /email/i });
//       const passwordInput = screen.getByLabelText(/password/i);
//       const loginButton = screen.getByRole("button", { name: /login/i });

//       await user.type(emailInput, "test@example.com");
//       await user.type(passwordInput, "password123");
//       await user.click(loginButton);

//       await waitFor(() => {
//         expect(localStorageMock.setItem).toHaveBeenCalledWith(
//           "authToken",
//           "mock-auth-token"
//         );
//         expect(mockNavigate).toHaveBeenCalledWith("/sports");
//       });
//     });

//     test("handles login response without token", async () => {
//       const user = userEvent.setup();
//       const consoleSpy = jest
//         .spyOn(console, "error")
//         .mockImplementation(() => {});
//       const mockResponse = {
//         data: {
//           data: {},
//         },
//       };

//       mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

//       renderWithRouter(<LoginUser />);

//       const emailInput = screen.getByRole("textbox", { name: /email/i });
//       const passwordInput = screen.getByLabelText(/password/i);
//       const loginButton = screen.getByRole("button", { name: /login/i });

//       await user.type(emailInput, "test@example.com");
//       await user.type(passwordInput, "password123");
//       await user.click(loginButton);

//       await waitFor(() => {
//         expect(consoleSpy).toHaveBeenCalledWith(
//           "No token received from server"
//         );
//         expect(localStorageMock.setItem).not.toHaveBeenCalled();
//         expect(mockNavigate).not.toHaveBeenCalled();
//       });

//       consoleSpy.mockRestore();
//     });

//     test("displays server error on failed login", async () => {
//       const user = userEvent.setup();
//       const mockError = {
//         response: {
//           data: {
//             errors: "Invalid credentials",
//           },
//         },
//       };

//       mockAxiosInstance.post.mockRejectedValueOnce(mockError);

//       renderWithRouter(<LoginUser />);

//       const emailInput = screen.getByRole("textbox", { name: /email/i });
//       const passwordInput = screen.getByLabelText(/password/i);
//       const loginButton = screen.getByRole("button", { name: /login/i });

//       await user.type(emailInput, "test@example.com");
//       await user.type(passwordInput, "wrongpassword");
//       await user.click(loginButton);

//       await waitFor(() => {
//         expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
//       });
//     });

//     test("handles network error gracefully", async () => {
//       const user = userEvent.setup();
//       const mockError = {
//         response: undefined,
//       };

//       mockAxiosInstance.post.mockRejectedValueOnce(mockError);

//       renderWithRouter(<LoginUser />);

//       const emailInput = screen.getByRole("textbox", { name: /email/i });
//       const passwordInput = screen.getByLabelText(/password/i);
//       const loginButton = screen.getByRole("button", { name: /login/i });

//       await user.type(emailInput, "test@example.com");
//       await user.type(passwordInput, "password123");
//       await user.click(loginButton);

//       await waitFor(() => {
//         // Should not crash and should not show error since error.response is undefined
//         expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
//       });
//     });
//   });

//   describe("Error Handling", () => {
//     test("does not display error message initially", () => {
//       renderWithRouter(<LoginUser />);
//       expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
//     });

//     test("clears error message on successful login", async () => {
//       const user = userEvent.setup();

//       // First, simulate an error
//       const mockError = {
//         response: {
//           data: {
//             errors: "Invalid credentials",
//           },
//         },
//       };
//       mockAxiosInstance.post.mockRejectedValueOnce(mockError);

//       renderWithRouter(<LoginUser />);

//       const emailInput = screen.getByRole("textbox", { name: /email/i });
//       const passwordInput = screen.getByLabelText(/password/i);
//       const loginButton = screen.getByRole("button", { name: /login/i });

//       await user.type(emailInput, "test@example.com");
//       await user.type(passwordInput, "wrongpassword");
//       await user.click(loginButton);

//       await waitFor(() => {
//         expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
//       });

//       // Now simulate successful login
//       const mockResponse = {
//         data: {
//           data: {
//             token: "mock-auth-token",
//           },
//         },
//       };
//       mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

//       await user.clear(passwordInput);
//       await user.type(passwordInput, "correctpassword");
//       await user.click(loginButton);

//       await waitFor(() => {
//         expect(mockNavigate).toHaveBeenCalledWith("/sports");
//       });
//     });
//   });
// });
