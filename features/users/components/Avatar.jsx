import { Image, StyleSheet, View } from "react-native";

export const Avatar = ({ src, username, size }) => {
  return (
    <View style={[styles.shadow, size === "sm" && styles.shadowSm]}>
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
  shadowSm: {
    width: 30,
    height: 30,
  },
  // eslint-disable-next-line react-native/no-color-literals
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
