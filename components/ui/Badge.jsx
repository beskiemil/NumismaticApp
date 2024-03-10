import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

export const Badge = ({ color, children, onPress, android_ripple }) => {
  return (
    <View style={styles.badgeOuterContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={
          android_ripple ? android_ripple : { color: Colors.primary400 }
        }
        style={({ pressed }) => [
          styles.badgeInnerContainer,
          pressed && styles.badgePressed,
          { backgroundColor: color ? color : Colors.primary300 },
        ]}
      >
        <Text style={styles.badgeText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeInnerContainer: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeOuterContainer: {
    overflow: "hidden",
    borderRadius: 5,
  },
  badgePressed: {
    backgroundColor: Colors.primary400,
  },
  badgeText: {
    color: "white",
  },
});
