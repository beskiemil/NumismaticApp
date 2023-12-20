import { StyleSheet, View } from "react-native";
import { TypeCard } from "./TypeCard";
import Colors from "../../../constants/colors";

export const TypesList = ({ types, onTypeClick }) => {
  console.log(types.data[0]);
  return (
    <View style={styles.list}>
      {types.data.map((type) => (
        <TypeCard key={type.id} type={type} onCardClick={onTypeClick} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 10,
    alignItems: "center",
    paddingHorizontal: "10%",
  },
});
