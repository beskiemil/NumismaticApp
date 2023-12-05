import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import Heading from "../../components/ui/Heading";

const Account = () => {
  return (
    <View style={styles.container}>
      <Heading text="Zmiana hasła" />
    </View>
  );
};
export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
});
