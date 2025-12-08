import { useState } from "react";
import { FaEdit, FaCopy, FaArchive, FaSignOutAlt } from "react-icons/fa";
import { axiosInstance } from "../../../services/apiBase";
import { routes } from "../../../services/apiRoutes";

const UserMenu = () => {
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
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
      >
        <img src="/assets/avatar.svg" alt="Avatar" className="w-6 h-6" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-gray-700 bg-gray-800 p-1 text-sm text-white shadow-lg z-50">
          {/* Edit Button */}
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10 cursor-pointer">
            <FaEdit className="w-4 h-4 text-white/30" />
            Edit
            {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-hover:inline">
              ⌘E
            </kbd> */}
          </button>

          {/* Duplicate Button */}
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10 cursor-pointer">
            <FaCopy className="w-4 h-4 text-white/30" />
            Duplicate
          </button>

          <div className="my-1 h-px bg-white/5" />

          {/* Archive Button */}
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10 cursor-pointer">
            <FaArchive className="w-4 h-4 text-white/30" />
            Archive
          </button>

          {/* Log Out Button */}
          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10 cursor-pointer"
          >
            <FaSignOutAlt className="w-4 h-4 text-white/30" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
