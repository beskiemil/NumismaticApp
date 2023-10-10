import { createContext, useState } from "react";

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

  const authenticate = ({ jwt, user }) => {
    setAuthToken(jwt);
    setUser(user);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
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
