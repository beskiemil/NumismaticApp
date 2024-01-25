import { StyleSheet, Text, View } from "react-native";

export const Collection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Kolekcja</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
