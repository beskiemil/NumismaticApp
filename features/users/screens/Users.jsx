import { StyleSheet } from "react-native";
import { UsersList } from "../components/UsersList";
import { Screen } from "../../../components/screen";

export const Users = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <UsersList />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
