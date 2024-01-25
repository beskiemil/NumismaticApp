import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../../authentication";
import { NavigationContainer } from "@react-navigation/native";
import Colors from "../../../constants/colors";
import Home from "../../../screens/Home";
import Collection from "../../../screens/collection/Collection";
import Login from "../../../screens/Login";
import SignUp from "../../../screens/SignUp";
import { useContext } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import SettingsNavigator from "./SettingsNavigator";
import { CatalogNavigator } from "./CatalogNavigator";
import { CollectionNavigator } from "./CollectionNavigator";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const NotAuthenticatedNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: { backgroundColor: Colors.primary500 },
      headerTintColor: "white",
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: "Logowanie",
      }}
    />
    <Stack.Screen
      name="Signup"
      component={SignUp}
      options={{
        title: "Rejestracja",
      }}
    />
  </Stack.Navigator>
);

const AuthenticatedNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: { backgroundColor: Colors.primary500 },
      headerTintColor: "white",
      headerTitleAlign: "center",
      tabBarActiveTintColor: Colors.primary500,
      tabBarHideOnKeyboard: true,
      tabBarItemStyle: {
        fontSize: 14,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        title: "Strona główna",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="CatalogRoot"
      component={CatalogNavigator}
      options={{
        title: "Katalog",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="search-dollar" size={size} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="CollectionRoot"
      component={CollectionNavigator}
      options={{
        title: "Kolekcja",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="folder-open-outline" size={size} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsNavigator}
      options={{
        title: "Ustawienia",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Navigation = () => {
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authContext.isAuthenticated ? (
        <AuthenticatedNavigator />
      ) : (
        <NotAuthenticatedNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
