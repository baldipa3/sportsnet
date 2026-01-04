import type { ContactProps } from "../types";

export const ContactCard = ({ contact }: ContactProps) => {
  return (
    <div className="flex items-center py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-all">
      {/* Avatar */}
      <div className="w-8 h-8 mr-4 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        {contact.avatar ? (
          <img
            src={contact.avatar}
            alt="Contact avatar"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <img
            src="/assets/avatar.svg"
            alt="Default avatar"
            className="w-6 h-6"
          />
        )}
      </div>

      {/* Contact Name */}
      <span className="text-white text-base">{contact.name}</span>
    </div>
  );
};
