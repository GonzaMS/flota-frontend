import {
  FaBars,
  FaCar,
  FaClipboardList,
  FaTimes,
  FaUser,
  FaClipboardCheck,
  FaHistory,
  FaExclamationTriangle,
  FaWrench,
} from "react-icons/fa";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GenerateReportButton from "./car/GenerateReportButton";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [isDriverActivityOpen, setIsDriverActivityOpen] = useState(false);

  const toggleDriverActivitySubmenu = () => {
    setIsDriverActivityOpen(!isDriverActivityOpen);
  };

  const menuItems = [
    { name: "Car Management", icon: FaCar, path: "/dashboard/cars" },
    { name: "Driver Management", icon: FaUser, path: "/dashboard/drivers" },
    {
      name: "Travel Orders Management",
      icon: FaClipboardList,
      path: "/dashboard/orders",
    },
    { name: "Car Maintenance", icon: FaWrench, path: "/dashboard/maintenance" },
    {
      name: "Driver Activity",
      icon: FaClipboardCheck,
      path: "#",
      isSubmenu: true,
    },
  ];

  // Verificar si estamos en una de las páginas de Driver Activity
  const isDriverActivityActive =
    location.pathname === "/dashboard/driver-history" ||
    location.pathname === "/dashboard/driver-incidents" ||
    location.pathname === "/dashboard/driver-assigner";

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
      <nav className={`mt-10 ${!isOpen && "hidden md:block"}`}>
        <ul className="space-y-4 text-sm">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return item.isSubmenu ? (
              <li key={item.name} className="flex flex-col space-y-2">
                <div
                  className={`flex items-center space-x-4 cursor-pointer hover:bg-indigo-600 transition p-3 rounded-md ${
                    isDriverActivityActive ? "bg-indigo-500" : ""
                  }`}
                  onClick={toggleDriverActivitySubmenu}
                >
                  <item.icon size={24} />
                  <span>{isOpen && item.name}</span>
                </div>
                {isDriverActivityOpen && (
                  <ul className="ml-10 space-y-4">
                    <li className="flex items-center space-x-2">
                      <FaHistory size={20} className="text-gray-500" />
                      <Link
                        to="/dashboard/driver-history"
                        className={`hover:text-indigo-400 ${
                          location.pathname === "/dashboard/driver-history"
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        Driver History
                      </Link>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaExclamationTriangle
                        size={20}
                        className="text-gray-500"
                      />
                      <Link
                        to="/dashboard/driver-incidents"
                        className={`hover:text-indigo-400 ${
                          location.pathname === "/dashboard/driver-incidents"
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        Driver Incidents
                      </Link>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaClipboardCheck size={20} className="text-gray-500" />
                      <Link
                        to="/dashboard/driver-assigner"
                        className={`hover:text-indigo-400 ${
                          location.pathname === "/dashboard/driver-assigner"
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        Assigner Driver
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
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
