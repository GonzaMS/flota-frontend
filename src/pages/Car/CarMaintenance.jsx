import { Button } from "@/components/ui/button";
import useCars from "@/hooks/useCars";
import useMaintenances from "@/hooks/useMaintenances";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CarMaintenance = () => {
  const navigate = useNavigate();
  const {
    getMaintenances,
    deleteMaintenance,
    cars: maintenances,
    isLoading,
    error,
    pagination,
  } = useMaintenances();

  const { getById } = useCars();
  const [carNames, setCarNames] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchMaintenances(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (maintenances.length > 0) {
      loadCarNames();
    }
  }, [maintenances]);

  const fetchMaintenances = async (page) => {
    await getMaintenances(page);
  };

  const loadCarNames = async () => {
    const carNameMap = { ...carNames };
    const uniqueCarIds = [...new Set(maintenances.map((m) => m.carId))];
    const fetchCarNames = uniqueCarIds.map(async (carId) => {
      if (!carNameMap[carId]) {
        const car = await getById(carId);
        carNameMap[carId] = car
          ? `${car.brand} ${car.model} - ${car.licensePlate}`
          : "Unknown Car";
      }
    });
    await Promise.all(fetchCarNames);
    setCarNames(carNameMap);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (maintenanceId) => {
    toast.info(
      <>
        <p>Are you sure you want to delete this maintenance record?</p>
        <div className="flex justify-end">
          <Button
            className="mr-2 bg-red-500 text-white"
            onClick={() => confirmDelete(maintenanceId)}
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

  const confirmDelete = async (maintenanceId) => {
    try {
      await deleteMaintenance(maintenanceId);
      fetchMaintenances(currentPage);
      toast.dismiss();
      toast.success("Maintenance record deleted successfully!");
    } catch (error) {
      console.error("Error deleting maintenance:", error);
      toast.error("Error deleting maintenance.");
    }
  };

  const cancelDelete = () => {
    toast.dismiss();
  };

  if (isLoading) {
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

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="mb-6 flex justify-between items-center pt-20">
        <h2 className="text-3xl font-bold text-indigo-700">Car Maintenance</h2>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow"
          onClick={() => navigate("/dashboard/maintenance/new")}
        >
          Add New Maintenance
        </Button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg p-4">
        <table className="min-w-full bg-white">
          <thead className="bg-indigo-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Car Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Date Created
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {maintenances.map((maintenance) => (
              <tr key={maintenance.id} className="bg-white">
                <td className="px-6 py-4 text-base text-gray-800">
                  {carNames[maintenance.carId]}
                </td>
                <td className="px-6 py-4 text-base text-gray-800">
                  {formatDate(maintenance.createdAt)}
                </td>
                <td className="px-6 py-4 text-base text-gray-800">
                  {maintenance.description}
                </td>
                <td className="px-6 py-4 text-base text-gray-800">
                  ${maintenance.cost.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-base text-gray-800">
                  {maintenance.type}
                </td>
                <td className="px-6 py-4 text-base font-medium flex space-x-3">
                  <Link
                    to={`/dashboard/maintenance/${maintenance.id}/edit`}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </Link>
                  <Button
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                    onClick={() => handleDelete(maintenance.id)}
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

      <div className="flex justify-center mt-8">
        <ReactPaginate
          previousLabel={<span className="px-3 py-1">« Prev</span>}
          nextLabel={<span className="px-3 py-1">Next »</span>}
          breakLabel={<span className="px-3 py-1">...</span>}
          pageCount={pagination.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="flex items-center space-x-2 text-sm font-medium"
          pageClassName="page-item"
          pageLinkClassName="page-link px-3 py-2 border border-gray-300 rounded-md hover:bg-indigo-200 hover:text-indigo-700 transition-colors"
          previousLinkClassName="page-link px-3 py-2 border border-gray-300 rounded-md hover:bg-indigo-200 hover:text-indigo-700 transition-colors"
          nextLinkClassName="page-link px-3 py-2 border border-gray-300 rounded-md hover:bg-indigo-200 hover:text-indigo-700 transition-colors"
          breakClassName="page-item"
          activeLinkClassName="bg-indigo-700 text-white"
          activeClassName="page-item"
        />
      </div>
    </div>
  );
};

export default CarMaintenance;
