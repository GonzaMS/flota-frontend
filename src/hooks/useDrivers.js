import { getToken } from "@/utils/getToken";
import { useState } from "react";
import api from "../utils/api";

const useDrivers = () => {
  const DRIVERS_URL = "/api/v1/drivers"; 

  const [drivers, setDrivers] = useState([]);
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
      setDrivers(res.data.items);
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

  const getDrivers = async (page = 0, pageSize = 10) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${DRIVERS_URL}?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const getByIdDriver = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${DRIVERS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const getDriversByName = async (name, page = 0, pageSize = 10) => {
    const token = getToken(); 
    return handleRequest(() =>
      api.get(`${DRIVERS_URL}/name/${name}?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };
  

  const createDriver = async (driver) => {
    const token = getToken();
    return handleRequest(() =>
      api.post(DRIVERS_URL, driver, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const updateDriver = async (id, driver) => {
    const token = getToken();
    return handleRequest(() =>
      api.put(`${DRIVERS_URL}/${id}`, driver, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const deleteDriver = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.delete(`${DRIVERS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  return {
    drivers,
    pagination,
    error,
    isLoading,
    getDrivers,
    getByIdDriver,
    getDriversByName,
    createDriver,
    updateDriver,
    deleteDriver,
  };
};

export default useDrivers;
