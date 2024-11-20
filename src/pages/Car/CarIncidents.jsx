import IncidentTableRow from "@/components/car/car_incidents/IncidentTableRow";
import Loader from "@/components/common/Loader";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCarIncidents from "@/hooks/useCarIncidents";
import useCars from "@/hooks/useCars";
import { getUserRole } from "@/utils/getRole";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CarIncidents = () => {
  const [incidentsData, setIncidentsData] = useState([]);
  const [carNames, setCarNames] = useState({});
  const [carOptions, setCarOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCar, setSelectedCar] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  const hasRole = (requiredRole) => {
    const roles = getUserRole();
    if (!roles) return false;
    return roles.includes(requiredRole);
  };

  const {
    getIncidents,
    getIncidentsByCarId,
    getIncidentsByDateRange,
    deleteIncident,
    pagination,
  } = useCarIncidents();
  const { getCars } = useCars();

  const fetchCarNames = async () => {
    try {
      const response = await getCars();
      const carMap = {};
      const options = response.items.map((car) => ({
        id: car.id,
        label: `${car.brand} ${car.model} - ${car.licensePlate}`,
      }));
      response.items.forEach(
        (car) =>
          (carMap[car.id] = `${car.brand} ${car.model} - ${car.licensePlate}`)
      );
      setCarNames(carMap);
      setCarOptions(options);
    } catch (error) {
      console.error("Error fetching car names:", error);
      toast.error("Failed to load car names.");
    }
  };

  const fetchIncidents = useCallback(async () => {
    setLoading(true);

    const showToastMessage = (message) => {
      setIncidentsData([]);
      toast.info(message);
    };

    try {
      let res;
      const [startDate, endDate] = dateRange;
      const hasDateRange = startDate && endDate;

      if (selectedCar && hasDateRange) {
        res = await getIncidentsByCarId(
          selectedCar,
          currentPage,
          pagination.pageSize
        );
      } else if (hasDateRange) {
        res = await getIncidentsByDateRange(
          {
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
          },
          currentPage,
          pagination.pageSize
        );
      } else {
        res = await getIncidents(currentPage, pagination.pageSize);
      }

      if (res && res.items && res.items.length > 0) {
        setIncidentsData(res.items);
      } else {
        showToastMessage("No incidents found.");
      }
    } catch (error) {
      console.error("Error fetching incidents:", error);
      toast.error("Failed to load incidents.");
    } finally {
      setLoading(false);
    }
  }, [
    selectedCar,
    dateRange,
    currentPage,
    pagination.pageSize,
    getIncidents,
    getIncidentsByDateRange,
    getIncidentsByCarId,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCarNames();
      await fetchIncidents();
    };

    fetchData();
  }, [selectedCar, dateRange, currentPage]);

  const handleDelete = async (id) => {
    try {
      await deleteIncident(id);
      toast.success("Incident deleted successfully");
      fetchIncidents();
    } catch (error) {
      console.error("Error deleting incident:", error);
      toast.error("Failed to delete incident.");
    }
  };

  const incidentHeaders = ["Car", "Date", "Description", "Type"];

  return loading ? (
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

      <div className="mb-6 flex space-x-4 items-center">
        {/* Car Filter */}
        <Select
          onValueChange={(value) => setSelectedCar(value)}
          value={selectedCar}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Car" />
          </SelectTrigger>
          <SelectContent>
            {carOptions.map((car) => (
              <SelectItem key={car.id} value={car.id}>
                {car.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range Filter */}
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
          onClick={fetchIncidents}
          className="bg-indigo-600 text-white px-4 flex items-center space-x-2"
        >
          <FaSearch className="inline" />
          <span>Search</span>
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm">
        <div className="overflow-y-auto max-h-[600px]">
          <table className="min-w-full bg-white">
            <Table
              headers={incidentHeaders}
              data={incidentsData}
              RowComponent={IncidentTableRow}
              rowProps={{
                carNames,
                onDelete: handleDelete,
                hasRole,
              }}
            />
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Pagination
          pageCount={pagination.totalPages}
          onPageChange={(e) => setCurrentPage(e.selected)}
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default CarIncidents;
