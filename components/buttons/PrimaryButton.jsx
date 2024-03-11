import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../constants/colors";

const PrimaryButton = ({ text, style, onPress, color, android_ripple }) => {
  return (
    <View style={[styles.outerContainer, style]}>
      <Pressable
        style={({ pressed }) => [
          styles.innerContainer,
          pressed ? styles.pressed : null,
          { backgroundColor: color ? color : Colors.primary500 },
        ]}
        onPress={onPress}
        android_ripple={
          android_ripple ? android_ripple : { color: Colors.primary700 }
        }
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
  innerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    backgroundColor: Colors.primary500,
  },
  text: {
    color: "white",
    textAlign: "center",
    letterSpacing: 1,
    fontWeight: "500",
    fontSize: 20,
  },
  pressed: {},
});
export default PrimaryButton;
