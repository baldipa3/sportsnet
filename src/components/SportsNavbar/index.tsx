import { Link } from "react-router-dom";
import UserMenu from "../UserMenu";

const SportsNavbar = () => {
  return (
    <div>
      {/* Header */}
      <header className="flex h-24 items-center justify-between px-8 bg-[#121212] shadow-lg border-b border-gray-800">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="Sportsnet Logo"
            className="w-20 h-20 mr-1"
          />
          <span className="text-white font-bold text-xl tracking-wide">
            Sportsnet
          </span>
        </Link>

        {/* Buttons (replace with your actual Buttons component) */}
        <div className="flex gap-4">
          <button className="text-white bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition-all">
            Sports
          </button>
          <button className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all">
            Login
          </button>
        </div>

        {/* User Profile Menu */}
        <UserMenu />
      </header>
    </div>
  );
};

export default SportsNavbar;
