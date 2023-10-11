import { StyleSheet, Text, View } from "react-native";
import SimpleTextInput from "../SimpleTextInput";
import { Checkbox } from "expo-checkbox";
import Colors from "../../constants/colors";
import PrimaryButton from "../PrimaryButton";
import { useState } from "react";

export const AuthForm = ({ isLogin, onSubmit, errors }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreement: false,
  });

  const handleInputChange = (name, text) => {
    setFormValues({ ...formValues, [name]: text });
  };

  const submitHandler = () => {
    onSubmit(formValues);
  };

  return (
    <View style={styles.formContainer}>
      <View>
        {/*//TODO: username availability check*/}
        {!isLogin && (
          <SimpleTextInput
            label={"Nazwa"}
            error={errors?.username}
            autoComplete={"username"}
            inputMode={"text"}
            name={"username"}
            value={formValues.username}
            onChange={(name, text) => handleInputChange(name, text)}
          />
        )}

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
        {!isLogin && (
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
        )}
      </View>

      {!isLogin && (
        <View style={styles.checkBoxContainer}>
          <Checkbox
            value={formValues.agreement}
            name={"agreement"}
            onValueChange={(value) => handleInputChange("agreement", value)}
            color={Colors.primary500}
          />
          <Text>*Akceptuję regulamin serwisu</Text>
        </View>
      )}

      <PrimaryButton
        text={isLogin ? "Zaloguj się" : "Zarejestruj się"}
        style={styles.button}
        onPress={submitHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 15,
  },
  checkBoxContainer: {
    flexDirection: "row",
    gap: 5,
  },
});

export default AuthForm;
