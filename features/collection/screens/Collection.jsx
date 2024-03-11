import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { AuthContext } from "../../authentication";
import { useContext } from "react";
import { useAddItemPopup } from "../hooks/useAddItemPopup";
import { Screen } from "../../../components/screen";
import { StyleSheet } from "react-native";

export const Collection = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const handleAddItemPress = useAddItemPopup();
  return (
    <Screen style={styles.screen}>
      <PrimaryButton
        text={"Moja kolekcja"}
        onPress={() => navigation.navigate("Items", { user })}
      />
      <PrimaryButton
        text={"Wyszukaj użytkownika"}
        onPress={() => navigation.navigate("Users", { user })}
      />
      <PrimaryButton
        text={"Dodaj przedmiot"}
        onPress={() => handleAddItemPress()}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
  },
});
