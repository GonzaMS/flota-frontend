import { getToken } from "@/utils/getToken";
import { useState } from "react";
import api from "../utils/api";

const useCars = () => {
  const CARS_URL = "/api/v1/cars";

  const [cars, setCars] = useState([]);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    isLast: true,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async (requestFunction) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await requestFunction();
      setCars(res.data.items);
      setPagination({
        pageNumber: res.data.pageNumber,
        pageSize: res.data.pageSize,
        totalElements: res.data.totalElements,
        totalPages: res.data.totalPages,
        isLast: res.data.isLast,
      });
      return res.data;
    } catch (err) {
      setError(err.response?.data || "Unknown Error");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getCars = async (page = 0, pageSize = 10) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${CARS_URL}?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  return { cars, pagination, error, isLoading, getCars };
};

export default useCars;
