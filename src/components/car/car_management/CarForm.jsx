import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCars from "@/hooks/useCars";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CarForm = () => {
  const { carId } = useParams();
  const { getById, createCar } = useCars();
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
      setCarData({
        ...res,
        fabricationYear: res.fabricationYear
          ? res.fabricationYear.slice(0, 4)
          : "", // Only year
      });
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCar({ ...carData, fabricationYear: carData.fabricationYear });
      navigate("/dashboard/cars");
      toast.success("Car saved successfully!");
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate("/dashboard/cars")}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <AiOutlineArrowLeft className="mr-2" size={24} />
            <span className="font-semibold">Back to cars</span>
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {carId ? "Edit Car" : "Add New Car"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="brand"
              className="block font-semibold text-gray-700"
            >
              Brand
            </Label>
            <Input
              id="brand"
              value={carData.brand}
              onChange={(e) =>
                setCarData({ ...carData, brand: e.target.value })
              }
              placeholder="Enter car brand"
              required
              className="w-full mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="model"
              className="block font-semibold text-gray-700"
            >
              Model
            </Label>
            <Input
              id="model"
              value={carData.model}
              onChange={(e) =>
                setCarData({ ...carData, model: e.target.value })
              }
              placeholder="Enter car model"
              required
              className="w-full mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="fabricationYear"
              className="block font-semibold text-gray-700"
            >
              Fabrication Year
            </Label>
            <Input
              type="number"
              id="fabricationYear"
              value={carData.fabricationYear}
              onChange={(e) =>
                setCarData({ ...carData, fabricationYear: e.target.value })
              }
              min="1900"
              max={new Date().getFullYear()}
              placeholder="Enter year (e.g., 2008)"
              required
              className="w-full mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="license"
              className="block font-semibold text-gray-700"
            >
              License Plate
            </Label>
            <Input
              id="license"
              value={carData.licensePlate}
              onChange={(e) =>
                setCarData({ ...carData, licensePlate: e.target.value })
              }
              placeholder="Enter license plate"
              required
              className="w-full mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="state"
              className="block font-semibold text-gray-700"
            >
              State
            </Label>
            <select
              id="state"
              value={carData.state}
              onChange={(e) =>
                setCarData({ ...carData, state: e.target.value })
              }
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300"
          >
            {carId ? "Update Car" : "Add Car"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
