import { getToken } from "@/utils/getToken";
import { useState } from "react";
import api from "../utils/api";

const useReports = () => {
  const REPORTS_URL = "/api/v1/car-reports";

  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async (requestFunction) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await requestFunction();
      setCars(res.data.items);
      return res.data;
    } catch (err) {
      setError(err.response?.data || "Unknown Error");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getReports = async () => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${REPORTS_URL}/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  return {
    cars,
    error,
    isLoading,
    getReports,
  };
};

export default useReports;
