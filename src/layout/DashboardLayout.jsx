import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } transition-all duration-300`}
      >
        <DashboardHeader isOpen={isSidebarOpen} />
        <main className="flex-1 bg-gray-100 p-4 md:p-6 xl:p-8 2xl:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
