import useValidateUser from "@/hooks/useValidateUser";
import {
  clearAuthData,
  getUserFromStorage,
  saveUserToStorage,
  shouldValidateToken,
  updateLastValidation,
} from "@/utils/isValidUserToken";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getUserFromStorage());
  const { validateToken } = useValidateUser();
  const navigate = useNavigate();

  const checkToken = async () => {
    if (shouldValidateToken() && user) {
      const isValid = await validateToken();
      if (!isValid) {
        logout();
        navigate("/");
      } else {
        updateLastValidation();
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, [user, validateToken, navigate]);

  const login = (userData) => {
    setUser(userData);
    saveUserToStorage(userData);
    updateLastValidation();
  };

  const logout = () => {
    setUser(null);
    clearAuthData();
    navigate("/");
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
