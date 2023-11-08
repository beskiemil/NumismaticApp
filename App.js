import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Colors from "./constants/colors";
import AuthContextProvider, { AuthContext } from "./store/authContext";
import { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Loading from "./screens/Loading";
import { StatusBar } from "expo-status-bar";
import { LogoutButton } from "./components/LogoutButton";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Collection from "./screens/Collection";
import Catalog from "./screens/Catalog";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authContext.isAuthenticated ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerRight: ({ tintColor }) => (
              <LogoutButton size={24} color={tintColor} />
            ),
          }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Catalog" component={Catalog} />
          <Tab.Screen name="Collection" component={Collection} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

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
