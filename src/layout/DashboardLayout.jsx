import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 ${
          isSidebarOpen ? "w-64" : "w-16"
        } h-screen transition-all duration-300 bg-gray-800`}
      >
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content (ajustado para desplazar el contenido según el tamaño del sidebar) */}
      <div
        className={`flex-1 ml-${
          isSidebarOpen ? "64" : "16"
        } transition-all duration-300`}
      >
        <DashboardHeader
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 bg-gray-100 p-4 md:p-6 xl:p-8 2xl:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
