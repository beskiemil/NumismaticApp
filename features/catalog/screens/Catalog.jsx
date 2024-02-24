import { StyleSheet, View } from "react-native";
import { TypeSearchForm } from "../components/TypeSearchForm";

export const Catalog = ({ navigation }) => {
  //główny ekran zakładki katalog, zawiera formularz wyszukiwania

  //funkcja która wywołuje się po naciśnięciu przycisku "Szukaj", przenosi do ekranu Types i przekazuje parametry wyszukiwania
  const handleSearch = (searchParams) => {
    navigation.navigate("Types", { searchParams });
  };

  return (
    <View
      style={styles.container}
      keyboardShouldPersistTaps={"handled"}
      keyboardDismissMode={"on-drag"}
      bounces={false}
    >
      <TypeSearchForm onSubmit={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
