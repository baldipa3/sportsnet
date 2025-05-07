import SportsNavbar from "../../components/SportsNavbar";
import SportsSidebar from "../../components/SportsSidebar";
import ContactList from "../../components/ContactList";
import { Outlet } from "react-router-dom";

const Home = () => {
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

export default Home;
