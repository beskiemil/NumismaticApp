import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../../constants/colors";
import { OffersRoot, AddOffer, Offers } from "../../offers";

const Stack = createNativeStackNavigator();
export const OffersNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OffersRoot"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="OffersCatalog"
        component={OffersRoot}
        options={{
          title: "Oferty",
        }}
      />
      <Stack.Screen
        name="Offers"
        component={Offers}
        options={{
          title: "Oferty",
        }}
      />
      <Stack.Screen
        name="AddOffer"
        component={AddOffer}
        options={{
          title: "Dodaj ofertę",
        }}
      />
    </Stack.Navigator>
  );
};
