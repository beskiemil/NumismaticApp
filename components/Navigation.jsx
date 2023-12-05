import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../features/authentication/";
import { NavigationContainer } from "@react-navigation/native";
import Colors from "../constants/colors";
import Home from "../screens/Home";
import Catalog from "../screens/Catalog";
import Collection from "../screens/Collection";
import SettingsList from "../screens/settings/SettingsList";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import { useContext } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Account from "../screens/settings/Account";
import Application from "../screens/settings/Application";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsList"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="SettingsList"
        component={SettingsList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Account"}
        component={Account}
        options={{
          title: "Konto",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Application"}
        component={Application}
        options={{
          title: "Aplikacja",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

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
            name="Catalog"
            component={Catalog}
            options={{
              title: "Katalog",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="search-dollar" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Collection"
            component={Collection}
            options={{
              title: "Kolekcja",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="folder-open-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsStack}
            options={{
              title: "Ustawienia",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              ),
            }}
          />
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
      )}
    </NavigationContainer>
  );
};

export default Navigation;
