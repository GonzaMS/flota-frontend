import { useState } from "react";
import api from "../utils/api";

const useUser = () => {
  const USER_URL = "/api/v1/auth/";

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
    return handleRequest(() => api.post(`${USER_URL}/login`, params));
  };

  const registerUser = async (params) => {
    return handleRequest(() => api.post(`${USER_URL}/register`, params));
  };

  const activateAccount = async (token) => {
    return handleRequest(() => api.get(`${USER_URL}/activate?token=${token}`));
  };

  return { error, isLoading, users, registerUser, getLogin, activateAccount };
};

export default useUser;
