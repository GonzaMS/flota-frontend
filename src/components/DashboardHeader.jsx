import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { getUserFromLocalStorage,formatRole,formatUsername} from "@/utils/userUtils";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const DashboardHeader = ({ isOpen }) => {
  const { logout } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, []);

  const username = formatUsername(user.username);
  const role = formatRole(Array.isArray(user.role) ? user.role[0] : user.role);

  return (
    <header
      className={`fixed top-0 left-0 right-0 shadow p-4 bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "pl-64" : "pl-16"
      } z-30`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white ml-3">
          Dashboard
        </h2>

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className="flex items-center bg-gray-700 hover:bg-gray-600 text-white"
              >
                <FaUser className="mr-2" />
                {username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
              <DropdownMenuLabel className="font-semibold text-white">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center text-gray-300 hover:bg-gray-700 rounded-md px-2 py-1">
                <span>Role: {role}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center text-gray-300 hover:bg-gray-700 rounded-md px-2 py-1 cursor-pointer"
                onClick={logout}
              >
                <FaSignOutAlt className="mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
