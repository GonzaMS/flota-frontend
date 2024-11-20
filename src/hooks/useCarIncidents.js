import { getToken } from "@/utils/getToken";
import { useState } from "react";
import api from "../utils/api";

const useCarIncidents = () => {
  const CAR_INCIDENTS_URL = "/api/v1/incidents";

  const [carIncidents, setCarIncidents] = useState([]);
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
      setCarIncidents(res.data.items || []);
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

  const getIncidents = async (page = 0, pageSize = 10) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${CAR_INCIDENTS_URL}?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const getIncidentById = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${CAR_INCIDENTS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const createIncident = async (incident) => {
    const token = getToken();
    return handleRequest(() =>
      api.post(CAR_INCIDENTS_URL, incident, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const updateIncident = async (id, incident) => {
    const token = getToken();
    return handleRequest(() =>
      api.put(`${CAR_INCIDENTS_URL}/${id}`, incident, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const deleteIncident = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.delete(`${CAR_INCIDENTS_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const getIncidentsByCarId = async (carId, page = 0, pageSize = 10) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(
        `${CAR_INCIDENTS_URL}/car/${carId}?pageNumber=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
  };

  const getIncidentsByDateRange = async (
    dateRange,
    page = 0,
    pageSize = 10
  ) => {
    const token = getToken();
    return handleRequest(() =>
      api.post(
        `${CAR_INCIDENTS_URL}/date?pageNumber=${page}&pageSize=${pageSize}`,
        dateRange,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
  };

  return {
    carIncidents,
    pagination,
    error,
    isLoading,
    getIncidents,
    getIncidentById,
    createIncident,
    updateIncident,
    deleteIncident,
    getIncidentsByCarId,
    getIncidentsByDateRange,
  };
};

export default useCarIncidents;
