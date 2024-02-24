import { StyleSheet, ScrollView } from "react-native";
import { AddItemForm } from "../components/AddItemForm";
import { ShortTypeDetails } from "../components/ShortTypeDetails";

export const AddItem = ({ navigation, route }) => {
  const { type } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ShortTypeDetails type={type.data} />
      <AddItemForm type={type.data} />
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
