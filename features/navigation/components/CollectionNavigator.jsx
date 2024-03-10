import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../../constants/colors";
import { Collection, AddItem, Items } from "../../collection/";
import { Users } from "../../users";

const Stack = createNativeStackNavigator();
export const CollectionNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Collection"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name="Collection"
        component={Collection}
        options={{
          title: "Kolekcja",
        }}
      />
      <Stack.Screen
        name="Items"
        component={Items}
        options={{
          title: "Kolekcja",
        }}
      />
      <Stack.Screen
        name={"AddItem"}
        component={AddItem}
        options={{
          title: "Dodawanie do kolekcji",
        }}
      />
      <Stack.Screen
        name={"Users"}
        component={Users}
        options={{
          title: "Wyszukaj użytkownika",
        }}
      />
    </Stack.Navigator>
  );
};
