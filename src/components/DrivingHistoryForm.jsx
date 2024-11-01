import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDrivingHistory from "@/hooks/useDrivingHistory"; 
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DriverHistoryForm = () => {
  const { drivingHistoryId } = useParams();
  const { getById, createDrivingHistory, updateDrivingHistory } = useDrivingHistory();
  const [historyData, setHistoryData] = useState({
    drivingDate: "",
    kmDriven: "",
    driverId: "",
    carId: "", 
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (drivingHistoryId) {
      fetchHistoryData();
    }
  }, [drivingHistoryId]);

  const fetchHistoryData = async () => {
    try {
      const res = await getById(drivingHistoryId);
      setHistoryData(res);
    } catch (error) {
      console.error("Error fetching driving history data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (drivingHistoryId) {
        await updateDrivingHistory(drivingHistoryId, historyData); 
      } else {
        await createDrivingHistory(historyData); 
      }
      navigate("/dashboard/driver-activity");
      toast.success("Driving history saved successfully!");
    } catch (error) {
      console.error("Error saving driving history:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate("/dashboard/driver-activity")}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <AiOutlineArrowLeft className="mr-2" size={24} />
            <span className="font-semibold">Back to Driving History</span>
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {drivingHistoryId ? "Edit Driving History" : "Add New Driving History"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="drivingDate" className="block font-semibold text-gray-700">
              Driving Date
            </Label>
            <Input
              type="date"
              id="drivingDate"
              value={historyData.drivingDate}
              onChange={(e) => setHistoryData({ ...historyData, drivingDate: e.target.value })}
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
              onChange={(e) => setHistoryData({ ...historyData, kmDriven: e.target.value })}
              placeholder="Enter kilometers driven"
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label htmlFor="driverId" className="block font-semibold text-gray-700">
              Driver ID
            </Label>
            <Input
              type="text"
              id="driverId"
              value={historyData.driverId}
              onChange={(e) => setHistoryData({ ...historyData, driverId: e.target.value })}
              placeholder="Enter driver ID"
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label htmlFor="carId" className="block font-semibold text-gray-700">
              Car ID
            </Label>
            <Input
              type="text"
              id="carId"
              value={historyData.carId}
              onChange={(e) => setHistoryData({ ...historyData, carId: e.target.value })}
              placeholder="Enter car ID"
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
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
