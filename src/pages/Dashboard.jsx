import useCars from "@/hooks/useCars";
import useKilometers from "@/hooks/useKilometers";
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

  const { getCars } = useCars();
  const { getKilometers } = useKilometers();

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

  if (!carsData || !kilometerData) {
    return <p>Cargando datos...</p>;
  }

  const carStatusData = {
    labels: ["ACTIVOS", "INACTIVOS"],
    datasets: [
      {
        label: "Estado de Vehículos",
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
    labels: kilometerData.map((km) => `Vehículo ${km.carId}`),
    datasets: [
      {
        label: "Kilometraje (km)",
        data: kilometerData.map((km) => km.actualKm),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
      {/* Gráfico de Estado de Vehículos */}
      <div className="col-span-1 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-bold">Estado de Vehículos</h3>
        <Pie data={carStatusData} />
      </div>

      {/* Gráfico de Kilometraje Recorrido */}
      <div className="col-span-1 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-bold">Kilometraje Recorrido</h3>
        <Bar data={KilometersDataStatus} />
      </div>
    </div>
  );
};

export default Dashboard;
