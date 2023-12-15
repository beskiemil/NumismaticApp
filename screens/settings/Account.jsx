import { View, StyleSheet } from "react-native";
import { PasswordChangeForm } from "../../features/password-change";

const Account = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <PasswordChangeForm navigation={navigation} />
    </View>
  );
};
export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
