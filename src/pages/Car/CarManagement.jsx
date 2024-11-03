import CarTableRow from "@/components/car/car_management/CarTableRow";
import CarDetailsModal from "@/components/common/CarDetailsModal";
import Loader from "@/components/common/Loader";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import useCars from "@/hooks/useCars";
import useKilometers from "@/hooks/useKilometers";
import { useCallback, useEffect, useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CarManagement = () => {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);
  const { getCars, deleteCar, pagination } = useCars();
  const { getByCarId } = useKilometers();

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCars(currentPage, pagination.pageSize);
      setCarsData(res.items);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars.");
    } finally {
      setLoading(false);
    }
  }, [getCars, currentPage, pagination.pageSize]);

  useEffect(() => {
    fetchCars();
  }, [currentPage]);

  const handleDelete = (carId) => {
    toast.info(
      <>
        <p>Are you sure you want to delete this car?</p>
        <div className="flex justify-end space-x-2">
          <Button
            className="bg-red-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-700 transition duration-200 ease-in-out text-xs"
            onClick={async () => {
              await deleteCar(carId);
              fetchCars();
              toast.dismiss();
            }}
          >
            <FaTrashAlt className="inline mr-1" /> Delete
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

      <Table
        headers={carHeaders}
        data={carsData}
        RowComponent={CarTableRow}
        rowProps={{ onDelete: handleDelete, onViewDetails: handleViewDetails }}
      />

      <div className="flex justify-center mt-6">
        <Pagination
          pageCount={pagination.totalPages}
          onPageChange={(e) => setCurrentPage(e.selected)}
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
