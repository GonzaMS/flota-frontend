import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const MaintenanceTableRow = ({ item, carNames, onDelete }) => (
  <tr className="bg-gray-50 hover:bg-gray-100">
    <td className="px-6 py-4 text-base text-gray-800">
      {carNames[item.carId] || "Unknown Car"}
    </td>
    <td className="px-6 py-4 text-base text-gray-800">
      {new Date(item.createdAt).toLocaleDateString()}
    </td>
    <td className="px-6 py-4 text-base text-gray-800">{item.description}</td>
    <td className="px-6 py-4 text-base text-gray-800">
      ${item.cost.toFixed(2)}
    </td>
    <td className="px-6 py-4 text-base text-gray-800">{item.type}</td>
    <td className="px-6 py-4 text-base font-medium flex space-x-1">
      <Link
        to={`/dashboard/maintenance/${item.id}/edit`}
        className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded shadow-sm text-xs transition duration-150 ease-in-out"
      >
        <FaEdit className="mr-2" /> Edit
      </Link>
      <Button
        className="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow-sm text-xs transition duration-150 ease-in-out"
        onClick={() => onDelete(item.id)}
      >
        <FaTrash className="mr-0.5" /> Delete
      </Button>
    </td>
  </tr>
);

export default MaintenanceTableRow;
