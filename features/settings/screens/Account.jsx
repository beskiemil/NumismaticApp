import { View, StyleSheet } from "react-native";
import { PasswordChangeForm } from "../components/PasswordChangeForm";
import { Screen } from "../../../components/screen";

export const Account = ({ navigation }) => {
  return (
    <Screen>
      <PasswordChangeForm navigation={navigation} />
    </Screen>
  );
};
