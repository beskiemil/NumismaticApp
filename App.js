import { AuthContext, AuthContextProvider } from "./features/authentication/";
import { useContext } from "react";
import Loading from "./screens/Loading";
import { StatusBar } from "expo-status-bar";
import { Navigation } from "./features/navigation/";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RootSiblingParent } from "react-native-root-siblings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();
const Root = () => {
  const authContext = useContext(AuthContext);

  //ekran ładowania podczas pobierania danych z pamięci urządzenia
  if (authContext.isLoading) return <Loading />;
  return <Navigation />;
};
export default function App() {
  //główny punkt wejścia aplikacji, tutaj renderujemy wszystkie komponenty
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style={"light"} />
        {/*For toast display*/}
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootSiblingParent>
            <Root />
          </RootSiblingParent>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
