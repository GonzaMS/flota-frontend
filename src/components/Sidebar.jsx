import { Button } from "@/components/ui/button";
import {
  FaBars,
  FaCar,
  FaClipboardList,
  FaFileAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
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
          <li className="flex items-center space-x-6">
            <FaClipboardList size={24} />
            <Link to="/dashboard/orders" className="hover:text-indigo-400">
              {isOpen && "Travel Orders Management"}
            </Link>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <Button className="bg-indigo-500 text-white mt-auto flex items-center space-x-6">
          <FaFileAlt size={20} />
          <span>Generate Report</span>
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
