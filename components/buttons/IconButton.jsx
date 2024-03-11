import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

export const IconButton = ({
  iconFamily,
  name,
  size,
  color,
  onPress,
  text,
}) => {
  return (
    <Pressable onPress={onPress}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={[styles.container, !text && { aspectRatio: 1 }]}>
        {(iconFamily === "MaterialIcons" && (
          <MaterialIcons name={name} size={size} color={color} />
        )) ||
          (iconFamily === "IonIcons" && (
            <Ionicons name={name} size={size} color={color} />
          ))}
        {text && <Text style={[styles.text, { fontSize: size }]}>{text}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary500,
  },
  text: {
    color: "white",
  },
});
