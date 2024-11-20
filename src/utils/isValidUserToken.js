const LAST_VALIDATION_KEY = "lastValidation";
const USER_KEY = "user";
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

// Obtiene al usuario actual almacenado en localStorage
export const getUserFromStorage = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

// Guarda el usuario en localStorage
export const saveUserToStorage = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Elimina al usuario y la ultima validacion
export const clearAuthData = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(LAST_VALIDATION_KEY);
};

// Obtiene la ultima validacion
export const getLastValidation = () => {
  const storedDate = localStorage.getItem(LAST_VALIDATION_KEY);
  return storedDate ? new Date(storedDate) : null;
};

// Actualiza la ultima validacion
export const updateLastValidation = () => {
  const now = new Date().toISOString();
  localStorage.setItem(LAST_VALIDATION_KEY, now);
};

// Verifica si paso 1 dia de la validacion
export const shouldValidateToken = () => {
  const lastValidation = getLastValidation();
  if (!lastValidation) return true;
  const now = new Date();
  return now - lastValidation > ONE_DAY_IN_MS;
};
