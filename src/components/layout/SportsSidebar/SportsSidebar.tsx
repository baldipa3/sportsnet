import { Link, useLocation } from "react-router-dom";
import { FaTrophy, FaUsers, FaFlag, FaCalendarAlt } from "react-icons/fa";
import { IoNutritionSharp } from "react-icons/io5";
import { BiRun } from "react-icons/bi";
import { useCurrentUser } from "@/utils/CurrentUserContext";
import type { NavigationItem } from "./types";

export const SportsSidebar = () => {
  const location = useLocation();
  const currentUser = useCurrentUser();
  const homePath =
    currentUser?.city?.slug && currentUser?.defaultSport?.slug
      ? `/sports/${currentUser.defaultSport.slug}/cities/${currentUser.city.slug}`
      : "/";

  const items: NavigationItem[] = [
    {
      type: "link",
      label: "Home",
      icon: FaTrophy,
      path: homePath,
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
      type: "link",
      label: "Nutrition",
      icon: IoNutritionSharp,
      path: "/nutrition",
    },
    {
      type: "link",
      label: "Training",
      icon: BiRun,
      path: "/training",
    },
    // {
    //   type: "header",
    //   label: "Account",
    // },
  ];

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
          // Use dynamic home path for Home link, otherwise use item's path
          const linkPath = item.label === "Home" ? homePath : item.path || "/";
          const isActive = location.pathname === linkPath;

          return (
            <li key={index}>
              <Link
                to={linkPath}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span className="flex-1">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
