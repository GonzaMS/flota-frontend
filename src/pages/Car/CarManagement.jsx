import { Button } from "@/components/ui/button";
import useCars from "@/hooks/useCars";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CarManagement = () => {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const { getCars, deleteCar, pagination } = useCars();

  const fetchCars = async (page = 0) => {
    setLoading(true);
    try {
      const res = await getCars(page, pagination.pageSize);
      setCarsData(res.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
      toast.error("Failed to load cars.");
    }
  };

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage]);

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
      fetchCars(currentPage);
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

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
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
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                License Plate
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                Actions
              </th>
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
          pageLinkClassName="page-link px-3 py-2 border border-gray-300 rounded-md hover:bg-indigo-200 hover:text-indigo-800 transition-colors"
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

export default CarManagement;
