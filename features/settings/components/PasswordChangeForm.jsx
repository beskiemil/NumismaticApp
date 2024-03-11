import { StyleSheet, View } from "react-native";
import { Heading } from "../../../components/Heading";
import { useForm } from "react-hook-form";
import ControlledInput from "../../../components/forms/ControlledInput";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import Loading from "../../../screens/Loading";
import Colors from "../../../constants/colors";
import { showToast } from "../../../helpers/showToast";
import useAxios from "../../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

export const PasswordChangeForm = ({ navigation }) => {
  const { axiosInstance } = useAxios();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data) =>
      await axiosInstance
        .post("/auth/change-password", data)
        .then((res) => res.data),
  });
  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
      showToast({ message: "Zmieniono hasło", type: "success" });
      navigation.popToTop();
    } catch (error) {
      if (error.response) {
        let err = error.response.data.error.message;
        showToast({ message: err, type: "error" });
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
    <>
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

        {/*TODO:ADD ERROR TRANSLATION*/}
      </View>
      <PrimaryButton text={"Zmień hasło"} onPress={handleSubmit(onSubmit)} />
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: Colors.danger500,
  },
  formContainer: {
    alignSelf: "center",
  },
});
