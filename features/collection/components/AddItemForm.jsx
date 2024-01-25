import { StyleSheet, View } from "react-native";
import { ImagePicker } from "../../../components/ImagePicker";
import { ControlledSelect } from "../../../components/ui/ControlledSelect";
import Colors from "../../../constants/colors";
import { ControlledCheckbox } from "../../../components/ui/ControlledCheckbox";
import PrimaryButton from "../../../components/PrimaryButton";
import { banknoteGrades, coinGrades } from "../../../constants/grades";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../authentication";
import { useContext } from "react";

export const AddItemForm = ({ type }) => {
  const grades = type.data.category === "coin" ? coinGrades : banknoteGrades;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      grade: null,
      obverse: null,
      reverse: null,
      toChange: false,
      toSell: false,
    },
  });

  const { axiosInstance } = useAxios();
  const { mutateAsync: addItem } = useMutation({
    mutationFn: async (formData) =>
      await axiosInstance.post("/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
  });

  const { user } = useContext(AuthContext);
  const onSubmit = async ({ obverse, reverse, ...values }) => {
    values.user = user.id;
    if (type?.data?.isNumistaType) values.numista_id = type.data.id;
    else values.type = type.data.id;
    const formData = new FormData();
    formData.append("files.obverse", {
      uri: obverse.uri,
      type: "image/jpeg",
      name: `${user.id}_${Date.now().toString()}_${obverse.uri
        .split("/")
        .pop()}`,
    });
    formData.append("files.reverse", {
      uri: reverse.uri,
      type: "image/jpeg",
      name: `${user.id}_${Date.now().toString()}_${reverse.uri
        .split("/")
        .pop()}`,
    });
    formData.append("data", JSON.stringify(values));
    try {
      await addItem(formData);
      console.log("done");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.imagesContainer}>
        <View style={styles.pickerContainer}>
          <ImagePicker
            placeholder={"AWERS"}
            control={control}
            name={"obverse"}
            rules={{ required: "Dodaj zdjęcie awersu" }}
          />
        </View>
        <View style={styles.pickerContainer}>
          <ImagePicker
            placeholder={"REWERS"}
            control={control}
            name={"reverse"}
            rules={{ required: "Dodaj zdjęcie rewersu" }}
          />
        </View>
      </View>
      <ControlledSelect
        name={"grade"}
        control={control}
        options={grades}
        placeholder={"Wybierz stan"}
        rules={{ required: "Wybierz stan zachowania monety" }}
        color={Colors.primary500}
        arrowColor={Colors.primary500}
      />
      <ControlledCheckbox
        control={control}
        name={"toChange"}
        label={"Chcę się zamienić"}
        color={Colors.primary500}
        size={24}
      />
      <ControlledCheckbox
        control={control}
        name={"toSell"}
        label={"Chcę sprzedać"}
        color={Colors.primary500}
        size={24}
      />
      <PrimaryButton
        onPress={handleSubmit((values) => onSubmit(values))}
        text={"Dodaj"}
        color={Colors.primary500}
        style={styles.submitButton}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imagesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  pickerContainer: {
    flex: 1,
  },
  submitButton: {
    marginTop: "auto",
  },
});
