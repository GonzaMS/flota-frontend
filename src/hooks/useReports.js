import { getToken } from "@/utils/getToken";
import { useState } from "react";
import api from "../utils/api";

const useReports = () => {
  const REPORTS_URL = "/api/v1/car-reports";

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función genérica de solicitud
  const handleRequest = async (requestFunction) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await requestFunction();
      return res.data; // Devuelve el resultado de la solicitud
    } catch (err) {
      setError(err.response?.data || "Unknown Error");
      throw err; // Lanza el error para que el componente lo maneje
    } finally {
      setIsLoading(false);
    }
  };

  // Función específica para obtener el reporte PDF
  const getReports = async () => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${REPORTS_URL}/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Asegura que la respuesta sea un blob para manejar archivos PDF
      })
    );
  };

  return {
    getReports,
    isLoading,
    error,
  };
};

export default useReports;
