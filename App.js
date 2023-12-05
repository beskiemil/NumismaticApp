import AuthContextProvider, {
  AuthContext,
} from "./features/authentication/context/authContext";
import { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Loading from "./screens/Loading";
import { StatusBar } from "expo-status-bar";
import Navigation from "./components/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootSiblingParent } from "react-native-root-siblings";

const queryClient = new QueryClient();
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
    <QueryClientProvider client={queryClient}>
      <StatusBar style={"light"} />
      {/*For toast display*/}
      <RootSiblingParent>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </RootSiblingParent>
    </QueryClientProvider>
  );
}
