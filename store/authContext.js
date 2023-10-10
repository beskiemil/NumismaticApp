import { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  user: {},
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [user, setUser] = useState();

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
