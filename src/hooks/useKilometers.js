import { getToken } from "@/utils/getToken";
import { useState } from "react";
import api from "../utils/api";

const useKilometers = () => {
  const KILOMETERS_URL = "/api/v1/kilometers";

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

  const getKilometers = async (page = 0, pageSize = 10) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${KILOMETERS_URL}?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const createKilometer = async (kilometers) => {
    const token = getToken();
    return handleRequest(() =>
      api.post(KILOMETERS_URL, kilometers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const updateKilometer = async (kilometers) => {
    const token = getToken();
    return handleRequest(() =>
      api.put(`${KILOMETERS_URL}/${kilometers.id}`, kilometers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const deleteKilometer = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.delete(`${KILOMETERS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  // Filter
  // Car Id and Date Range
  const getByCarIdAndDate = async (
    carId,
    startDate,
    endDate,
    page = 0,
    pageSize = 10
  ) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(
        `${KILOMETERS_URL}/filter?carId=${carId}&pageNumber=${page}&pageSize=${pageSize}`,
        startDate,
        endDate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
  };

  return {
    cars,
    pagination,
    error,
    isLoading,
    getKilometers,
    createKilometer,
    updateKilometer,
    deleteKilometer,
    getByCarIdAndDate,
  };
};

export default useKilometers;
