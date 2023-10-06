import { Pressable, StyleSheet, Text, View } from "react-native";
import SimpleTextInput from "../components/SimpleTextInput";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <SimpleTextInput placeholder="e-mail" label={"E-mail"} />
        <SimpleTextInput placeholder="password" label={"Hasło"} />
      </View>
      <View>
        <Text>Nie masz konta?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Zarejestruj się</Text>
        </Pressable>
      </View>

      {/* eslint-disable-next-line react-native/no-raw-text */}
      <PrimaryButton style={styles.button} inActive={true}>
        Zaloguj
      </PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  button: {
    margin: 10,
  },
  registerText: {
    color: Colors.primary500,
  },
});

export default LoginScreen;
