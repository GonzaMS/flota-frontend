import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAssignedOrder from "@/hooks/useAssignedOrders";
import useDrivers from "@/hooks/useDrivers";
import useCars from "@/hooks/useCars";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DriverAssignerForm = () => {
  const { assignmentId } = useParams();
  const { getById, saveAssignedOrder, updateAssignedOrder } =
    useAssignedOrder();
  const { drivers, getDrivers } = useDrivers();
  const { cars, getCars } = useCars();
  const [assignmentData, setAssignmentData] = useState({
    driverId: "",
    carId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (assignmentId) {
      fetchAssignmentData();
    }
    getDrivers();
    getCars();
  }, [assignmentId]);

  const fetchAssignmentData = async () => {
    try {
      const res = await getById(assignmentId);
      setAssignmentData({
        driverId: res.driverId,
        carId: res.carId,
      });
    } catch (error) {
      console.error("Error fetching driver assignment data:", error);
      toast.error("Failed to fetch assignment data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (assignmentId) {
        await updateAssignedOrder(assignmentId, {
          driverId: assignmentData.driverId,
          carId: assignmentData.carId,
        });
      } else {
        await saveAssignedOrder({
          driverId: assignmentData.driverId,
          carId: assignmentData.carId,
        });
      }
      navigate("/dashboard/driver-assigner");
      toast.success("Driver assignment saved successfully!");
    } catch (error) {
      console.error("Error saving driver assignment:", error);
      toast.error("Failed to save assignment.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate("/dashboard/driver-assigner")}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <AiOutlineArrowLeft className="mr-2" size={24} />
            <span className="font-semibold">Back to Driver Assignments</span>
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {assignmentId ? "Edit Driver Assignment" : "Add Assign Driver to Car"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="driverId"
              className="block font-semibold text-gray-700"
            >
              Driver
            </Label>
            <select
              id="driverId"
              value={assignmentData.driverId}
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  driverId: e.target.value,
                })
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

          <div>
            <Label
              htmlFor="carId"
              className="block font-semibold text-gray-700"
            >
              Select Car
            </Label>
            <select
              id="carId"
              value={assignmentData.carId}
              onChange={(e) =>
                setAssignmentData({ ...assignmentData, carId: e.target.value })
              }
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            >
              <option value="">Select Brand and License Plate</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.brand} - {car.licensePlate}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300"
          >
            {assignmentId ? "Update Assignment" : "Add Assign Driver"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DriverAssignerForm;
