import { useForm, type SubmitHandler } from "react-hook-form";
import { axiosInstance } from "@/services/apiBase";
import { routes } from "@/services/apiRoutes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

export const LoginUser = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const params = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    axiosInstance
      .post(routes.loginUser(), params)
      .then(function (response) {
        const token = response.data?.data?.token;
        const onboarding_required = response.data?.data?.onboarding_required;

        const citySlug = response.data?.data?.city_slug;
        const sportSlug = response.data?.data?.default_sport_slug;
        const cityId = response.data?.data?.city_id;
        const sportId = response.data?.data?.default_sport_id;

        if (token && onboarding_required) {
          localStorage.setItem("authToken", token);

          navigate("/onboarding/city");
        } else if (token && !onboarding_required && citySlug && sportSlug) {
          localStorage.setItem("authToken", token);

          navigate(`/sports/${sportSlug}/cities/${citySlug}`, {
            state: { cityId: cityId, sportId: sportId },
          });
        } else {
          console.error("No token received from server");

          navigate("/");
        }
      })
      .catch(function (error) {
        setServerError(error.response?.data?.errors);
      });
  };

  return (
    <section className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-green-400 mb-4">
        Welcome Back!
      </h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          })}
        />
        {/* Password field */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {serverError && (
          <div className="text-red-500 text-sm text-center">{serverError}</div>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-colors"
        >
          Login
        </button>
      </form>
      <p className="text-gray-400 mt-4">
        Don't have an account?{" "}
        <a href="/register" className="text-green-400 hover:underline">
          Register here
        </a>
      </p>
    </section>
  );
};
