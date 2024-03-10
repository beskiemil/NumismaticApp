import { StyleSheet, View } from "react-native";
import { ImagePicker } from "../../../components/ImagePicker";
import { ControlledSelect } from "../../../components/ui/ControlledSelect";
import Colors from "../../../constants/colors";
import PrimaryButton from "../../../components/PrimaryButton";
import { banknoteGrades, coinGrades } from "../../../constants/grades";
import { useForm } from "react-hook-form";
import { Category } from "../../../constants/categories";

export const AddItemForm = ({ type, onSubmit }) => {
  const grades =
    type.category === Category.COIN || type.category === Category.EXONUMIA
      ? coinGrades
      : banknoteGrades;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      grade: null,
      obverse: null,
      reverse: null,
    },
  });

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
