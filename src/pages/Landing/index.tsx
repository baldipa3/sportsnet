import LoginUser from "./LoginUser";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#171717] text-white flex flex-col items-center px-4">
      <header className="w-full py-6 flex justify-center border-b border-gray-800">
        <h1 className="text-5xl font-bold text-green-400">SportsNet</h1>
      </header>

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl w-full">
        {/* Left Section: Information */}
        <section className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-semibold text-white mb-4">
            Connect. Compete. Conquer.
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl">
            Join the ultimate social network for sports enthusiasts. Share your
            achievements, connect with athletes, and track your progress in
            real-time.
          </p>
          <button className="mt-6 px-8 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-colors">
            Learn More
          </button>
        </section>

        <LoginUser />
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

export default Landing;
