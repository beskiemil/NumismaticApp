import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export const Heading = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary400,
  },
});
