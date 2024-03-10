import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";

export const InfoBanner = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export const InfoBannerTitle = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export const InfoBannerContent = ({ children }) => {
  return <Text style={styles.content}>{children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: Colors.primary400,
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    fontSize: 15,
    color: "white",
    lineHeight: 20,
  },
});
