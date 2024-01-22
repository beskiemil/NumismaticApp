import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

export const LoadingComponent = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size={"large"} color={Colors.primary400} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  message: {
    fontSize: 20,
    color: "black",
  },
});

export default LoadingComponent;
