import type { ContactType } from "./types";
import Contact from "./Contact";

const contacts: ContactType[] = [
  { id: 1, name: "Pablo Baldini", avatar: "", online: false },
  { id: 2, name: "Mateo Baldini", avatar: "", online: false },
  { id: 3, name: "Marcos Baldini", avatar: "", online: true },
  { id: 4, name: "Sara Baldini", avatar: "", online: true },
  { id: 5, name: "Nina Baldini", avatar: "", online: false },
];

export default function ContactList() {
  return (
    <div className="w-full h-full bg-[#121212] border-gray-800 p-6 shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-4">Contacts</h2>
      <div className="space-y-2">
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}
