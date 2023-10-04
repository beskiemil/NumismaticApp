import { Pressable, StyleSheet, Text, View } from "react-native";
import SimpleTextInput from "../components/SimpleTextInput";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SimpleTextInput placeholder="e-mail" label={"E-mail"} />
      <SimpleTextInput placeholder="password" label={"Hasło"} />
      <Text>Nie masz konta?</Text>
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>Zarejestruj się</Text>
      </Pressable>

      {/* eslint-disable-next-line react-native/no-raw-text */}
      <PrimaryButton style={styles.button}>Zaloguj</PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 10,
  },
  registerText: {
    color: Colors.primary500,
  },
});

export default LoginScreen;
