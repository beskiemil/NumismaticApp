import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../../constants/colors";
import { Collection } from "../../collection/screens/Collection";
import { AddItem } from "../../collection/screens/AddItem";
import { Items } from "../../collection/screens/Items";

const Stack = createNativeStackNavigator();
export const CollectionNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Collection"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        headerTitleAlign: "center",
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
    </Stack.Navigator>
  );
};
