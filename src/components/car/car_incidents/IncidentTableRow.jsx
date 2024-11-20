import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const IncidentTableRow = ({ item, onDelete, hasRole, carNames }) => (
  <tr className="bg-gray-50 hover:bg-gray-100">
    <td className="px-6 py-4 text-base text-gray-800">
      {carNames[item.id] || `Unknown Car (${item.carId})`}
    </td>
    <td className="px-6 py-4 text-base text-gray-800">
      {new Date(item.createdAt).toLocaleDateString()}
    </td>
    <td className="px-6 py-4 text-base text-gray-800">{item.description}</td>
    <td className="px-6 py-4 text-base text-gray-800">{item.type}</td>
    <td className="px-6 py-4 text-base font-medium flex space-x-1">
      {hasRole("ROLE_ADMIN") && (
        <Link
          to={`/dashboard/incidents/${item.id}/edit`}
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded shadow-sm text-xs transition duration-150 ease-in-out"
        >
          <FaEdit className="mr-1" /> Edit
        </Link>
      )}

      {hasRole("ROLE_ADMIN") && (
        <Button
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow-sm text-xs transition duration-150 ease-in-out"
          onClick={() => onDelete(item.id)}
        >
          <FaTrash className="mr-0.5" /> Delete
        </Button>
      )}
    </td>
  </tr>
);

export default IncidentTableRow;
