import { useState } from "react";
import { Pressable, Text, View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/colors";
import AuthForm from "./AuthForm";

export const AuthContent = ({ isLogin, onAuthenticate }) => {
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const switchAuthScreen = () => {
    if (isLogin) navigation.replace("Signup");
    else navigation.replace("Login");
  };
  const onSubmit = (credentials) => {
    let { username, email, password, confirmPassword, consent } = credentials;
    let err = {};
    let valid = true;

    username = username.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    const usernameIsValid = username.length > 1;
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 8;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid) {
      err = { ...err, email: "Email musi zawierać znak '@'" };
      valid = false;
    }
    if (!passwordIsValid) {
      err = { ...err, password: "Hasło musi mieć przynajmniej 8 znaków" };
      valid = false;
    }
    if (!isLogin && !usernameIsValid) {
      err = { ...err, username: "Nazwa użytkownika musi mieć >2 znaki" };
      valid = false;
    }
    if (!isLogin && (!passwordsAreEqual || !passwordIsValid)) {
      err = { ...err, confirmPassword: "Hasła muszą być takie same" };
      valid = false;
    }
    setErrors(err);
    if (valid && isLogin) {
      onAuthenticate({ email, password });
    }
    if (valid && !isLogin) {
      onAuthenticate({ username, email, password });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.authContentContainer}>
      <AuthForm isLogin={isLogin} onSubmit={onSubmit} errors={errors} />
      {/*TODO: Make a flat button component*/}
      <View style={styles.switchAuthScreenContainer}>
        <Text>{isLogin ? "Nie masz konta? " : "Masz już konto? "}</Text>
        <Pressable onPress={switchAuthScreen}>
          <Text style={styles.switchAuthLink}>
            {isLogin ? "Zarejestruj się" : "Zaloguj się"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  authContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  switchAuthScreenContainer: {
    alignItems: "center",
  },
  switchAuthLink: {
    color: Colors.primary500,
  },
});

export default AuthContent;
