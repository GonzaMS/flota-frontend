import CarTableRow from "@/components/car/car_management/CarTableRow";
import CarDetailsModal from "@/components/common/CarDetailsModal";
import Loader from "@/components/common/Loader";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCars from "@/hooks/useCars";
import useKilometers from "@/hooks/useKilometers";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { FaPause, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CarManagement = () => {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);
  const [carState, setCarState] = useState("ACTIVE");
  const [licensePlateFilter, setLicensePlateFilter] = useState("");

  const {
    getCarByState,
    getCarByLicensePlate,
    deactivateCar,
    activateCar,
    pagination,
  } = useCars();

  const { getByCarId } = useKilometers();

  const fetchCars = useCallback(async () => {
    setLoading(true);

    const showToastMessage = (message) => {
      setCarsData([]);
      toast.info(message);
    };

    const noCarsMessage = licensePlateFilter
      ? `No cars found with the license plate "${licensePlateFilter}".`
      : `No cars found with the state "${carState}".`;

    try {
      const res = licensePlateFilter
        ? await getCarByLicensePlate(
            licensePlateFilter,
            currentPage,
            pagination.pageSize
          )
        : await getCarByState(carState, currentPage, pagination.pageSize);

      if (res && res.items && res.items.length > 0) {
        setCarsData(res.items);
      } else {
        showToastMessage(noCarsMessage);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        showToastMessage(noCarsMessage);
      } else {
        console.error("Error fetching cars:", error);
        toast.error("Failed to load cars.");
      }
    } finally {
      setLoading(false);
    }
  }, [licensePlateFilter, currentPage, carState, pagination.pageSize]);

  const debouncedFetchCars = useCallback(debounce(fetchCars, 500), [
    licensePlateFilter,
    carState,
    currentPage,
  ]);

  useEffect(() => {
    debouncedFetchCars();
    return () => {
      debouncedFetchCars.cancel();
    };
  }, [licensePlateFilter, carState, currentPage, debouncedFetchCars]);

  const handleLicensePlateChange = (e) => {
    setLicensePlateFilter(e.target.value);
  };

  const handleDeactivate = (carId) => {
    toast.info(
      <>
        <p>Are you sure you want to deactivate this car?</p>
        <div className="flex justify-end space-x-2">
          <Button
            className="bg-red-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-700 transition duration-200 ease-in-out text-xs"
            onClick={async () => {
              await deactivateCar(carId);
              fetchCars();
              toast.dismiss();
              toast.success("Car deactivated successfully");
            }}
          >
            <FaPause className="inline mr-1" /> Deactivate
          </Button>
          <Button
            className="bg-gray-300 text-gray-700 py-1 px-3 rounded-md shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out text-xs"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </Button>
        </div>
      </>,
      { autoClose: false, closeButton: false }
    );
  };

  const handleActivate = (carId) => {
    toast.info(
      <>
        <p>Are you sure you want to activate this car?</p>
        <div className="flex justify-end space-x-2">
          <Button
            className="bg-green-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-green-700 transition duration-200 ease-in-out text-xs"
            onClick={async () => {
              await activateCar(carId);
              fetchCars();
              toast.dismiss();
              toast.success("Car activated successfully");
            }}
          >
            <FaPause className="inline mr-1" /> Activate
          </Button>
          <Button
            className="bg-gray-300 text-gray-700 py-1 px-3 rounded-md shadow-sm hover:bg-gray-400 transition duration-200 ease-in-out text-xs"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </Button>
        </div>
      </>,
      { autoClose: false, closeButton: false }
    );
  };

  const handleViewDetails = async (carId) => {
    try {
      const data = await getByCarId(carId);
      const latestData = data?.items[data.items.length - 1] || {};
      setSelectedCarDetails({
        kilometers: latestData.actualKm || "N/A",
        trips: "5 Trips (Placeholder)",
        otherData: "Other details here...",
      });
    } catch (error) {
      console.error("Error fetching car details:", error);
      toast.error("Failed to load car details.");
    }
  };

  const carHeaders = ["Brand", "Model", "Year", "License Plate", "State"];

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="mb-6 flex justify-between items-center pt-20">
        <h2 className="text-3xl font-bold text-indigo-700">Car Management</h2>
        <Link to="/dashboard/cars/new">
          <Button className="bg-indigo-500 text-white py-1.5 px-5 rounded-md shadow-md hover:bg-indigo-600 transition duration-200 ease-in-out text-sm flex items-center space-x-2">
            <FaPlus className="inline" />
            <span>Add New Car</span>
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex space-x-4">
        <Select onValueChange={(value) => setCarState(value)} value={carState}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Filter by state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
            <SelectItem value="INACTIVE">INACTIVE</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          value={licensePlateFilter}
          onChange={handleLicensePlateChange}
          placeholder="Search by License Plate"
          className="px-4 py-2 border border-gray-300 rounded-md w-48"
        />
      </div>

      <div className="border rounded-lg shadow-sm">
        <div className="overflow-y-auto max-h-[600px]">
          {" "}
          <table className="min-w-full bg-white">
            <Table
              headers={carHeaders}
              data={carsData}
              RowComponent={CarTableRow}
              rowProps={{
                onDelete: handleDeactivate,
                onViewDetails: handleViewDetails,
                onActivate: handleActivate,
                onDeactivate: handleDeactivate,
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

      {selectedCarDetails && (
        <CarDetailsModal
          details={selectedCarDetails}
          onClose={() => setSelectedCarDetails(null)}
        />
      )}
    </div>
  );
};

export default CarManagement;
