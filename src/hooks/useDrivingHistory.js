import { getToken } from "@/utils/getToken";
import { useState } from "react";
import api from "../utils/api";

const useDrivingHistory = () => {
  const DRIVING_HISTORY_URL = "/api/v1/driving-history"; 

  const [drivingHistories, setDrivingHistories] = useState([]);
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
      setDrivingHistories(res.data.items);
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

  const getDrivingHistories = async (page = 0, pageSize = 10) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${DRIVING_HISTORY_URL}?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const getById = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${DRIVING_HISTORY_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const createDrivingHistory = async (drivingHistory) => {
    const token = getToken();
    return handleRequest(() =>
      api.post(DRIVING_HISTORY_URL, drivingHistory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const updateDrivingHistory = async (id, drivingHistory) => {
    const token = getToken();
    return handleRequest(() =>
      api.put(`${DRIVING_HISTORY_URL}/${id}`, drivingHistory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const deleteDrivingHistory = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.delete(`${DRIVING_HISTORY_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  return {
    drivingHistories,
    pagination,
    error,
    isLoading,
    getDrivingHistories,
    getById,
    createDrivingHistory,
    updateDrivingHistory,
    deleteDrivingHistory,
  };
};

export default useDrivingHistory;
