import SportsNavbar from "../SportsNavbar";
import SportsSidebar from "../SportsSidebar";
import ContactList from "../../contacts/ContactList";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <SportsNavbar />
      <div className="flex h-screen bg-[#171717] px-2">
        <aside className="w-full max-w-xs h-full overflow-y-auto flex flex-col items-center justify-between">
          <SportsSidebar />
        </aside>
        <main className="flex-1 h-full overflow-y-auto flex flex-col items-center relative">
          <Outlet />
        </main>
        <aside className="w-full max-w-xs h-full overflow-y-auto flex flex-col items-center justify-between">
          <ContactList />
        </aside>
      </div>
    </div>
  );
};

export default AppLayout;
