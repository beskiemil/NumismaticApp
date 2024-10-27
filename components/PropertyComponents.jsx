import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export const PropertyLabel = ({ children }) => {
  return (
    <View style={styles.label}>
      <Text style={styles.labelText}>{children}</Text>
    </View>
  );
};
export const PropertyValue = ({ children }) => {
  return (
    <View style={styles.value}>
      <Text style={styles.valueText}>{children}</Text>
    </View>
  );
};

export const PropertyRow = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};

export const TitleRow = ({ children }) => {
  return <View style={[styles.row, styles.titleRow]}>{children}</View>;
};

export const UserRow = ({ children }) => {
  return <View style={[styles.row, styles.userRow]}>{children}</View>;
};

export const PropertyTitle = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 1,
    alignItems: "center",
  },
  titleRow: {
    marginBottom: 5,
  },
  userRow: {
    marginVertical: 5,
  },
  label: {
    flex: 2,
  },
  value: {
    flex: 3,
    justifyContent: "center",
  },
  labelText: {
    fontSize: 14,
    fontWeight: "500",
  },
  valueText: {
    fontSize: 14,
  },
  title: {
    fontSize: 21,
    fontWeight: "400",
    color: Colors.primary500,
  },
});
