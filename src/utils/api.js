import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  function (config) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      // Ignore token on routes /auth/register y /auth/login
      if (
        config.url !== "/api/v1/auth/register" &&
        config.url !== "/api/v1/auth/login"
      ) {
        config.headers["Authorization"] = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;

/*
 * Ejemplo de utilizacion:
 * import api from "./services/api.js"
 * api.[peticion]("/ruta sin localhost");
 * api.post("/clientes", clientes);
 * api.get("/clientes");
 */
