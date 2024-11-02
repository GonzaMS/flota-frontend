import Loader from "@/components/common/Loader";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import useCars from "@/hooks/useCars";
import useMaintenances from "@/hooks/useMaintenances";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CarMaintenance = () => {
  const navigate = useNavigate();
  const {
    getMaintenances,
    getByCarIdAndDate,
    deleteMaintenance,
    isLoading,
    error,
    pagination,
  } = useMaintenances();

  const { getCars } = useCars();
  const [carNames, setCarNames] = useState({});
  const [cars, setCars] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchCarsData();
    fetchMaintenances(currentPage);
  }, [currentPage]);

  const fetchCarsData = async () => {
    const carsData = await getCars();
    setCars(carsData.items);

    const carNameMap = carsData.items.reduce((acc, car) => {
      acc[car.id] = `${car.brand} ${car.model} - ${car.licensePlate}`;
      return acc;
    }, {});
    setCarNames(carNameMap);
  };

  const fetchMaintenances = async (page) => {
    if (selectedCarId && dateRange[0] && dateRange[1]) {
      const formattedStartDate = dateRange[0].toISOString().split("T")[0];
      const formattedEndDate = dateRange[1].toISOString().split("T")[0];

      const response = await getByCarIdAndDate(
        selectedCarId,
        formattedStartDate,
        formattedEndDate,
        page
      );

      if (!response) {
        const carName = carNames[selectedCarId] || "selected car";
        toast.warn(`No maintenances found for ${carName}.`);
        setMaintenances([]);
      } else {
        setMaintenances(response.items);
      }
    } else {
      const allMaintenances = await getMaintenances(page);
      setMaintenances(allMaintenances.items);
    }
  };

  const handleFilterSubmit = () => {
    setCurrentPage(0);
    fetchMaintenances(0);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    fetchMaintenances(event.selected);
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
    return <Loader />;
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

      <div className="mb-4 flex space-x-4">
        <select
          value={selectedCarId}
          onChange={(e) => setSelectedCarId(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select Car</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.brand} {car.model} - {car.licensePlate}
            </option>
          ))}
        </select>

        <DatePicker
          selectsRange
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={(update) => setDateRange(update)}
          isClearable
          placeholderText="Select Date Range"
          className="p-2 border border-gray-300 rounded"
        />

        <Button
          onClick={handleFilterSubmit}
          className="bg-indigo-600 text-white px-4"
        >
          Apply Filters
        </Button>
      </div>

      {maintenances.length === 0 ? (
        <p className="text-center text-lg font-semibold">
          Car maintenance records not found.
        </p>
      ) : (
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
                    {carNames[maintenance.carId] || "Unknown Car"}
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
      )}

      {maintenances.length > 0 && (
        <div className="flex justify-center mt-8">
          <Pagination
            pageCount={pagination.totalPages}
            onPageChange={handlePageClick}
          />
        </div>
      )}
    </div>
  );
};

export default CarMaintenance;
