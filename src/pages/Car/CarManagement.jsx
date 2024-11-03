import Loader from "@/components/common/Loader";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import useCars from "@/hooks/useCars";
import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CarManagement = () => {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const { getCars, deleteCar, pagination } = useCars();

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
  }, [currentPage, pagination.pageSize]);

  const handleDelete = (carId) => {
    toast.info(
      <>
        <p>Are you sure you want to delete this car?</p>
        <div className="flex justify-end">
          <Button
            className="mr-2 bg-red-500 text-white"
            onClick={async () => {
              await deleteCar(carId);
              fetchCars();
              toast.dismiss();
              toast.success("Car deleted successfully!");
            }}
          >
            Delete
          </Button>
          <Button
            className="bg-gray-500 text-white"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </Button>
        </div>
      </>,
      { autoClose: false, closeButton: false }
    );
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (loading) {
    return <Loader />;
  }

  if (!carsData.length) {
    return (
      <p className="text-center text-lg font-semibold">No cars available.</p>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="mb-6 flex justify-between items-center pt-20">
        <h2 className="text-3xl font-bold text-indigo-700">Car Management</h2>
        <Link to="/dashboard/cars/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow">
            Add New Car
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg p-4">
        <table className="min-w-full bg-white">
          <thead className="bg-indigo-700 text-white">
            <tr>
              {[
                "Brand",
                "Model",
                "Year",
                "License Plate",
                "State",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {carsData.map((car, index) => (
              <tr
                key={car.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {car.brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {car.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {car.fabricationYear}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {car.licensePlate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {car.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium flex space-x-3">
                  <Link
                    to={`/dashboard/cars/${car.id}/edit`}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </Link>
                  <Button
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                    onClick={() => handleDelete(car.id)}
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
        <Pagination
          pageCount={pagination.totalPages}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default CarManagement;
