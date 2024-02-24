import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../../constants/colors";
import { Offers } from "../../offers";

const Stack = createNativeStackNavigator();
export const OffersNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Offers"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Offers"
        component={Offers}
        options={{
          title: "Oferty",
        }}
      />
    </Stack.Navigator>
  );
};
