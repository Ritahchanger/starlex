const useAuth = () => {
  const user = sessionStorage.getItem("isAuthenticated");

  return { isAuthenticated: !!user };
};

export default useAuth;
