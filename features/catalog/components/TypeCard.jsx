import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";

export const TypeCard = ({ type }) => {
  const { id } = type;
  const { title, numista_id, category, min_year, max_year } = type?.attributes;
  return (
    <View style={styles.card}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {numista_id && (
        <View>
          <Text style={styles.text}>ID Numista: N#{numista_id}</Text>
        </View>
      )}
      <Text style={styles.text}>{category}</Text>
      <Text style={styles.text}>{min_year}</Text>
      <Text style={styles.text}>{max_year}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary500,
    minWidth: "80%",
    minHeight: 250,
    borderRadius: 15,
    padding: 25,
    opacity: 0.9,
    flexWrap: "wrap",
  },
  textWrapper: {
    flexDirection: "row",
  },
  titleWrapper: {
    flexDirection: "row",
    marginBottom: 12,
  },
  title: {
    color: "white",
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
  },
});
