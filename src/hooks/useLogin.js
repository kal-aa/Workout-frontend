import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const API_URL = process.env.REACT_APP_API_URL || "";

    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        return;
      }

      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
    } catch (error) {
      console.error(error);
      const message = error.message;
      setError(
        message !== "Failed to fetch"
          ? message
          : "Unable to log in. Please try again."
      );
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
