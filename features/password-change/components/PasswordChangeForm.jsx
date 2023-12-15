import { StyleSheet, Text, View } from "react-native";
import Heading from "../../../components/ui/Heading";
import { useForm } from "react-hook-form";
import ControlledInput from "../../../components/ui/ControlledInput";
import PrimaryButton from "../../../components/PrimaryButton";
import useChangePassword from "../hooks/useChangePassword";
import Loading from "../../../screens/Loading";
import { useState } from "react";
import Colors from "../../../constants/colors";
import Toast from "react-native-root-toast";

const PasswordChangeForm = ({ navigation }) => {
  const { mutateAsync, isPending } = useChangePassword();
  const [responseError, setResponseError] = useState(null);
  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
      let toast = Toast.show("Hasło zostało zmienione", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + 30,
        backgroundColor: Colors.success500,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      navigation.popToTop();
    } catch (error) {
      if (error.response) {
        let err = error.response.data.error.message;
        console.log(err);
        setResponseError(err);
      }
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  if (isPending) return <Loading message={"Zmieniamy hasło..."} />;

  return (
    <View style={styles.container}>
      <Heading text="Zmiana hasła" />
      <View style={styles.formContainer}>
        <ControlledInput
          control={control}
          name="currentPassword"
          label="Obecne hasło"
          rules={{
            required: "Obecne hasło jest wymagane",
            minLength: {
              value: 8,
              message: "Hasło musi mieć minimum 8 znaków",
            },
            maxLength: {
              value: 20,
              message: "Hasło może mieć maksymalnie 20 znaków",
            },
          }}
          secureTextEntry={true}
          autoComplete="password"
        />
        <ControlledInput
          control={control}
          name="password"
          label="Nowe hasło"
          rules={{
            required: "Nowe hasło jest wymagane",
            minLength: {
              value: 8,
              message: "Hasło musi mieć minimum 8 znaków",
            },
            maxLength: {
              value: 20,
              message: "Hasło może mieć maksymalnie 20 znaków",
            },
          }}
          secureTextEntry={true}
          autoComplete="password"
        />
        <ControlledInput
          control={control}
          name="passwordConfirmation"
          label="Powtórz nowe hasło"
          rules={{
            required: "Potwierdzenie nowego hasła jest wymagane",
            minLength: {
              value: 8,
              message: "Hasło musi mieć minimum 8 znaków",
            },
            maxLength: {
              value: 20,
              message: "Hasło może mieć maksymalnie 20 znaków",
            },
          }}
          secureTextEntry={true}
          autoComplete="password"
        />
        <PrimaryButton text={"Zmień hasło"} onPress={handleSubmit(onSubmit)} />
        {/*TODO:ADD ERROR TRANSLATION*/}
        {responseError && <Text style={styles.error}>{responseError}</Text>}
      </View>
    </View>
  );
};
export default PasswordChangeForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    gap: 15,
    width: "60%",
  },
  error: {
    color: Colors.danger500,
  },
});
