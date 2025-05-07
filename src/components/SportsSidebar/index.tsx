import { Link, useLocation } from "react-router-dom";
import {
  FaTrophy,
  FaUsers,
  FaFlag,
  FaCalendarAlt,
  FaBell,
  FaComments,
  FaCog,
} from "react-icons/fa";

import type { NavigationItem } from "./types";

const items: NavigationItem[] = [
  {
    type: "link",
    label: "Sports",
    icon: FaTrophy,
    path: "/sports",
  },
  {
    type: "link",
    label: "Teams",
    icon: FaUsers,
    path: "/teams",
  },
  {
    type: "link",
    label: "Goals",
    icon: FaFlag,
    path: "/goals",
  },
  {
    type: "link",
    label: "Events",
    icon: FaCalendarAlt,
    path: "/events",
  },
  {
    type: "header",
    label: "Account",
  },
  {
    type: "link",
    label: "Notifications",
    icon: FaBell,
    path: "/notifications",
    notifications: 24,
  },
  {
    type: "link",
    label: "Chat",
    icon: FaComments,
    path: "/chat",
    messages: 8,
  },
  {
    type: "link",
    label: "Settings",
    icon: FaCog,
    path: "/settings",
  },
];

const SportsSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-full h-full bg-[#121212] border-gray-800 p-4 shadow-lg">
      <ul className="p-6 space-y-2">
        {items.map((item, index) => {
          if (item.type === "header") {
            return (
              <li
                key={index}
                className="text-gray-500 uppercase text-xs font-bold my-4"
              >
                {item.label}
              </li>
            );
          }

          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <li key={index}>
              <Link
                to={item.path || "/"}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span className="flex-1">{item.label}</span>

                {item.notifications && (
                  <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                    {item.notifications}
                  </span>
                )}

                {item.messages && (
                  <span className="ml-auto bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                    {item.messages}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SportsSidebar;
