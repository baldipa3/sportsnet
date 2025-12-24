import { useState } from "react";
import SportsNavbar from "../SportsNavbar";
import SportsSidebar from "../SportsSidebar";
import ContactList from "../../contacts/ContactList";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const navigate = useNavigate();
  const handleFilterChange = (sport: string, city: string) => {
    navigate(`/sports/${sport}/cities/${city}`, {
      replace: true,
    });
  };

  return (
    <div>
      <SportsNavbar
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
        onFilterChange={handleFilterChange}
      />
      <div className="flex h-screen bg-[#171717] px-2">
        <aside className="w-full max-w-xs h-full overflow-y-auto flex flex-col items-center justify-between">
          <SportsSidebar />
        </aside>
        <main className="flex-1 h-full overflow-y-auto flex flex-col items-center relative">
          <Outlet
            context={{
              isCreatePostOpen,
              setIsCreatePostOpen,
              onFilterChange: handleFilterChange,
            }}
          />
        </main>
        <aside className="w-full max-w-xs h-full overflow-y-auto flex flex-col items-center justify-between">
          <ContactList />
        </aside>
      </div>
    </div>
  );
};

export default AppLayout;
