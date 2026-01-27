import { useState } from "react";
import { FaSignOutAlt, FaCog } from "react-icons/fa";
import { axiosInstance } from "@/services/apiBase";
import { routes } from "@/services/apiRoutes";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    const token = localStorage.getItem("authToken");

    axiosInstance
      .delete(routes.logoutUser(), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function () {
        localStorage.removeItem("authToken");
        window.location.href = "/";
      })
      .catch(function (error) {
        console.error("Logout error:", error);
        // Even if logout fails on server, clear local token and redirect
        localStorage.removeItem("authToken");
        window.location.href = "/";
      });
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-full hover:ring-4 hover:ring-white/5 transition-all duration-200"
      >
        {/* Container for the image to ensure it stays circular and centered */}
        <div className="w-9 h-9 rounded-full border border-gray-700 overflow-hidden bg-gray-800 flex items-center justify-center">
          <img
            src="/assets/avatar.svg"
            alt="Avatar"
            className="w-full h-full object-cover opacity-90 hover:opacity-100"
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-gray-700 bg-gray-800 p-1 text-sm text-white shadow-lg z-50">
          {/* Edit Button */}
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10">
            <FaCog className="w-4 h-4 text-white/30" />
            Settings
            {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-hover:inline">
              ⌘E
            </kbd> */}
          </button>

          <div className="my-1 h-px bg-white/5" />

          {/* Log Out Button */}
          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10"
          >
            <FaSignOutAlt className="w-4 h-4 text-white/30" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
