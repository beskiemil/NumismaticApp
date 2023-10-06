import { StyleSheet, Text, View } from "react-native";
import SimpleTextInput from "../components/SimpleTextInput";
import PrimaryButton from "../components/PrimaryButton";

import { useEffect, useState } from "react";
import { Checkbox } from "expo-checkbox";
import Colors from "../constants/colors";

const LoginScreen = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkBox: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, text) => {
    setFormValues({ ...formValues, [name]: text });
  };

  const validate = () => {
    let err = {};
    if (!formValues.username) {
      err.username = "Wpisz nazwę użytkownika";
    } else {
      err.username = "";
    }
    if (!formValues.email) {
      err.email = "Wpisz e-mail";
    } else {
      err.email = "";
    }
    if (!formValues.password) {
      err.password = "Wpisz hasło";
    } else {
      err.password = "";
    }
    if (!formValues.confirmPassword) {
      err.confirmPassword = "Powtórz hasło";
    } else {
      err.confirmPassword = "";
    }
    if (!formValues.password && !formValues.confirmPassword) {
      err.confirmPassword = "Wpisz hasło";
    } else if (formValues.password !== formValues.confirmPassword) {
      err.confirmPassword = "Powtórz hasło";
    } else {
      err.confirmPassword = "";
    }

    setErrors(err);
  };

  useEffect(() => {
    validate();
    console.log(errors);
  }, [formValues]);

  return (
    <View style={styles.container}>
      <View>
        <SimpleTextInput
          label={"Nazwa"}
          error={errors?.username}
          autoComplete={"username"}
          inputMode={"text"}
          name={"username"}
          value={formValues.username}
          onChange={(name, text) => handleInputChange(name, text)}
        />
        {/*//TODO: username availability check*/}
        <SimpleTextInput
          label={"E-mail"}
          error={errors?.email}
          autoComplete={"email"}
          inputMode={"email"}
          name={"email"}
          value={formValues.email}
          onChange={(name, text) => handleInputChange(name, text)}
        />
        <SimpleTextInput
          label={"Hasło"}
          error={errors?.password}
          autoComplete={"new-password"}
          inputMode={"text"}
          secureTextEntry={true}
          name={"password"}
          value={formValues.password}
          onChange={(name, text) => handleInputChange(name, text)}
        />
        <SimpleTextInput
          label={"Powtórz hasło"}
          error={errors?.confirmPassword}
          autoComplete={"new-password"}
          inputMode={"text"}
          secureTextEntry={true}
          name={"confirmPassword"}
          value={formValues.confirmPassword}
          onChange={(name, text) => handleInputChange(name, text)}
        />
      </View>
      <View style={styles.checkBoxContainer}>
        <Checkbox
          value={formValues.checkBox}
          onValueChange={(value) => handleInputChange("checkBox", value)}
          color={Colors.primary500}
        />
        <Text>Akceptuję regulamin serwisu</Text>
      </View>
      <PrimaryButton style={styles.button} onPress={() => {}}>
        Zarejestruj się
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
  checkBoxContainer: {
    flexDirection: "row",
    gap: 5,
  },
});

export default LoginScreen;
