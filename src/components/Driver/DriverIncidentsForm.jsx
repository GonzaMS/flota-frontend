import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDriverIncidents from "@/hooks/useDriverIncidents";
import useDrivers from "@/hooks/useDrivers"; 
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DriverIncidentsForm = () => {
  const { incidentId } = useParams();
  const { getIncidentById, createIncident, updateIncident } = useDriverIncidents();
  const { drivers, getDrivers } = useDrivers(); 
  const [incidentData, setIncidentData] = useState({
    incidentDescription: "",
    createdAt: "",
    incidentType: "",
    driverId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (incidentId) {
      fetchIncidentData();
    }
    getDrivers(); 
  }, [incidentId]);

  const fetchIncidentData = async () => {
    try {
      const res = await getIncidentById(incidentId);
      const formattedDate = res.createdAt.split("T")[0];
      setIncidentData({
        ...res,
        createdAt: formattedDate,
      });
    } catch (error) {
      console.error("Error fetching incident data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (incidentId) {
        await updateIncident(incidentId, incidentData);
      } else {
        await createIncident(incidentData);
      }
      navigate("/dashboard/driver-incidents");
      toast.success("Incident saved successfully!");
    } catch (error) {
      console.error("Error saving incident:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate("/dashboard/driver-incidents")}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <AiOutlineArrowLeft className="mr-2" size={24} />
            <span className="font-semibold">Back to Driver Activity</span>
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {incidentId ? "Edit Incident" : "Add New Incident"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="incidentDescription" className="block font-semibold text-gray-700">
              Incident Description
            </Label>
            <Input
              type="text"
              id="incidentDescription"
              value={incidentData.incidentDescription}
              onChange={(e) =>
                setIncidentData({ ...incidentData, incidentDescription: e.target.value })
              }
              placeholder="Describe the incident"
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label htmlFor="createdAt" className="block font-semibold text-gray-700">
              Incident Date
            </Label>
            <Input
              type="date"
              id="createdAt"
              value={incidentData.createdAt}
              onChange={(e) =>
                setIncidentData({ ...incidentData, createdAt: e.target.value })
              }
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label htmlFor="incidentType" className="block font-semibold text-gray-700">
              Incident Type
            </Label>
            <Input
              type="text"
              id="incidentType"
              value={incidentData.incidentType}
              onChange={(e) =>
                setIncidentData({ ...incidentData, incidentType: e.target.value })
              }
              placeholder="Enter type of incident"
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label htmlFor="driverId" className="block font-semibold text-gray-700">
              Driver
            </Label>
            <select
              id="driverId"
              value={incidentData.driverId}
              onChange={(e) =>
                setIncidentData({ ...incidentData, driverId: e.target.value })
              }
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            >
              <option value="">Select a driver</option>
              {drivers.map((driver) => (
                <option key={driver.driverId} value={driver.driverId}>
                  {driver.driverName}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300"
          >
            {incidentId ? "Update Incident" : "Add Incident"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DriverIncidentsForm;
