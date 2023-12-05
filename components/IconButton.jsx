import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const IconButton = ({ iconFamily, name, size, color, onPress }) => {
  return (
    <>
      <Pressable onPress={onPress}>
        {iconFamily === "MaterialIcons" ? (
          <MaterialIcons name={name} size={size} color={color} />
        ) : iconFamily === "IonIcons" ? (
          <Ionicons name={name} size={size} color={color} />
        ) : null}
      </Pressable>
    </>
  );
};

export default IconButton;
