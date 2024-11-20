import { Button } from "@/components/ui/button";
import { FaCheck, FaEdit, FaEye, FaPause } from "react-icons/fa";
import { Link } from "react-router-dom";

const CarTableRow = ({
  item,
  onViewDetails,
  onActivate,
  onDeactivate,
  hasRole,
}) => {
  const isActive = item.state === "ACTIVE";

  return (
    <tr className="bg-gray-50 hover:bg-gray-100">
      {["brand", "model", "fabricationYear", "licensePlate", "state"].map(
        (field) => (
          <td
            key={field}
            className="px-6 py-4 whitespace-nowrap text-base text-gray-800"
          >
            {item[field]}
          </td>
        )
      )}
      <td className="px-6 py-4 whitespace-nowrap text-base font-medium flex space-x-1">
        {hasRole("ROLE_ADMIN") && isActive && (
          <Link
            to={`/dashboard/cars/${item.id}/edit`}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded shadow-sm text-xs transition duration-150 ease-in-out"
          >
            <FaEdit className="mr-0.5" /> Edit
          </Link>
        )}

        {hasRole("ROLE_ADMIN") &&
          (isActive ? (
            <Button
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded shadow-sm text-xs transition duration-150 ease-in-out"
              onClick={() => onDeactivate(item.id)}
            >
              <FaPause className="mr-0.5" /> Deactivate
            </Button>
          ) : (
            <Button
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded shadow-sm text-xs transition duration-150 ease-in-out"
              onClick={() => onActivate(item.id)}
            >
              <FaCheck className="mr-0.5" /> Activate
            </Button>
          ))}

        <Button
          className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded shadow-sm text-xs transition duration-150 ease-in-out"
          onClick={() => onViewDetails(item.id)}
        >
          <FaEye className="mr-0.5" /> Details
        </Button>
      </td>
    </tr>
  );
};

export default CarTableRow;
