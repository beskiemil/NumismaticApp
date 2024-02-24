import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../../components/PrimaryButton";
import { AuthContext } from "../../authentication";
import { useContext } from "react";

export const Offers = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <PrimaryButton
        text={"Moje oferty"}
        onPress={() => navigation.navigate("Offers", { user })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
