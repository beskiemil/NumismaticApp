import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TypeSearchForm } from "../../features/catalog";

const Catalog = ({ navigation }) => {
  const handleSearch = (searchParams) => {
    navigation.navigate("Types", { searchParams });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={"handled"}
      keyboardDismissMode={"on-drag"}
      bounces={false}
    >
      <TypeSearchForm onSubmit={handleSearch} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Catalog;
