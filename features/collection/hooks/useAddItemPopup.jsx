import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const useAddItemPopup = () => {
  const navigation = useNavigation();
  const goToCatalog = () => {
    navigation.navigate("CatalogRoot", {
      screen: "Catalog",
      initial: false,
    });
  };

  return async () => {
    const showWarning = await AsyncStorage.getItem("addItemWarning");
    if (!showWarning)
      Alert.alert(
        "Wybierz okaz",
        "Aby dodać przedmiot do kolekcji, najpierw wyszukaj okaz w katalogu. ",
        [
          {
            text: "Nie pokazuj więcej",
            onPress: async () => {
              await AsyncStorage.setItem("addItemWarning", "false");
              goToCatalog();
            },
          },
          {
            text: "Anuluj",
          },
          {
            text: "Ok",
            onPress: () => goToCatalog(),
          },
        ],
      );
    else goToCatalog();
  };
};
