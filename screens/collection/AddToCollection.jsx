import { StyleSheet, ScrollView } from "react-native";
import { AddItemForm, ShortDetails } from "../../features/collection";

export const AddToCollection = ({ navigation, route }) => {
  const { type } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ShortDetails type={type} />
      <AddItemForm type={type} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    gap: 20,
  },
});
