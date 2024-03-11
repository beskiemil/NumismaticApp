import { StyleSheet, Text, View } from "react-native";
import ControlledInput from "../../../components/forms/ControlledInput";
import Colors from "../../../constants/colors";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ControlledCheckbox } from "../../../components/forms/ControlledCheckbox";

export const AuthForm = ({ isLogin, onSubmit }) => {
  const [agreement, setAgreement] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreement: false,
    },
  });

  return (
    <View style={styles.formContainer}>
      <View>
        {/*//TODO: username availability check*/}
        {!isLogin && (
          <ControlledInput
            name={"username"}
            control={control}
            rules={{
              required: "Nazwa użytkownika jest wymagana",
              minLength: {
                value: 3,
                message: "Nazwa użytkownika musi mieć minimum 3 znaki",
              },
              maxLength: {
                value: 20,
                message: "Nazwa użytkownika może mieć maksymalnie 20 znaków",
              },
            }}
            label={"Nazwa"}
            autoComplete={"username"}
            inputMode={"text"}
          />
        )}

        <ControlledInput
          name={"email"}
          control={control}
          rules={{
            required: "E-mail jest wymagany",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Niepoprawny adres e-mail",
            },
          }}
          label={"E-mail"}
          autoComplete={"email"}
          inputMode={"email"}
        />
        <ControlledInput
          name={"password"}
          control={control}
          rules={{
            required: "Hasło jest wymagane",
            minLength: {
              value: 8,
              message: "Hasło musi mieć minimum 8 znaków",
            },
            maxLength: {
              value: 20,
              message: "Hasło może mieć maksymalnie 20 znaków",
            },
          }}
          label={"Hasło"}
          autoComplete={"new-password"}
          inputMode={"text"}
          secureTextEntry={true}
        />
        {!isLogin && (
          <ControlledInput
            name={"confirmPassword"}
            control={control}
            rules={{
              required: "Powtórzenie hasła jest wymagane",
              minLength: {
                value: 8,
                message: "Hasło musi mieć minimum 8 znaków",
              },
              maxLength: {
                value: 20,
                message: "Hasło może mieć maksymalnie 20 znaków",
              },
            }}
            label={"Powtórz hasło"}
            autoComplete={"new-password"}
            inputMode={"text"}
            secureTextEntry={true}
          />
        )}
      </View>

      {!isLogin && (
        <View style={styles.checkBoxContainer}>
          <ControlledCheckbox
            value={agreement}
            name={"agreement"}
            control={control}
            rules={{
              required: "Musisz zaakceptować regulamin",
            }}
            label={"*Akceptuję regulamin serwisu"}
            color={Colors.primary500}
            size={22}
          />
        </View>
      )}

      <PrimaryButton
        text={isLogin ? "Zaloguj się" : "Zarejestruj się"}
        style={styles.button}
        onPress={handleSubmit((values) => {
          onSubmit(values);
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 15,
    width: "60%",
  },
  checkBoxContainer: {
    flexDirection: "row",
    gap: 5,
  },
});

export default AuthForm;
