import { StyleSheet, View } from "react-native";
import PrimaryButton from "../../../components/PrimaryButton";
import { AuthContext } from "../../authentication";
import { useContext } from "react";
import { useAddItemPopup } from "../hooks/useAddItemPopup";

export const Collection = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const handleAddItemPress = useAddItemPopup();
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    justifyContent: "center",
  },
});
