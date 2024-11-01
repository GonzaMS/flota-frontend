import { Button } from "@/components/ui/button";
import useDrivers from "@/hooks/useDrivers";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DriverManagement = () => {
  const [driversData, setDriversData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getDrivers, deleteDriver } = useDrivers();

  const fetchDrivers = async () => {
    try {
      const res = await getDrivers();
      setDriversData(res.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setLoading(false);
      toast.error("Failed to load drivers.");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDelete = (driverId) => {
    toast.info(
      <>
        <p>Are you sure you want to delete this driver?</p>
        <div className="flex justify-end">
          <Button
            className="mr-2 bg-red-500 text-white"
            onClick={() => confirmDelete(driverId)}
          >
            Delete
          </Button>
          <Button className="bg-gray-500 text-white" onClick={cancelDelete}>
            Cancel
          </Button>
        </div>
      </>,
      {
        autoClose: false,
        closeButton: false,
      }
    );
  };

  const confirmDelete = async (driverId) => {
    try {
      await deleteDriver(driverId);
      fetchDrivers();
      toast.dismiss();
      toast.success("Driver deleted successfully!");
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast.error("Error deleting driver.");
    }
  };

  const cancelDelete = () => {
    toast.dismiss();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
  }

  if (!driversData || driversData.length === 0) {
    return (
      <p className="text-center text-lg font-semibold">No drivers available.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-6 flex justify-between items-center pt-20">
        <h2 className="text-3xl font-bold text-gray-800">Driver Management</h2>
        <Link to="/dashboard/drivers/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow">
            Add New Driver
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg p-4">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                Driver ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                License Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                License Expiration
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {driversData.map((driver, index) => (
              <tr
                key={driver.driverId}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {driver.driverId}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {driver.driverName}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {driver.driverLicense}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {driver.driverState}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {new Date(
                    driver.driverLicenseExpirationDate
                  ).toLocaleDateString()}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium flex space-x-3">
                  <Link
                    to={`/dashboard/drivers/${driver.driverId}/edit`}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </Link>
                  <Button
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                    onClick={() => handleDelete(driver.driverId)}
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverManagement;
