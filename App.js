import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Colors from "./constants/colors";
import AuthContextProvider, { AuthContext } from "./store/authContext";
import { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import LoadingScreen from "./screens/LoadingScreen";
import { StatusBar } from "expo-status-bar";
import { LogoutButton } from "./components/LogoutButton";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authContext.isAuthenticated ? (
        <Stack.Navigator
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
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
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

  if (isLoading) return <LoadingScreen />;
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
