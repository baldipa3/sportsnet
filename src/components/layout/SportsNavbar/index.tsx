import { Link } from "react-router-dom";
import UserMenu from "../UserMenu";

const SportsNavbar = () => {
  return (
    <header className="flex h-20 items-center px-8 bg-[#121212] shadow-lg border-b border-gray-800/50">
      {/* Left: Logo */}
      <div className="flex items-center flex-shrink-0">
        <div className="flex items-center hover:opacity-80 transition-opacity">
          <img
            src="/assets/logo.png"
            alt="Sportsnet Logo"
            className="w-12 h-12 mr-3"
          />
          <span className="text-white font-bold text-2xl tracking-wide">
            Sportsnet
          </span>
        </div>
      </div>

      {/* Center: Navigation Buttons */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="flex gap-4">
          <Link
            to="/sports"
            className="text-white bg-green-600 hover:bg-green-500 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md"
          >
            Sports
          </Link>
        </div>
      </div>

      {/* Right: User Profile Menu */}
      <div className="flex items-center flex-shrink-0 ml-auto">
        <UserMenu />
      </div>
    </header>
  );
};

export default SportsNavbar;
