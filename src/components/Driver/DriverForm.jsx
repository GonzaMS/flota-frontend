import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDrivers from "@/hooks/useDrivers";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DriverForm = () => {
  const { driverId } = useParams();
  const { getById, createDriver, updateDriver } = useDrivers();
  const [driverData, setDriverData] = useState({
    driverName: "",
    driverLicense: "",
    driverState: "ACTIVE",
    driverLicenseExpirationDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (driverId) {
      fetchDriverData();
    }
  }, [driverId]);

  const fetchDriverData = async () => {
    try {
      const res = await getById(driverId);
      const formattedDate = res.driverLicenseExpirationDate.split("T")[0];
      setDriverData({
        ...res,
        driverLicenseExpirationDate: formattedDate,
      });
    } catch (error) {
      console.error("Error fetching driver data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (driverId) {
        await updateDriver(driverId, driverData); 
      } else {
        await createDriver(driverData); 
      }
      navigate("/dashboard/drivers");
      toast.success("Driver saved successfully!");
    } catch (error) {
      console.error("Error saving driver:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate("/dashboard/drivers")}
            className="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <AiOutlineArrowLeft className="mr-2" size={24} />
            <span className="font-semibold">Back to Drivers</span>
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {driverId ? "Edit Driver" : "Add New Driver"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="driverName"
              className="block font-semibold text-gray-700"
            >
              Driver Name
            </Label>
            <Input
              id="driverName"
              value={driverData.driverName}
              onChange={(e) =>
                setDriverData({ ...driverData, driverName: e.target.value })
              }
              placeholder="Enter driver's name"
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label
              htmlFor="driverLicense"
              className="block font-semibold text-gray-700"
            >
              Driver License
            </Label>
            <Input
              id="driverLicense"
              value={driverData.driverLicense}
              onChange={(e) =>
                setDriverData({ ...driverData, driverLicense: e.target.value })
              }
              placeholder="Enter driver's license"
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label
              htmlFor="driverLicenseExpirationDate"
              className="block font-semibold text-gray-700"
            >
              License Expiration Date
            </Label>
            <Input
              type="date"
              id="driverLicenseExpirationDate"
              value={driverData.driverLicenseExpirationDate}
              onChange={(e) =>
                setDriverData({
                  ...driverData,
                  driverLicenseExpirationDate: e.target.value,
                })
              }
              required
              className="w-full mt-1 p-2 border rounded focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <Label
              htmlFor="driverState"
              className="block font-semibold text-gray-700"
            >
              State
            </Label>
            <select
              id="driverState"
              value={driverData.driverState}
              onChange={(e) =>
                setDriverData({ ...driverData, driverState: e.target.value })
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
            {driverId ? "Update Driver" : "Add Driver"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DriverForm;
