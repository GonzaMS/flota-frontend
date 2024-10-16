import { Button } from "@/components/ui/button";
import useCars from "@/hooks/useCars";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CarForm = () => {
  const { carId } = useParams();
  const { getById, saveCar } = useCars();
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    fabricationYear: "",
    licensePlate: "",
    state: "ACTIVE",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (carId) {
      fetchCarData();
    }
  }, [carId]);

  const fetchCarData = async () => {
    try {
      const res = await getById(carId);
      setCarData(res);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveCar(carData);
      navigate("/dashboard/cars");
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {carId ? "Edit Car" : "Add New Car"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="brand" className="block font-semibold">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            value={carData.brand}
            onChange={(e) => setCarData({ ...carData, brand: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block font-semibold">
            Model
          </label>
          <input
            type="text"
            id="model"
            value={carData.model}
            onChange={(e) => setCarData({ ...carData, model: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fabricationYear" className="block font-semibold">
            Fabrication Year
          </label>
          <input
            type="date"
            id="fabricationYear"
            value={carData.fabricationYear}
            onChange={(e) =>
              setCarData({ ...carData, fabricationYear: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="license" className="block font-semibold">
            License Plate
          </label>
          <input
            type="text"
            id="license"
            value={carData.licensePlate}
            onChange={(e) =>
              setCarData({ ...carData, licensePlate: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block font-semibold">
            State
          </label>
          <select
            id="state"
            value={carData.state}
            onChange={(e) => setCarData({ ...carData, state: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <Button className="bg-indigo-500 text-white" type="submit">
          {carId ? "Update Car" : "Add Car"}
        </Button>
      </form>
    </div>
  );
};

export default CarForm;
