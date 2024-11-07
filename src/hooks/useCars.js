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

  const getById = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${CARS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const createCar = async (car) => {
    const token = getToken();
    return handleRequest(() =>
      api.post(CARS_URL, car, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const updateCar = async (car) => {
    const token = getToken();
    return handleRequest(() =>
      api.put(`${CARS_URL}/${car.id}`, car, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const deactivateCar = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.put(
        `${CARS_URL}/deactivate/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
  };

  const activateCar = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.put(
        `${CARS_URL}/activate/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
  };

  const deleteCar = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.delete(`${CARS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  // Filters

  const getCarByState = async (state, page = 0, pageSize = 10) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(
        `${CARS_URL}/state/${state}?pageNumber=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
  };

  const getCarByBrand = async (brand, page = 0, pageSize = 10) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(
        `${CARS_URL}/brand/${brand}?pageNumber=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
  };

  const getCarByLicensePlate = async (
    licensePlate,
    page = 0,
    pageSize = 10
  ) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(
        `${CARS_URL}/licensePlate/${licensePlate}?pageNumber=${page}&pageSize=${pageSize}`,
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
    getCars,
    getById,
    createCar,
    updateCar,
    deactivateCar,
    activateCar,
    deleteCar,
    getCarByState,
    getCarByBrand,
    getCarByLicensePlate,
  };
};

export default useCars;
