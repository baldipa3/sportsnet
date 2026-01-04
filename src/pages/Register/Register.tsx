import { useForm, type SubmitHandler } from "react-hook-form";
import { axiosInstance } from "@/services/apiBase";
import { routes } from "@/services/apiRoutes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IFormInput {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    setError,
    watch,
    handleSubmit,
  } = useForm<IFormInput>();
  const watchPassword = watch("password");
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const params = {
      user: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      },
    };
    axiosInstance
      .post(routes.registerUser(), params)
      .then(function (response) {
        const token = response.data?.data?.token;

        if (token) {
          localStorage.setItem("authToken", token);
          navigate("/onboarding/city");
        } else {
          console.error("No token received from server");
        }
      })
      .catch(function (error) {
        const apiErrors = error.response?.data?.errors;

        if (apiErrors) {
          Object.entries(apiErrors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              setError(field as keyof IFormInput, {
                type: "server",
                message: messages.join(", "),
              });
            }
          });
        } else {
          setServerError("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white flex flex-col items-center px-4">
      <header className="w-full py-6 flex justify-center border-b border-gray-800">
        <h1 className="text-5xl font-bold text-green-400">SportsNet</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-12 max-w-6xl w-full">
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-2xl font-semibold text-green-400 mb-4">
            Create Your Account
          </h3>
          {serverError && (
            <div className="text-red-500 my-4 text-sm text-center">
              {serverError}
            </div>
          )}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Name field */}
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("name", {
                required: "Name is required.",
                maxLength: {
                  value: 30,
                  message: "Can't exceed 30 characters",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-400 text-sm">
                {errors.name.message}
              </span>
            )}

            {/* Surname field */}
            <input
              type="text"
              placeholder="Surname"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("surname", {
                required: "Surname is required.",
                maxLength: {
                  value: 30,
                  message: "Can't exceed 30 characters",
                },
              })}
            />
            {errors.surname && (
              <span className="text-red-400 text-sm">
                {errors.surname.message}
              </span>
            )}

            {/* Email field */}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
                maxLength: {
                  value: 50,
                  message: "Email must be less than 50 characters",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-400 text-sm mt-1 block">
                {errors.email.message}
              </span>
            )}

            {/* Password field */}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("password", {
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
              })}
            />
            {errors.password && (
              <span className="text-red-400 text-sm mt-1 block">
                {errors.password.message}
              </span>
            )}

            {/* Password Confirmation field */}
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("passwordConfirmation", {
                required: "Please confirm your password",
                validate: (value) => {
                  if (value !== watchPassword) {
                    return "Passwords do not match";
                  }
                },
              })}
            />
            {errors.passwordConfirmation && (
              <span className="text-red-400 text-sm mt-1 block">
                {errors.passwordConfirmation.message}
              </span>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-colors"
            >
              Register
            </button>
          </form>
          <p className="text-gray-400 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-green-400 hover:underline">
              Login here
            </a>
          </p>
        </section>
      </main>

      <footer className="w-full py-6 border-t border-gray-800 flex flex-col items-center gap-2">
        <p className="text-gray-500">© 2025 SportsNet. All rights reserved.</p>
        <a href="#" className="text-green-400 hover:underline">
          Contact Us
        </a>
      </footer>
    </div>
  );
};
