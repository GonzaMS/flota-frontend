import { useAuth } from "@/context/AuthContext";

const DashboardHeader = ({ isOpen }) => {
  const { logout } = useAuth();

  return (
    <header
      className={`fixed top-0 left-0 right-0 shadow p-4 bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "pl-64" : "pl-16"
      } z-30`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">
          Dashboard
        </h2>

        <button
          className="bg-indigo-500 text-white mt-auto px-4 py-2 rounded-md hover:bg-black"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
