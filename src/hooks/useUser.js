import { useState } from "react";
import api from "../utils/api";

const useUser = () => {
  const USER_URL = "/api/v1/auth/login";

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async (requestFunction) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await requestFunction();
      setUsers(res.data.users);
      return res.data;
    } catch (err) {
      setError(err.response.data);
      return err.response.data;
    } finally {
      setIsLoading(false);
    }
  };

  const getLogin = async (params) => {
    return handleRequest(() => api.post(`${USER_URL}`, params));
  };

  return { getLogin, error, isLoading, users };
};

export default useUser;
