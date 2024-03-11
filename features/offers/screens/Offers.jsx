import { View, StyleSheet } from "react-native";
import { OffersList } from "../components/OffersList";
import { Screen } from "../../../components/screen";

export const Offers = ({ navigation, route }) => {
  const { user } = route.params;
  return <Screen>{user && <OffersList user={user} />}</Screen>;
};
