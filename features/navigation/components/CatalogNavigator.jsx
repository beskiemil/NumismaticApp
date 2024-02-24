import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../../constants/colors";
import { Catalog, Types } from "../../catalog";
import Type from "../../catalog/screens/Type";

const Stack = createNativeStackNavigator();
export const CatalogNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Catalog"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Catalog"
        component={Catalog}
        options={{
          title: "Katalog",
        }}
      />
      <Stack.Screen
        name={"Types"}
        component={Types}
        options={{
          title: "Wyniki wyszukiwania",
        }}
      />
      <Stack.Screen
        name={"Type"}
        component={Type}
        options={{
          title: "Szczegóły",
        }}
      />
    </Stack.Navigator>
  );
};
