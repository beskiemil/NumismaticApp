import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../../constants/colors";
import { Collection } from "../../../screens/collection/Collection";
import { AddToCollection } from "../../../screens/collection/AddToCollection";

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
          title: "Moja kolekcja",
        }}
      />
      <Stack.Screen
        name={"AddToCollection"}
        component={AddToCollection}
        options={{
          title: "Dodawanie do kolekcji",
        }}
      />
    </Stack.Navigator>
  );
};
