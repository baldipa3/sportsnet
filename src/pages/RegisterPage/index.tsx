import { useForm, type SubmitHandler } from "react-hook-form";
import { axiosInstance } from "../../services/apiBase";
import { routes } from "../../services/apiRoutes";

interface IFormInput {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("AxiosInstance:", axiosInstance);
    console.log("routes.registerUser:", routes.registerUser());

    const response = axiosInstance
      .post(routes.registerUser(), {
        firstName: "Fred",
        lastName: "Flintstone",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(response);
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
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("name", { required: true, maxLength: 20 })}
            />
            <input
              type="text"
              placeholder="Surname"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("surname", { required: true, maxLength: 20 })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("email", { required: true, maxLength: 20 })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("password", { required: true, maxLength: 20 })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("password", { required: true, maxLength: 20 })}
            />
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

export default RegisterPage;
