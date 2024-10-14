import { useAuth } from "@/context/AuthContext";

const DashboardHeader = ({ toggleSidebar }) => {
  const { logout } = useAuth();

  return (
    <header className="shadow p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Título Dashboard */}
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">
          Dashboard
        </h2>

        {/* Botón de logout */}
        <button
          className="bg-indigo-500 text-white mt-auto px-4 py-2 rounded-md hover:bg-black"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
