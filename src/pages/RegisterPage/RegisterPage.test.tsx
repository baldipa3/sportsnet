// TODO - Fix tests - uncomment below

// /**
//  * @vitest-environment jsdom
//  */

// import {
//   render,
//   screen,
//   fireEvent,
//   waitFor,
//   cleanup,
// } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import RegisterPage from ".";
// import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

// // Mock the entire apiBase module
// vi.mock("../../services/apiBase", () => ({
//   axiosInstance: {
//     post: vi.fn(),
//   },
// }));

// // Mock react-router-dom
// const mockNavigate = vi.fn();
// vi.mock("react-router-dom", async () => {
//   const actual = await vi.importActual("react-router-dom");
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// // Import the mocked module to get type safety
// import { axiosInstance } from "../../services/apiBase";

// const renderWithRouter = (ui: React.ReactNode) => {
//   return render(<BrowserRouter>{ui}</BrowserRouter>);
// };

// describe("RegisterPage", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//     mockNavigate.mockClear();
//     // Mock localStorage
//     vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
//     vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => null);
//   });

//   afterEach(() => {
//     cleanup();
//     vi.restoreAllMocks();
//   });

//   it("renders form fields", () => {
//     renderWithRouter(<RegisterPage />);

//     expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Surname")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
//     expect(
//       screen.getByRole("button", { name: /register/i })
//     ).toBeInTheDocument();
//   });

//   it("shows validation error when required fields are empty", async () => {
//     renderWithRouter(<RegisterPage />);

//     const registerButton = screen.getByRole("button", { name: /register/i });
//     fireEvent.click(registerButton);

//     await waitFor(() => {
//       expect(screen.getByText(/Name is required/)).toBeInTheDocument();
//     });

//     expect(screen.getByText(/Surname is required/)).toBeInTheDocument();
//     expect(screen.getByText(/Email is required/)).toBeInTheDocument();
//     expect(screen.getByText(/Password is required/)).toBeInTheDocument();
//     expect(
//       screen.getByText(/Please confirm your password/)
//     ).toBeInTheDocument();
//   });

//   it("submits form and navigates on success", async () => {
//     const mockToken = "abc123";
//     (axiosInstance.post as any).mockResolvedValue({
//       data: { data: { token: mockToken } },
//     });

//     const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

//     renderWithRouter(<RegisterPage />);

//     // Fill out the form
//     fireEvent.change(screen.getByPlaceholderText("Name"), {
//       target: { value: "John" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Surname"), {
//       target: { value: "Doe" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Email"), {
//       target: { value: "john@example.com" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Password"), {
//       target: { value: "Password123" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
//       target: { value: "Password123" },
//     });

//     const registerButton = screen.getByRole("button", { name: /register/i });
//     fireEvent.click(registerButton);

//     await waitFor(() => {
//       expect(axiosInstance.post).toHaveBeenCalledWith("/users", {
//         user: {
//           name: "John",
//           surname: "Doe",
//           email: "john@example.com",
//           password: "Password123",
//           password_confirmation: "Password123",
//         },
//       });
//     });

//     expect(setItemSpy).toHaveBeenCalledWith("authToken", mockToken);
//     expect(mockNavigate).toHaveBeenCalledWith("/");
//   });

//   it("shows server error on API failure", async () => {
//     (axiosInstance.post as any).mockRejectedValue({
//       response: {
//         data: {
//           errors: {
//             email: ["has already been taken"],
//           },
//         },
//       },
//     });

//     renderWithRouter(<RegisterPage />);

//     // Fill out the form
//     fireEvent.change(screen.getByPlaceholderText("Name"), {
//       target: { value: "Jane" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Surname"), {
//       target: { value: "Doe" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Email"), {
//       target: { value: "jane@example.com" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Password"), {
//       target: { value: "Password123" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
//       target: { value: "Password123" },
//     });

//     const registerButton = screen.getByRole("button", { name: /register/i });
//     fireEvent.click(registerButton);

//     await waitFor(() => {
//       expect(screen.getByText(/has already been taken/)).toBeInTheDocument();
//     });
//   });
// });
