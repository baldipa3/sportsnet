import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

export interface MenuOption {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
  icon?: React.ReactNode;
}

interface KebabMenuProps {
  options: MenuOption[];
  buttonClassName?: string;
  menuClassName?: string;
}

export const KebabMenu = ({
  options,
  buttonClassName = "",
  menuClassName = "",
}: KebabMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-gray-400 hover:text-white transition-colors p-2 ${buttonClassName} cursor-pointer`}
        aria-label="Options"
      >
        <FaEllipsisV className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          {/* Click-away overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu dropdown */}
          <div
            className={`absolute right-0 top-full mt-1 bg-[#2a2a2a] rounded-lg shadow-xl z-20 min-w-[160px] overflow-hidden ${menuClassName}`}
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.onClick)}
                className={`w-full text-left px-4 py-3 hover:bg-[#333333] transition-colors flex items-center gap-2 cursor-pointer ${
                  option.variant === "danger" ? "text-red-400" : "text-gray-300"
                }`}
              >
                {option.icon && (
                  <span className="flex-shrink-0">{option.icon}</span>
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
