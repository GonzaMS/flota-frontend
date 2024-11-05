import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDrivingHistory from "@/hooks/useDrivingHistory";
import useAssignedOrders from "@/hooks/useAssignedOrders";
import useDrivers from "@/hooks/useDrivers"; 
import useCars from "@/hooks/useCars"; 
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DriverHistoryForm = () => {
  const { drivingHistoryId } = useParams();
  const { getById, createDrivingHistory, updateDrivingHistory } = useDrivingHistory();
  const { getAssignedOrders, assignedOrders } = useAssignedOrders();
  const { getDrivers, drivers } = useDrivers();
  const { getCars, cars } = useCars(); 
  const [historyData, setHistoryData] = useState({
    createdAt: "", 
    kmDriven: "",
    assignedOrderId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      await fetchAssignedOrdersData(); 
      await fetchDriversData(); 
      await fetchCarsData(); 
      if (drivingHistoryId) {
        await fetchHistoryData();
      }
    };
    loadData();
  }, [drivingHistoryId]);

  const fetchHistoryData = async () => {
    try {
      const res = await getById(drivingHistoryId);
      const formattedDate = res.createdAt.split("T")[0]; 
      setHistoryData({
        ...res,
        createdAt: formattedDate, 
      });
    } catch (error) {
      console.error("Error fetching driving history data:", error);
    }
  };

  const fetchAssignedOrdersData = async () => {
    try {
      await getAssignedOrders(); 
    } catch (error) {
      console.error("Error fetching assigned orders:", error);
    }
  };

  const fetchDriversData = async () => {
    try {
      await getDrivers(); 
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchCarsData = async () => {
    try {
      await getCars(); 
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!historyData.drivingDate) {
      toast.error("Driving date is required.");
      return;
    }

    try {
      if (drivingHistoryId) {
        await updateDrivingHistory(drivingHistoryId, historyData);
      } else {
        await createDrivingHistory(historyData);
      }
      navigate("/dashboard/driver-history");
      toast.success("Driving history saved successfully!");
    } catch (error) {
      console.error("Error saving driving history:", error);
      toast.error("Error saving driving history. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate("/dashboard/driver-history")}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <AiOutlineArrowLeft className="mr-2" size={24} />
            <span className="font-semibold">Back to Driver history</span>
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {drivingHistoryId ? "Edit Driving History" : "Add New Driving History"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="createdAt" className="block font-semibold text-gray-700">
              Driving Date
            </Label>
            <Input
              type="date"
              id="createdAt"
              value={historyData.createdAt}
              onChange={(e) =>
                setHistoryData({ ...historyData, createdAt: e.target.value })
              }
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label htmlFor="kmDriven" className="block font-semibold text-gray-700">
              Kilometers Driven
            </Label>
            <Input
              type="number"
              id="kmDriven"
              value={historyData.kmDriven}
              onChange={(e) =>
                setHistoryData({ ...historyData, kmDriven: e.target.value })
              }
              placeholder="Enter kilometers driven"
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label htmlFor="assignedOrderId" className="block font-semibold text-gray-700">
              Assigned Order
            </Label>
            <select
              id="assignedOrderId"
              value={historyData.assignedOrderId}
              onChange={(e) =>
                setHistoryData({ ...historyData, assignedOrderId: e.target.value })
              }
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            >
              <option value="">Select a Driver</option>
              {assignedOrders.map((order) => {
                const driver = drivers.find(d => d.driverId === order.driverId);
                const car = cars.find(c => c.id === order.carId);
                return (
                  <option key={order.assignedOrderId} value={order.assignedOrderId}>
                    Driver: {driver ? driver.driverName : "Unknown"} - Car: {car ? car.brand : "Unknown"}
                  </option>
                );
              })}
            </select>
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300"
          >
            {drivingHistoryId ? "Update Driving History" : "Add Driving History"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DriverHistoryForm;
