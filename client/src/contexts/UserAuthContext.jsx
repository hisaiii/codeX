import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../utils/axiosApi";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/user/profile", { withCredentials: true });
      console.log("this is user response ",response);
      setUser(response.data.data);  // assuming user data is inside response.data.data
    } catch (error) {
      console.error("Error fetching user:", error.message || error);
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);  // Only once when app loads

  const login = async ({ email, password }) => {
    try {
      await api.post("/user/login", { email, password }, { withCredentials: true });
      await fetchUser();
    } catch (error) {
      console.error("Login failed:", error.message || error);
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await api.post("/user/logout", {}, { withCredentials: true });
        setUser(null);
      }
    } catch (error) {
      console.error("Logout failed:", error.message || error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, initialized, setLoading, setUser, login, logout, fetchUser }}>
      {!loading || initialized ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};