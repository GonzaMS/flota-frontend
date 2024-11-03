import { Button } from "@/components/ui/button";
import useDriverIncidents from "@/hooks/useDriverIncidents";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DriverIncidentsManagement = () => {
  const [incidentsData, setIncidentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getIncidents, deleteIncident, isLoading } = useDriverIncidents();

  const fetchIncidents = async () => {
    try {
      const res = await getIncidents();
      setIncidentsData(res.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching incidents:", error);
      setLoading(false);
      toast.error("Failed to load incidents.");
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleDelete = (incidentId) => {
    toast.info(
      <>
        <p>Are you sure you want to delete this incident?</p>
        <div className="flex justify-end">
          <Button className="mr-2 bg-red-500 text-white" onClick={() => confirmDelete(incidentId)}>
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

  const confirmDelete = async (incidentId) => {
    try {
      await deleteIncident(incidentId);
      fetchIncidents();
      toast.dismiss();
      toast.success("Incident deleted successfully!");
    } catch (error) {
      console.error("Error deleting incident:", error);
      toast.error("Error deleting incident.");
    }
  };

  const cancelDelete = () => {
    toast.dismiss();
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
  }

  if (!incidentsData || incidentsData.length === 0) {
    return <p className="text-center text-lg font-semibold">No incidents available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-6 flex justify-between items-center pt-20">
        <h2 className="text-3xl font-bold text-gray-800">Driver Incidents Management</h2>
        <Link to="/dashboard/driver-incidents/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow">
            Add New Incident
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg p-4">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Incident ID</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Driver ID</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incidentsData.map((incident, index) => (
              <tr key={incident.incidentId} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{incident.incidentId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{incident.incidentDescription}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{incident.incidentType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{new Date(incident.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{incident.driverId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium flex space-x-3">
                  <Link
                    to={`/dashboard/driver-incidents/${incident.incidentId}/edit`}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </Link>
                  <Button
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                    onClick={() => handleDelete(incident.incidentId)}
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

export default DriverIncidentsManagement;
