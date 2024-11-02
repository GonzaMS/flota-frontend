import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCars from "@/hooks/useCars";
import useMaintenances from "@/hooks/useMaintenances";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const fetchCarsData = async (getCars, setCars) => {
  const carsData = await getCars();
  setCars(carsData.items);
};

const loadMaintenanceData = async (maintenanceId, getById, setFormData) => {
  if (!maintenanceId) return;
  const data = await getById(maintenanceId);
  setFormData({
    carId: data.carId,
    description: data.description,
    cost: data.cost,
    type: data.type,
  });
};

const MaintenanceForm = () => {
  const { maintenanceId } = useParams();
  const navigate = useNavigate();
  const { getById, createMaintenance, updateMaintenance } = useMaintenances();
  const { getCars } = useCars();

  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    carId: "",
    description: "",
    cost: "",
    type: "",
  });
  const [currentCarName, setCurrentCarName] = useState("");

  const fetchInitialData = useCallback(async () => {
    await fetchCarsData(getCars, setCars);
    await loadMaintenanceData(maintenanceId, getById, setFormData);
  }, [getCars, maintenanceId, getById]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    const car = cars.find((car) => car.id === formData.carId);
    setCurrentCarName(
      car ? `${car.brand} ${car.model} - ${car.licensePlate}` : ""
    );
  }, [formData.carId, cars]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (maintenanceId) {
        await updateMaintenance({ ...formData, id: maintenanceId });
        toast.success("Maintenance updated successfully!");
      } else {
        await createMaintenance(formData);
        toast.success("Maintenance created successfully!");
      }
      navigate("/dashboard/maintenance");
    } catch {
      toast.error("Error saving maintenance.");
    }
  };

  const { description, cost, type } = formData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate("/dashboard/maintenance")}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <AiOutlineArrowLeft className="mr-2" size={24} />
            <span className="font-semibold">Back to maintenances</span>
          </button>
        </div>
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {maintenanceId ? "Edit Maintenance" : "Add New Maintenance"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="carName"
              className="block font-semibold text-gray-700"
            >
              Car
            </Label>
            <Input
              id="carName"
              value={currentCarName}
              readOnly
              className="w-full mt-1 text-gray-800"
            />
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
              value={description}
              onChange={handleChange}
              placeholder="Enter description"
              required
              className="w-full mt-1"
            />
          </div>

          <div>
            <Label htmlFor="cost" className="block font-semibold text-gray-700">
              Cost
            </Label>
            <Input
              type="number"
              id="cost"
              name="cost"
              value={cost}
              onChange={handleChange}
              placeholder="Enter cost"
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
              value={type}
              onChange={handleChange}
              placeholder="Enter type"
              required
              className="w-full mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            {maintenanceId ? "Update Maintenance" : "Add Maintenance"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;
