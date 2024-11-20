export const getUserRole = () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return null;
    }

    const userObject = JSON.parse(storedUser);
    return userObject.role;
  } catch (error) {
    console.error("Error al obtener el rol del usuario", error);
    return null;
  }
};
