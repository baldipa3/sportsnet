import { Link } from "react-router-dom";
import type { NavItemProps } from "./types";

export function NavItem({ item, isActive }: NavItemProps) {
  const { label, icon: Icon, notifications, messages, path } = item;

  if (item.type === "link") {
    return (
      <div className="flex items-center my-1">
        <Link
          to={path || "/"}
          className={`flex items-center w-full gap-2 px-3 py-2 rounded-md transition-all ${
            isActive
              ? "bg-green-700 text-white"
              : "text-gray-400 hover:bg-green-700 hover:text-white"
          }`}
        >
          {Icon && <Icon className="w-5 h-5" />}
          <span>{label}</span>

          <div className="flex gap-2 ml-auto">
            {notifications && (
              <span className="rounded-full bg-yellow-500 text-xs text-black px-2 py-0.5">
                {notifications}
              </span>
            )}
            {messages && (
              <span className="rounded-full bg-green-500 text-xs text-black px-2 py-0.5">
                {messages}
              </span>
            )}
          </div>
        </Link>
      </div>
    );
  }

  return (
    <h2 className="text-gray-500 font-medium uppercase text-xs border-t border-gray-700 pt-4 my-6">
      {label}
    </h2>
  );
}
