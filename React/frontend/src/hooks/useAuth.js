import { useState, useEffect } from "react";
import { fetchMe } from "../api/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await fetchMe();

        if (data.username !== "") {
          setUser(data);  // ⭐ store the user
          setIsAuthenticated(true);
          setIsAdmin(data.is_staff || data.is_superuser);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, isAdmin, isAuthenticated, loading };  // ⭐ return user
};

export default useAuth;
