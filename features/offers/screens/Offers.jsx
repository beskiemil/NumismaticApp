import { View, StyleSheet } from "react-native";
import { OffersList } from "../components/OffersList";

export const Offers = ({ navigation, route }) => {
  const { user } = route.params;
  return (
    <View style={styles.container}>{user && <OffersList user={user} />}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
