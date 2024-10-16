import { Button } from "@/components/ui/button";
import useCars from "@/hooks/useCars";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CarManagement = () => {
  const [carsData, setCarsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getCars, deleteCar } = useCars();

  const fetchCars = async () => {
    try {
      const res = await getCars();
      setCarsData(res.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
      toast.error("Failed to load cars.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = (carId) => {
    toast.info(
      <>
        <p>Are you sure you want to delete this car?</p>
        <div className="flex justify-end">
          <Button
            className="mr-2 bg-red-500 text-white"
            onClick={() => confirmDelete(carId)}
          >
            Delete
          </Button>
          <Button className="bg-gray-500 text-white" onClick={cancelDelete}>
            Cancel
          </Button>
        </div>
      </>,
      {
        autoClose: false,
        closeButton: false,
      }
    );
  };

  const confirmDelete = async (carId) => {
    try {
      await deleteCar(carId);
      fetchCars();
      toast.dismiss();
      toast.success("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Error deleting car.");
    }
  };

  const cancelDelete = () => {
    toast.dismiss();
  };

  if (loading) {
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

  if (!carsData || carsData.length === 0) {
    return (
      <p className="text-center text-lg font-semibold">No cars available.</p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Car Management</h2>

      <div className="mb-6 flex justify-end">
        <Link to="/dashboard/cars/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow">
            Add New Car
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                Car ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                License Plate
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {carsData.map((car, index) => (
              <tr
                key={car.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                  {car.id}
                </td>
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
    </div>
  );
};

export default CarManagement;
