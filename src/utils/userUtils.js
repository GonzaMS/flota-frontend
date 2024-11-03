const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user || {};
};

const formatUsername = (username) => username?.split("@")[0] || "";
const formatRole = (role) => (role?.includes("_") ? role.split("_")[1] : role);

export { getUserFromLocalStorage, formatUsername, formatRole };
