import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const Heading = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.background,
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary400,
  },
});
