import IncidentTableRow from "@/components/car/car_incidents/IncidentTableRow";
import Loader from "@/components/common/Loader";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import useCarIncidents from "@/hooks/useCarIncidents";
import useCars from "@/hooks/useCars";
import { getUserRole } from "@/utils/getRole";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CarIncidents = () => {
  const {
    getIncidents,
    getIncidentsByCarId,
    getIncidentsByDateRange,
    deleteIncident,
    isLoading,
    pagination,
  } = useCarIncidents();
  const { getCars } = useCars();

  const hasRole = (requiredRole) => {
    const roles = getUserRole();
    if (!roles) return false;
    return roles.includes(requiredRole);
  };

  const [carNames, setCarNames] = useState({});
  const [cars, setCars] = useState([]);
  const [incidentsData, setIncidentsData] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchCarsData();
    fetchIncidents(currentPage);
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

  const fetchIncidents = async (page) => {
    setIncidentsData([]); // Reiniciar busquedas
    const hasDateRange = dateRange[0] && dateRange[1];
    const formattedStartDate = hasDateRange
      ? dateRange[0].toISOString().split("T")[0]
      : null;
    const formattedEndDate = hasDateRange
      ? dateRange[1].toISOString().split("T")[0]
      : null;

    try {
      let response;
      if (selectedCarId && hasDateRange) {
        response = await getIncidentsByCarId(
          selectedCarId,
          formattedStartDate,
          formattedEndDate,
          page
        );
      } else if (selectedCarId) {
        response = await getIncidentsByCarId(selectedCarId, page);
      } else if (hasDateRange) {
        response = await getIncidentsByDateRange(
          formattedStartDate,
          formattedEndDate,
          page
        );
      } else {
        response = await getIncidents(page);
      }

      if (response && response.items && response.items.length > 0) {
        setIncidentsData(response.items);
      } else {
        const filterDescription = selectedCarId
          ? `${
              carNames[selectedCarId] || "selected car"
            } in the selected date range`
          : "the selected date range";
        toast.warn(`No incidents found for ${filterDescription}.`);
        setIncidentsData([]); // Asegúrate de vaciar los datos si no hay resultados
      }
    } catch (error) {
      console.error("Error fetching incidents:", error);
      toast.error("Failed to load incidents.");
      setIncidentsData([]); // Maneja errores reiniciando los datos
    }
  };

  const cancelDelete = () => {
    toast.dismiss();
  };

  const confirmDelete = async (incidentId) => {
    try {
      await deleteIncident(incidentId);
      fetchIncidents(currentPage);
      toast.success("Incident deleted successfully.");
    } catch (error) {
      console.error("Error deleting incident:", error);
      toast.error("Failed to delete incident.");
    }
  };

  const handleFilterSubmit = () => {
    setCurrentPage(0);
    fetchIncidents(0);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    fetchIncidents(event.selected);
  };

  const handleDelete = (incidentId) => {
    toast.info(
      <>
        <p>Are you sure you want to delete this incident record?</p>
        <div className="flex justify-end">
          <Button
            className="mr-2 bg-red-500 text-white"
            onClick={() => confirmDelete(incidentId)}
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

  const incidentHeaders = ["Car Name", "Date", "Description", "Type"];

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="mb-6 flex justify-between items-center pt-20">
        <h2 className="text-3xl font-bold text-indigo-700">Car Incidents</h2>
        {hasRole("ROLE_ADMIN") && (
          <Link to="/dashboard/incidents/new">
            <Button className="bg-indigo-500 text-white py-1.5 px-5 rounded-md shadow-md hover:bg-indigo-600 transition duration-200 ease-in-out text-sm flex items-center space-x-2">
              <FaPlus className="inline" />
              <span>Add New Incident</span>
            </Button>
          </Link>
        )}
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
          className="bg-indigo-600 text-white px-4 flex items-center space-x-2"
        >
          <FaSearch className="inline" />
          <span>Search</span>
        </Button>
      </div>

      {incidentsData.length === 0 ? (
        <p className="text-center text-lg font-semibold">No incidents found.</p>
      ) : (
        <div className="border rounded-lg shadow-sm">
          <div className="overflow-y-auto max-h-[600px]">
            <Table
              headers={incidentHeaders}
              data={incidentsData}
              RowComponent={IncidentTableRow}
              rowProps={{ carNames, onDelete: handleDelete, hasRole }}
            />
          </div>
        </div>
      )}

      {incidentsData.length > 0 && (
        <div className="flex justify-center mt-8">
          <Pagination
            pageCount={pagination.totalPages}
            onPageChange={handlePageClick}
            forcePage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default CarIncidents;
