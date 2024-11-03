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
import { Link } from "react-router-dom";
import { useState } from "react";
import GenerateReportButton from "./car/GenerateReportButton";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } h-screen bg-gray-800 text-white flex flex-col p-5 space-y-6 transition-all duration-300 fixed left-0 top-0 z-40`}
    >
      <button
        className="text-white bg-indigo-500 rounded p-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <Link
          to="/dashboard"
          className="text-3xl text-center lg:text-4xl font-bold text-indigo-400 hover:text-indigo-500"
        >
          Fleet Management
        </Link>
      )}

      <nav className={`mt-10 ${!isOpen && "hidden md:block"}`}>
        <ul className="space-y-9 text-lg">
          <li className="flex items-center space-x-6">
            <FaCar size={24} />
            <Link to="/dashboard/cars" className="hover:text-indigo-400">
              {isOpen && "Car Management"}
            </Link>
          </li>
          <li className="flex items-center space-x-6">
            <FaUser size={24} />
            <Link to="/dashboard/drivers" className="hover:text-indigo-400">
              {isOpen && "Driver Management"}
            </Link>
          </li>

          <li className="flex flex-col space-y-2">
            <div
              className="flex items-center space-x-6 cursor-pointer hover:text-indigo-400"
              onClick={toggleSubmenu}
            >
              <FaClipboardCheck size={24} />
              <span>{isOpen && "Driver Activity"}</span>
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
                  <FaExclamationTriangle size={20} className="text-gray-500" />
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

          <li className="flex items-center space-x-6">
            <FaClipboardList size={24} />
            <Link to="/dashboard/orders" className="hover:text-indigo-400">
              {isOpen && "Travel Orders Management"}
            </Link>
          </li>
          <li className="flex items-center space-x-6">
            <FaWrench size={24} />
            <Link to="/dashboard/maintenance" className="hover:text-indigo-400">
              {isOpen && "Car Maintenance"}
            </Link>
          </li>
        </ul>
      </nav>

      {isOpen && <GenerateReportButton />}
    </div>
  );
};

export default Sidebar;
