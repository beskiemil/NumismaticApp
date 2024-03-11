import Colors from "../../../constants/colors";
import { Account, Application, Settings } from "../../settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsRoot"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
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
