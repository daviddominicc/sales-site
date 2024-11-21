import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getAuthenticatedUser } from "../api/api";
import { toast } from "sonner";

export const AuthStore = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const [user, setuser] = useState({
    isLoading: false,
    isError: null,
    data: null,
    isAuthenticated: false,
  });

  const checkAuth = async () => {
    setuser({ isError: null, isLoading: true });
    try {
      const res = await getAuthenticatedUser(accessToken);
      setuser({
        data: res.data,
        isAuthenticated: true,
        isLoading:false
      });
    } catch (error) {
      setuser({
        isLoading: false,
        isAuthenticated: false,
        isError:error
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setuser({
      isLoading: false,
      isError: null,
      data: null,
      isAuthenticated: false,
    });
    toast.success("Logged Out")
  };

  const contextData = { accessToken, setAccessToken, checkAuth, user, logout };

  return (
    <AuthStore.Provider value={contextData}>{children}</AuthStore.Provider>
  );
};
