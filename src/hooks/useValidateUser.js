import { getToken } from "@/utils/getToken";
import { useState } from "react";
import api from "../utils/api";

const useValidateUser = () => {
  const VALIDATE_URL = "/api/v1/auth/validate";

  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateToken = async () => {
    const token = getToken();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post(
        VALIDATE_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsValid(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || "Failed to validate token");
      setIsValid(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isValid,
    isLoading,
    error,
    validateToken,
  };
};

export default useValidateUser;
