import { Pressable, Text, View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/colors";
import AuthForm from "./AuthForm";

export const AuthContent = ({ isLogin, onAuthenticate, requestError }) => {
  const navigation = useNavigation();

  const switchAuthScreen = () => {
    if (isLogin) navigation.replace("Signup");
    else navigation.replace("Login");
  };

  const onSubmit = (data) => {
    let { username, email, password, confirmPassword, agreement } = data;
    if (isLogin) {
      onAuthenticate({ identifier: email, password });
    }
    if (!isLogin) {
      if (password === confirmPassword && agreement)
        onAuthenticate({ username, email, password });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.authContentContainer}
      keyboardShouldPersistTaps={"handled"}
      keyboardDismissMode={"on-drag"}
      bounces={false}
    >
      <AuthForm isLogin={isLogin} onSubmit={onSubmit} />
      {requestError && (
        <Text style={styles.requestErrorMessage}>{requestError}</Text>
      )}
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
  requestErrorMessage: {
    color: Colors.danger500,
  },
});

export default AuthContent;
