import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  user: {},
  // eslint-disable-next-line no-unused-vars
  authenticate: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("jwt");
      const user = await SecureStore.getItemAsync("user");
      if (token) {
        setAuthToken(token);
        setUser(JSON.parse(user));
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const authenticate = async (jwt, userData) => {
    setAuthToken(jwt);
    setUser(userData);
    await SecureStore.setItemAsync("jwt", jwt);
    await SecureStore.setItemAsync("user", JSON.stringify(userData));
  };

  const logout = async () => {
    setAuthToken(null);
    setUser(null);
    await SecureStore.deleteItemAsync("jwt");
    await SecureStore.deleteItemAsync("user");
  };

  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        user,
        isAuthenticated: !!authToken,
        authenticate,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
