import { ScrollView, StyleSheet, View } from "react-native";
import { TypeSearchForm } from "../../features/catalog";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import ExpoCheckbox, { Checkbox } from "expo-checkbox";
import { ControlledCheckbox } from "../../components/ui/ControlledCheckbox";
import { useForm } from "react-hook-form";
import ControlledInput from "../../components/ui/ControlledInput";
import IconButton from "../../components/IconButton";
import PrimaryButton from "../../components/PrimaryButton";
import Colors from "../../constants/colors";

const Catalog = ({ navigation }) => {
  const handleSearch = (searchParams) => {
    navigation.navigate("Types", { searchParams });
  };

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["35%"], []);

  const handleShowModal = useCallback(
    () => bottomSheetModalRef.current?.present(),
    [],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      query: "",
      showNumistaResults: true,
    },
  });

  return (
    <BottomSheetModalProvider>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={"handled"}
        keyboardDismissMode={"on-drag"}
        bounces={false}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <ControlledInput
              control={control}
              name={"query"}
              placeholder={"Wyszukaj..."}
              rules={{
                required: "Pole wyszukiwania nie może być puste",
              }}
            />
            <IconButton
              iconFamily={"IonIcons"}
              name={"filter"}
              size={24}
              color={"white"}
              onPress={handleShowModal}
            />
          </View>
          <PrimaryButton
            text={"Wyszukaj"}
            onPress={handleSubmit(handleSearch)}
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          handleStyle={styles.handleStyle}
          style={styles.shadow}
        >
          <View style={styles.modalContainer}>
            <ControlledCheckbox
              control={control}
              name={"showNumistaResults"}
              label={"Pokaż wyniki z Numista.com"}
              color={Colors.primary500}
              size={26}
            />
          </View>
        </BottomSheetModal>
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  modalContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  handleStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Catalog;
