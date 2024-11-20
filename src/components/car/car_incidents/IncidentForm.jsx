import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCarIncidents from "@/hooks/useCarIncidents";
import useCars from "@/hooks/useCars";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const IncidentForm = () => {
  const { incidentId } = useParams();
  const navigate = useNavigate();
  const { getIncidentById, createIncident, updateIncident } = useCarIncidents();
  const { getCars } = useCars();

  const [incidentData, setIncidentData] = useState({
    carId: "",
    description: "",
    type: "",
  });
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeForm = async () => {
      try {
        const carsResponse = await getCars();
        setCars(carsResponse.items || []);

        if (incidentId) {
          const incident = await getIncidentById(incidentId);
          setIncidentData(incident);
        }
      } catch (error) {
        console.error("Error initializing form:", error);
        toast.error("Failed to load data.");
      }
    };

    initializeForm();
  }, [incidentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncidentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (incidentId) {
        await updateIncident(incidentId, incidentData);
        toast.success("Incident updated successfully!");
      } else {
        await createIncident(incidentData);
        toast.success("Incident created successfully!");
      }
      navigate("/dashboard/incidents");
    } catch (error) {
      console.error("Error saving incident:", error);
      toast.error("Failed to save incident.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate("/dashboard/incidents")}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <AiOutlineArrowLeft className="mr-2" size={24} />
            <span className="font-semibold">Back to incidents</span>
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {incidentId ? "Edit Incident" : "Add New Incident"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="carId"
              className="block font-semibold text-gray-700"
            >
              Car
            </Label>
            {incidentId ? (
              <Input
                id="carId"
                value={
                  cars.find((car) => car.id === incidentData.carId)?.brand ||
                  "Unknown Car"
                }
                readOnly
                className="w-full mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            ) : (
              <select
                id="carId"
                name="carId"
                value={incidentData.carId}
                onChange={handleInputChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select a car
                </option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {`${car.brand} ${car.model} - ${car.licensePlate}`}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block font-semibold text-gray-700"
            >
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={incidentData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              required
              className="w-full mt-1"
            />
          </div>

          <div>
            <Label htmlFor="type" className="block font-semibold text-gray-700">
              Type
            </Label>
            <Input
              id="type"
              name="type"
              value={incidentData.type}
              onChange={handleInputChange}
              placeholder="Enter type"
              required
              className="w-full mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded ${
              isLoading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white transition-colors duration-300`}
          >
            {isLoading
              ? "Saving..."
              : incidentId
              ? "Update Incident"
              : "Add Incident"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;
