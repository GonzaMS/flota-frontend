export const getToken = () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return null;
    }

    const userObject = JSON.parse(storedUser);
    return userObject.token;
  } catch (error) {
    console.error("Error al obtener el token del usuario", error);
    return null;
  }
};
