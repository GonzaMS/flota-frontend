import { useState } from "react";
import { getToken } from "@/utils/getToken";
import api from "../utils/api";

const useAssignedOrders = () => {
  const ASSIGNED_ORDER_URL = "/api/v1/assigned-orders";

  const [assignedOrders, setAssignedOrders] = useState([]);
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
      setAssignedOrders(res.data.items);
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

  const getAssignedOrders = async (page = 0, pageSize = 10) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${ASSIGNED_ORDER_URL}?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const getById = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.get(`${ASSIGNED_ORDER_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const saveAssignedOrder = async (assignedOrder) => {
    const token = getToken();
    return handleRequest(() =>
      api.post(ASSIGNED_ORDER_URL, assignedOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const updateAssignedOrder = async (id, assignedOrder) => {
    const token = getToken();
    return handleRequest(() =>
      api.put(`${ASSIGNED_ORDER_URL}/${id}`, assignedOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const deleteAssignedOrder = async (id) => {
    const token = getToken();
    return handleRequest(() =>
      api.delete(`${ASSIGNED_ORDER_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  return {
    assignedOrders,
    pagination,
    error,
    isLoading,
    getAssignedOrders,
    getById,
    saveAssignedOrder,
    updateAssignedOrder,
    deleteAssignedOrder,
  };
};

export default useAssignedOrders;
