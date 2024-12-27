import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getCurrentUser } from "../lib/appwrite/api";
import { useNavigate, useLocation } from "react-router-dom";
import { publicRoutes } from "../constants";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(true); // Initially loading
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // **Check Current User Authentication**
  const checkAuthUser = useCallback(async () => {
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });

        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      if (error?.message === "User (role: guests) missing scope (account)" || "401 (Unauthorized)") {
        // Expected behavior when there is no logged-in user
        console.log("No user session found. Proceeding as unauthenticated.");
      } else {
        console.error("Error checking user authentication", error);
      }
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // **Effect to Handle Auth Check**
  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(location.pathname);

    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      !isPublicRoute &&
      (cookieFallback === "[]" ||
        cookieFallback === null ||
        cookieFallback === undefined)
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, [location.pathname, navigate, publicRoutes]);

  // **Provider Value**
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
