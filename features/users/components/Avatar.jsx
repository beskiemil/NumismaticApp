import { Image, StyleSheet, View } from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

export const Avatar = ({ src, username }) => {
  return (
    <View style={styles.shadow}>
      <Image
        source={{ uri: src || `https://ui-avatars.com/api/?name=${username}` }}
        style={styles.avatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 1000,
  },
  shadow: {
    width: 70,
    height: 70,
    borderRadius: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
