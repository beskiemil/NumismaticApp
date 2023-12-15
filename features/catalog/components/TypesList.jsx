import { StyleSheet, View } from "react-native";
import { TypeCard } from "./TypeCard";
import Colors from "../../../constants/colors";

export const TypesList = ({ types }) => {
  console.log(types);
  return (
    <View style={styles.list}>
      {types.data.map((type) => (
        <TypeCard key={type.id} type={type} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
});
