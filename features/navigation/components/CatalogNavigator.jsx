import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../../constants/colors";
import SettingsList from "../../../screens/settings/SettingsList";
import Catalog from "../../../screens/catalog/Catalog";
import Types from "../../../screens/catalog/Types";
import Type from "../../../screens/catalog/Type";

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
          title: "Type",
        }}
      />
    </Stack.Navigator>
  );
};
