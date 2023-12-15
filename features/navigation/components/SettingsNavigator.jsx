import Colors from "../../../constants/colors";
import SettingsList from "../../../screens/settings/SettingsList";
import Account from "../../../screens/settings/Account";
import Application from "../../../screens/settings/Application";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const SettingsNavigator = () => {
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

export default SettingsNavigator;
