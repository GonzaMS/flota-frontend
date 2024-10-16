import useCars from "@/hooks/useCars";
import useKilometers from "@/hooks/useKilometers";
import useMaintenances from "@/hooks/useMaintenances";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [carsData, setCarsData] = useState(null);
  const [kilometerData, setKilometerData] = useState(null);
  const [maintenancesData, setMaintenancesData] = useState(null);

  const { getCars } = useCars();
  const { getKilometers } = useKilometers();
  const { getMaintenances } = useMaintenances();

  const fetchCars = async () => {
    try {
      const res = await getCars();
      setCarsData(res.items);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchKilometers = async () => {
    try {
      const res = await getKilometers();
      setKilometerData(res.items);
    } catch (error) {
      console.error("Error fetching kilometers data:", error);
    }
  };

  useEffect(() => {
    fetchKilometers();
  }, []);

  const fetchMaintenances = async () => {
    try {
      const res = await getMaintenances();
      setMaintenancesData(res.items);
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    }
  };

  useEffect(() => {
    fetchMaintenances();
  }, []);

  if (!carsData || !kilometerData || !maintenancesData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
  }

  const carStatusData = {
    labels: ["ACTIVE", "INACTIVE"],
    datasets: [
      {
        label: "Car States",
        data: [
          carsData.filter((car) => car.state === "ACTIVE").length,
          carsData.filter((car) => car.state === "INACTIVE").length,
        ],
        backgroundColor: ["#4caf50", "#ff9800"],
        borderColor: ["#388e3c", "#f57c00"],
        borderWidth: 1,
      },
    ],
  };

  const KilometersDataStatus = {
    labels: kilometerData.map((km) => `Car ${km.carId}`),
    datasets: [
      {
        label: "Kilometers (km)",
        data: kilometerData.map((km) => km.actualKm),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const maintenanceDataStatus = {
    labels: maintenancesData.map((item) => `Car ${item.carId}`),
    datasets: [
      {
        label: "Maintenance Cost (in $)",
        data: maintenancesData.map((item) => item.cost),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-12">
      <div className="col-span-1 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-bold">Car States</h3>
        <Pie data={carStatusData} />
      </div>

      <div className="col-span-1 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-bold">Kilometers traveled</h3>
        <Bar data={KilometersDataStatus} />
      </div>

      <div className="col-span-1 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-bold">Maintenance History</h3>
        <Bar data={maintenanceDataStatus} />
      </div>
    </div>
  );
};

export default Dashboard;
