import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCars from "@/hooks/useCars";
import useMaintenances from "@/hooks/useMaintenances";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

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

  useEffect(() => {
    fetchCars();
    if (maintenanceId) {
      loadMaintenance();
    }
  }, [maintenanceId]);

  const fetchCars = async () => {
    const carsData = await getCars();
    setCars(carsData.items);
  };

  const loadMaintenance = async () => {
    const data = await getById(maintenanceId);
    setFormData({
      carId: data.carId,
      description: data.description,
      cost: data.cost,
      type: data.type,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (maintenanceId) {
        await updateMaintenance(maintenanceId, formData);
        toast.success("Maintenance updated successfully!");
      } else {
        await createMaintenance(formData);
        toast.success("Maintenance created successfully!");
      }
      navigate("/dashboard/maintenance");
    } catch (error) {
      toast.error("Error saving maintenance.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {maintenanceId ? "Edit Maintenance" : "Add New Maintenance"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="carId"
              className="block font-semibold text-gray-700"
            >
              Select Car
            </Label>
            <select
              id="carId"
              name="carId"
              value={formData.carId}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            >
              <option value="">Choose a car</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.brand} {car.model} - {car.licensePlate}
                </option>
              ))}
            </select>
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
              value={formData.description}
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
              value={formData.cost}
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
              value={formData.type}
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
