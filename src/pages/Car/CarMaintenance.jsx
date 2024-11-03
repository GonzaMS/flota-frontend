import MaintenanceTableRow from "@/components/car/car_maintenance/MaintenanceTableRow";
import Loader from "@/components/common/Loader";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import useCars from "@/hooks/useCars";
import useMaintenances from "@/hooks/useMaintenances";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CarMaintenance = () => {
  const navigate = useNavigate();
  const {
    getMaintenances,
    getByCarIdAndDate,
    deleteMaintenance,
    getByCarId,
    getByDate,
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
    let response;
    const hasDateRange = dateRange[0] && dateRange[1];
    const formattedStartDate = hasDateRange
      ? dateRange[0].toISOString().split("T")[0]
      : null;
    const formattedEndDate = hasDateRange
      ? dateRange[1].toISOString().split("T")[0]
      : null;

    try {
      if (selectedCarId && hasDateRange) {
        response = await getByCarIdAndDate(
          selectedCarId,
          formattedStartDate,
          formattedEndDate,
          page
        );
      } else if (selectedCarId) {
        response = await getByCarId(selectedCarId, page);
      } else if (hasDateRange) {
        response = await getByDate(formattedStartDate, formattedEndDate, page);
      } else {
        response = await getMaintenances(page);
      }

      if (response && response.items.length > 0) {
        setMaintenances(response.items);
      } else {
        const filterDescription = selectedCarId
          ? `${
              carNames[selectedCarId] || "selected car"
            } in the selected date range`
          : "the selected date range";
        toast.warn(`No maintenances found for ${filterDescription}.`);
        setMaintenances([]);
      }
    } catch (error) {
      console.error("Error fetching maintenances:", error);
      toast.error("Failed to load maintenances.");
      setMaintenances([]);
    }
  };

  const cancelDelete = () => {
    toast.dismiss();
  };

  const confirmDelete = async (maintenanceId) => {
    try {
      await deleteMaintenance(maintenanceId);
      fetchMaintenances(currentPage);
      toast.success("Maintenance record deleted successfully.");
    } catch (error) {
      console.error("Error deleting maintenance:", error);
      toast.error("Failed to delete maintenance record.");
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

  const maintenanceHeaders = [
    "Car Name",
    "Date Created",
    "Description",
    "Cost",
    "Type",
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="mb-6 flex justify-between items-center pt-20">
        <h2 className="text-3xl font-bold text-indigo-700">Car Maintenance</h2>
        <Link to="/dashboard/maintenance/new">
          <Button className="bg-indigo-500 text-white py-1.5 px-5 rounded-md shadow-md hover:bg-indigo-600 transition duration-200 ease-in-out text-sm flex items-center space-x-2">
            <FaPlus className="inline" />
            <span>Add New Maintenance</span>
          </Button>
        </Link>
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
          className="p-2 border border-gray-300 rounded w-60"
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
        <Table
          headers={maintenanceHeaders}
          data={maintenances}
          RowComponent={MaintenanceTableRow}
          rowProps={{ carNames, onDelete: handleDelete }}
        />
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
