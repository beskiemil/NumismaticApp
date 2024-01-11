import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import ControlledInput from "../../../components/ui/ControlledInput";
import PrimaryButton from "../../../components/PrimaryButton";
import IconButton from "../../../components/IconButton";

export const TypeSearchForm = ({ onSubmit, handleShowModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchQuery: "",
    },
  });

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <ControlledInput
          control={control}
          name={"searchQuery"}
          placeholder={"Wyszukaj..."}
        />
        <IconButton
          iconFamily={"IonIcons"}
          name={"filter"}
          size={24}
          color={"white"}
          onPress={handleShowModal}
        />
      </View>
      <PrimaryButton text={"Wyszukaj"} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
});
