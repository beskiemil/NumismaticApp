import { StyleSheet, Text, View } from "react-native";

export const Label = ({ children }) => {
  return (
    <View style={styles.label}>
      <Text style={styles.labelText}>{children}</Text>
    </View>
  );
};
export const Value = ({ children }) => {
  return (
    <View style={styles.value}>
      <Text style={styles.valueText}>{children}</Text>
    </View>
  );
};

export const Row = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 1,
    alignItems: "flex-start",
  },
  label: {
    flex: 2,
  },
  value: {
    flex: 3,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "500",
  },
  valueText: {
    fontSize: 14,
  },
});
