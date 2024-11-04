import { Button } from "@/components/ui/button";
import useDrivers from "@/hooks/useDrivers";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "@/components/common/Pagination";

const DriverManagement = () => {
  const [driversData, setDriversData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const { getDrivers, deleteDriver, pagination } = useDrivers();

  const fetchDrivers = async () => {
    try {
      const res = await getDrivers(currentPage, pagination.pageSize);
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
  }, [currentPage, pagination.pageSize]);

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
      { autoClose: false, closeButton: false }
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

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!driversData.length) {
    return (
      <p className="text-center text-lg font-semibold">No drivers available.</p>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="mb-6 flex justify-between items-center pt-20 px-6">
        <h2 className="text-3xl font-bold text-indigo-700">Driver Management</h2>
        <Link to="/dashboard/drivers/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow">
            Add New Driver
          </Button>
        </Link>
      </div>

      {/* Contenedor de tabla con scroll y altura ajustada */}
      <div className="flex-grow overflow-y-auto bg-white shadow-md sm:rounded-lg p-4 mx-6 min-h-0">
        <table className="min-w-full bg-white">
          <thead className="bg-indigo-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                License Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                License Expiration
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
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

      <div className="flex justify-center py-8 mb-8 shadow-inner">
        <Pagination
          pageCount={pagination.totalPages}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default DriverManagement;
