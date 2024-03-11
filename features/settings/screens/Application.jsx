import { View, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export const Application = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});
