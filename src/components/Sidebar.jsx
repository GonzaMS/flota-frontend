import { useState } from "react";
import {
  FaBars,
  FaCar,
  FaClipboardCheck,
  FaClipboardList,
  FaExclamationTriangle,
  FaHistory,
  FaTimes,
  FaUser,
  FaWrench,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import GenerateReportButton from "./car/GenerateReportButton";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
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
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col justify-between p-5 space-y-6 transition-all duration-300 fixed left-0 top-0 z-40 shadow-lg`}
    >
      {/* Top Section with Toggle and Header */}
      <div>
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
            className="text-2xl text-center font-semibold text-indigo-400 hover:text-indigo-500 transition-colors mt-4"
          >
            Fleet Management
          </Link>
        )}

        {/* Navigation */}
        <nav className={`mt-10 ${!isOpen && "hidden md:block"}`}>
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
                    <item.icon size={24} />
                    {isOpen && <span className="text-base">{item.name}</span>}
                  </Link>
                </li>
              );
            })}

            {/* Submenu for Driver Activity */}
            <li className="flex flex-col space-y-2">
              <div
                className="flex items-center space-x-6 cursor-pointer hover:text-indigo-400"
                onClick={toggleSubmenu}
              >
                <FaClipboardCheck size={24} />
                {isOpen && <span>Driver Activity</span>}
              </div>
              {isSubmenuOpen && (
                <ul className="ml-10 space-y-4">
                  <li className="flex items-center space-x-2">
                    <FaHistory size={20} className="text-gray-500" />
                    <Link
                      to="/dashboard/driver-activity"
                      className="hover:text-indigo-400"
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
                      className="hover:text-indigo-400"
                    >
                      Driver Incidents
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section with Generate Report Button */}
      {isOpen && (
        <div className="mt-auto">
          <GenerateReportButton />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
