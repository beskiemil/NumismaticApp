import { StyleSheet, View } from "react-native";
import { CoinImage } from "../../../components/CoinImage";
import { ItemDetails } from "./ItemDetails";

export const ItemCard = ({ item }) => {
  const { type } = item;

  console.log(item.obverse);

  return (
    <View style={styles.container}>
      <View style={styles.propertiesContainer}>
        <ItemDetails item={item} />
      </View>
      <View style={styles.imagesContainer}>
        {item.obverse && <CoinImage url={item.obverse.formats.thumbnail.url} />}
        {item.reverse && <CoinImage url={item.reverse.formats.thumbnail.url} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  propertiesContainer: {
    flex: 5,
    justifyContent: "center",
  },
  imagesContainer: {
    flex: 2,
    gap: 5,
    justifyContent: "center",
  },
});
