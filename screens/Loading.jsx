import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export const Loading = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Czekaj...</Text>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size={"large"} color={Colors.primary400} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontSize: 35,
    color: Colors.primary400,
  },
  message: {
    fontSize: 25,
    color: Colors.primary400,
  },
});

export default Loading;
