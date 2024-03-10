import { ScrollView, StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import ControlledInput from "../../../components/ui/ControlledInput";
import PrimaryButton from "../../../components/PrimaryButton";
import IconButton from "../../../components/IconButton";
import { ControlledCheckbox } from "../../../components/ui/ControlledCheckbox";
import Colors from "../../../constants/colors";
import { useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { IssuerSelect } from "./IssuerSelect";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../../components/ui/LoadingComponent";
import { ControlledSelect } from "../../../components/ui/ControlledSelect";

export const TypeSearchForm = ({ onSubmit }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const toggleFilters = () => setFiltersVisible((prev) => !prev);

  //hook który pozwala na wykonywanie zapytań do API.
  const { axiosInstance } = useAxios();
  //hook zwracający listę emitentów, którą wyświetlamy w dolnym panelu/
  const {
    data: issuers,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["issuers"],
    queryFn: async () =>
      await axiosInstance.get(`/issuers/nested`).then((res) => res.data),
  });

  if (error) console.log(error);

  const [selectedIssuer, setSelectedIssuer] = useState(null);

  //hook odpowiedzialny za zarządzanie formularzem wyszukiwania
  //pozwala nam na przykład na walidację pól formularza
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      query: "",
      showNumistaResults: true,
      category: null,
    },
  });
  const handleButtonClick = (values) => {
    if (selectedIssuer) values.issuer = selectedIssuer?.code;
    onSubmit(values);
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.inputContainer}>
          <ControlledInput
            control={control}
            name={"query"}
            placeholder={"Wyszukaj..."}
            rules={{
              validate: (value) => {
                if (!selectedIssuer && !value)
                  return "Wybierz emitenta lub wpisz zapytanie";
                return true;
              },
            }}
          />

          <IconButton
            iconFamily={"IonIcons"}
            name={"filter"}
            size={24}
            color={"white"}
            onPress={toggleFilters}
          />
        </View>

        {filtersVisible && isLoading && (
          <LoadingComponent message={"Ładowanie..."} />
        )}
        {filtersVisible && !isLoading && (
          <>
            {/*Komponent do wyboru emitenta. */}
            <IssuerSelect
              issuers={issuers}
              selectedIssuer={selectedIssuer}
              setSelectedIssuer={setSelectedIssuer}
            />

            <View style={styles.selectContainer}>
              <ControlledSelect
                name={"category"}
                control={control}
                options={[
                  { label: "Moneta", value: "coin" },
                  { label: "Banknot", value: "banknote" },
                  { label: "Egzonumia", value: "exonumia" },
                ]}
                placeholder={"Wybierz kategorię"}
                color={Colors.primary500}
                arrowColor={Colors.primary400}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <ControlledCheckbox
                control={control}
                name={"showNumistaResults"}
                label={"Pokaż wyniki z Numista.com"}
                color={Colors.primary500}
                size={26}
              />
            </View>
          </>
        )}

        {((filtersVisible && !isLoading) || !filtersVisible) && (
          <PrimaryButton
            text={"Wyszukaj"}
            onPress={handleSubmit(handleButtonClick)}
            style={styles.submitButton}
          />
        )}
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    gap: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  checkboxContainer: {
    alignSelf: "flex-start",
  },
  selectContainer: {
    width: 250,
    alignSelf: "flex-start",
  },
  submitButton: {
    alignSelf: "center",
  },
});
