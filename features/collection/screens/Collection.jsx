import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../../components/PrimaryButton";
import { AuthContext } from "../../authentication";
import { useContext } from "react";

export const Collection = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <PrimaryButton
        text={"Moja kolekcja"}
        onPress={() => navigation.navigate("Items", { user })}
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
