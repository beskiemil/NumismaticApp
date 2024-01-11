import { AuthContext, AuthContextProvider } from "./features/authentication/";
import { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Loading from "./screens/Loading";
import { StatusBar } from "expo-status-bar";
import { Navigation } from "./features/navigation/";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootSiblingParent } from "react-native-root-siblings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootSiblingParent>
          <AuthContextProvider>
            <Root />
          </AuthContextProvider>
        </RootSiblingParent>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
