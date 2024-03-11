import { StyleSheet, View } from "react-native";

export const BottomButtons = ({ children }) => {
  return <View style={styles.bottomButtons}>{children}</View>;
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
