import AuthContextProvider, { AuthContext } from "./store/authContext";
import { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Loading from "./screens/Loading";
import { StatusBar } from "expo-status-bar";
import Navigation from "./components/Navigation";

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = await SecureStore.getItemAsync("jwt");
      const storedUser = await SecureStore.getItemAsync("user");
      if (storedToken) {
        authContext.authenticate(storedToken, JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, []);

  if (isLoading) return <Loading />;
  return <Navigation />;
};
export default function App() {
  return (
    <>
      <StatusBar style={"light"} />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
