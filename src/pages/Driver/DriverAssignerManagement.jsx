import { Button } from "@/components/ui/button";
import useAssignedOrder from "@/hooks/useAssignedOrders";
import useDrivers from "@/hooks/useDrivers";
import { getUserRole } from "@/utils/getRole";
import useCars from "@/hooks/useCars";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "@/components/common/Pagination";

const DriverAssignerManagement = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { getAssignedOrders, deleteAssignedOrder, pagination } =
    useAssignedOrder();
  const { getDrivers } = useDrivers();
  const { getCars } = useCars();

  const hasRole = (requiredRole) => {
    const roles = getUserRole();
    if (!roles) return false;
    return roles.includes(requiredRole);
  };

  const fetchAssignedOrders = async () => {
    try {
      const res = await getAssignedOrders(currentPage, pagination.pageSize);
      setAssignedOrders(res.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assigned orders:", error);
      setLoading(false);
      toast.error("Failed to load assigned orders.");
    }
  };

  const fetchDriversAndCars = async () => {
    try {
      const driversData = await getDrivers();
      const carsData = await getCars();
      setDrivers(driversData.items);
      setCars(carsData.items);
    } catch (error) {
      console.error("Error fetching drivers or cars:", error);
    }
  };

  useEffect(() => {
    fetchAssignedOrders();
    fetchDriversAndCars();
  }, [currentPage, pagination.pageSize]);

  const handleDelete = (assignedOrderId) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this assigned order?</p>
        <div className="flex justify-end">
          <Button
            className="mr-2 bg-red-500 text-white"
            onClick={() => confirmDelete(assignedOrderId)}
          >
            Delete
          </Button>
          <Button className="bg-gray-500 text-white" onClick={cancelDelete}>
            Cancel
          </Button>
        </div>
      </div>,
      { autoClose: false, closeButton: false }
    );
  };

  const confirmDelete = async (assignedOrderId) => {
    try {
      await deleteAssignedOrder(assignedOrderId);
      fetchAssignedOrders();
      toast.dismiss();
      toast.success("Assigned order deleted successfully!");
    } catch (error) {
      console.error("Error deleting assigned order:", error);
      toast.error("Error deleting assigned order.");
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

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="mb-6 flex justify-between items-center pt-20 px-6">
        <h2 className="text-3xl font-bold text-indigo-700">
          Assigned Orders Management
        </h2>
        {hasRole("ROLE_ADMIN") && (
          <Link to="/dashboard/driver-assigner/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow">
              Add New Assigned Order
            </Button>
          </Link>
        )}
      </div>

      <div className="flex-grow overflow-y-auto bg-white shadow-md sm:rounded-lg p-4 mx-6 min-h-0">
        {assignedOrders.length === 0 ? (
          <p className="text-center text-lg font-semibold">
            No driving history available.
          </p>
        ) : (
          <table className="min-w-full bg-white">
            <thead className="bg-indigo-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                  Driver Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                  Car Brand
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                  License Plate
                </th>
                {hasRole("ROLE_ADMIN") && (
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignedOrders.map((order, index) => {
                const driver = drivers.find(
                  (d) => d.driverId === order.driverId
                );
                const car = cars.find((c) => c.id === order.carId);

                return (
                  <tr
                    key={order.assignedOrderId}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                      {driver ? driver.driverName : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                      {car ? car.brand : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                      {car ? car.licensePlate : "N/A"}
                    </td>
                    {hasRole("ROLE_ADMIN") && (
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium flex space-x-3">
                        <Link
                          to={`/dashboard/driver-assigner/${order.assignedOrderId}/edit`}
                          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </Link>
                        <Button
                          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                          onClick={() => handleDelete(order.assignedOrderId)}
                        >
                          <FaTrash className="mr-2" />
                          Delete
                        </Button>
                    </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-center py-8 mb-8">
        <Pagination
          pageCount={pagination.totalPages}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default DriverAssignerManagement;
