import { Button } from "@/components/ui/button";
import useDrivingHistory from "@/hooks/useDrivingHistory"; 
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DriverHistoryManagement = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getDrivingHistories, deleteDrivingHistory } = useDrivingHistory();

  const fetchHistory = async () => {
    try {
      const res = await getDrivingHistories();
      setHistoryData(res.items); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching driving history:", error);
      setLoading(false);
      toast.error("Failed to load driving history.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = (drivingHistoryId) => {
    toast.info(
      <>
        <p>Are you sure you want to delete this driving history?</p>
        <div className="flex justify-end">
          <Button className="mr-2 bg-red-500 text-white" onClick={() => confirmDelete(drivingHistoryId)}>
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

  const confirmDelete = async (drivingHistoryId) => {
    try {
      await deleteDrivingHistory(drivingHistoryId);
      fetchHistory();
      toast.dismiss();
      toast.success("Driving history deleted successfully!");
    } catch (error) {
      console.error("Error deleting driving history:", error);
      toast.error("Error deleting driving history.");
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

  if (!historyData || historyData.length === 0) {
    return <p className="text-center text-lg font-semibold">No driving history available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-6 flex justify-between items-center pt-20">
        <h2 className="text-3xl font-bold text-gray-800">Driving History Management</h2>
        <Link to="/dashboard/driver-activity/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow">
            Add New Driving History
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg p-4">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Driving History ID</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Driving Date</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Kilometers Driven</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Driver ID</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Car ID</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {historyData.map((history, index) => (
              <tr key={history.drivingHistoryId} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{history.drivingHistoryId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{new Date(history.createdAt).toLocaleDateString()}{""}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{history.kmDriven}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{history.driverId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{history.carId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium flex space-x-3">
                  <Link
                    to={`/dashboard/driver-activity/${history.drivingHistoryId}/edit`}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </Link>
                  <Button
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                    onClick={() => handleDelete(history.drivingHistoryId)}
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

export default DriverHistoryManagement;
