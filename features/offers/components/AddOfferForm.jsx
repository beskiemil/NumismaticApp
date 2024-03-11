import { useForm } from "react-hook-form";
import { traderTypes, traderTypesOptions } from "../constants/traderTypes";
import { View, StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import { ControlledSelect } from "../../../components/forms/ControlledSelect";
import ControlledInput from "../../../components/forms/ControlledInput";
import { ControlledCheckbox } from "../../../components/forms/ControlledCheckbox";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

export const AddOfferForm = ({ item, user, onSubmit }) => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      item: item || null,
      trader_type: user ? traderTypes.USER : null,
      trader: "",
      trader_description: "",
      trader_location: "",
      price: "",
      finished: false,
      description: "",
    },
  });

  return (
    <>
      {!item.user && (
        <>
          <ControlledSelect
            name={"trader_type"}
            control={control}
            options={traderTypesOptions}
            placeholder={"Rodzaj sprzedawcy"}
            rules={{ required: "Musisz wybrać rodzaj sprzedawcy" }}
            color={Colors.primary500}
            arrowColor={Colors.primary500}
          />
          <ControlledInput
            control={control}
            name={"trader"}
            placeholder={"Sklep numizmatyczny XYZ"}
            label={"Nazwa sprzedającego"}
            rules={{ required: "Nazwa jest wymagana" }}
          />
          <ControlledInput
            control={control}
            name={"trader_location"}
            placeholder={"Warszawska 19a"}
            label={"Lolalizacja sprzedającego"}
            rules={{ required: "Lokalizacja jest wymagana" }}
          />
          <ControlledInput
            control={control}
            name={"trader_description"}
            placeholder={"Stoisko 123a"}
            label={"Opis sprzedającego"}
          />
        </>
      )}

      <ControlledInput
        control={control}
        name={"price"}
        placeholder={"100"}
        label={"Cena (zł)"}
        rules={{ required: "Cena jest wymagana" }}
        inputMode={"numeric"}
      />

      <ControlledInput
        control={control}
        name={"description"}
        placeholder={"Opis oferty"}
        label={"Opis oferty"}
      />
      <ControlledCheckbox
        control={control}
        name={"finished"}
        label={"Zakończona"}
        color={Colors.primary500}
        size={24}
      />

      <View style={styles.buttonsContainer}>
        <PrimaryButton
          color={Colors.primary500}
          onPress={() => navigation.goBack()}
          text={"Anuluj"}
        />
        <PrimaryButton
          color={Colors.primary500}
          onPress={handleSubmit(onSubmit)}
          text={"Dodaj ofertę"}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
