import { useState } from "react";
import api from "../utils/api";
import { getToken } from "@/utils/getToken";

const useRole = () => {
  const ROLE_URL = "/api/v1/roles/";

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async (requestFunction) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await requestFunction();
      return res.data;
    } catch (err) {
      setError(err.response?.data || "Unknown Error");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addRole = async (roleRequestDTO) => {
    const token = getToken();
    return handleRequest(() =>
      api.post(`${ROLE_URL}add`, roleRequestDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const removeRole = async ({ userId, roleName }) => {
    const token = getToken();
    return handleRequest(() =>
      api.post(`${ROLE_URL}remove`, { userId, roleName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  const changeRole = async (changeRoleRequestDTO) => {
    const token = getToken();
    return handleRequest(() =>
      api.post(`${ROLE_URL}change`, changeRoleRequestDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  return {
    error,
    isLoading,
    addRole,
    removeRole,
    changeRole,
  };
};

export default useRole;
