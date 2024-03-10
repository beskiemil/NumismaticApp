import { View, StyleSheet, Text } from "react-native";
import { UsersList } from "../components/UsersList";

export const Users = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <UsersList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
});
