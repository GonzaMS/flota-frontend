import {
  FaBars,
  FaCar,
  FaClipboardList,
  FaTimes,
  FaUser,
  FaWrench,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import GenerateReportButton from "./car/GenerateReportButton";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const menuItems = [
    { name: "Car Management", icon: FaCar, path: "/dashboard/cars" },
    { name: "Driver Management", icon: FaUser, path: "/dashboard/drivers" },
    {
      name: "Travel Orders Management",
      icon: FaClipboardList,
      path: "/dashboard/orders",
    },
    { name: "Car Maintenance", icon: FaWrench, path: "/dashboard/maintenance" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col p-5 space-y-6 transition-all duration-300 fixed left-0 top-0 z-40 shadow-lg`}
    >
      {/* Toggle Button */}
      <button
        className="text-white bg-indigo-500 rounded-full p-2 transition-colors hover:bg-indigo-600 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar Header */}
      {isOpen && (
        <Link
          to="/dashboard"
          className="text-2xl text-center font-semibold text-indigo-400 hover:text-indigo-500 transition-colors"
        >
          Fleet Management
        </Link>
      )}

      {/* Navigation */}
      <nav className="mt-10 flex-grow">
        <ul className="space-y-4 text-sm">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.name}
                className={`flex items-center ${
                  isActive ? "bg-indigo-500 rounded-lg" : ""
                }`}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-4 p-3 w-full rounded-md hover:bg-indigo-600 transition ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}
                >
                  {/* Icon inheriting text color */}
                  <item.icon size={24} />
                  {isOpen && <span className="text-base">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Generate Report Button */}
      {isOpen && (
        <div className="mt-auto">
          <GenerateReportButton />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
