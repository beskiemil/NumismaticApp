import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import { CoinImage } from "../../../components/CoinImage";
import {
  PropertyLabel,
  PropertyRow,
  PropertyValue,
} from "../../../components/PropertyComponents";
export const TypeCard = ({ type }) => {
  //Wyświetlenie karty okazu

  return (
    <View style={styles.container}>
      <View style={styles.propertiesContainer}>
        <PropertyRow>
          <Text style={styles.title}>{type.title}</Text>
        </PropertyRow>
        {type.isNumistaType ? (
          <PropertyRow>
            <PropertyLabel>Numista ID: </PropertyLabel>
            <PropertyValue>N# {type.id}</PropertyValue>
          </PropertyRow>
        ) : (
          <PropertyRow>
            <PropertyLabel>ID: </PropertyLabel>
            <PropertyValue>#{type.id}</PropertyValue>
          </PropertyRow>
        )}
        <PropertyRow>
          <PropertyLabel>Kategoria: </PropertyLabel>
          <PropertyValue>{type.category}</PropertyValue>
        </PropertyRow>
        {type.issuer && (
          <PropertyRow>
            <PropertyLabel>Emitent: </PropertyLabel>
            <PropertyValue>{type.issuer?.name}</PropertyValue>
          </PropertyRow>
        )}
        {type.min_year && (
          <PropertyRow>
            <PropertyLabel>Lata: </PropertyLabel>
            <PropertyValue>
              {type?.min_year} - {type?.max_year}
            </PropertyValue>
          </PropertyRow>
        )}
      </View>
      <View style={styles.imagesContainer}>
        {!type.isNumistaType && type.obverse && (
          <CoinImage url={type.obverse?.picture?.formats?.thumbnail?.url} />
        )}
        {!type.isNumistaType && type.reverse && (
          <CoinImage url={type.reverse?.picture?.formats?.thumbnail?.url} />
        )}
        {type.isNumistaType && type.obverse_thumbnail && (
          <CoinImage url={type.obverse_thumbnail} />
        )}
        {type.isNumistaType && type.reverse_thumbnail && (
          <CoinImage url={type.reverse_thumbnail} />
        )}
        {type.isNumistaType && type?.obverse?.thumbnail && (
          <CoinImage url={type?.obverse?.thumbnail} />
        )}
        {type.isNumistaType && type?.reverse?.thumbnail && (
          <CoinImage url={type.reverse?.thumbnail} />
        )}
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
  },
  title: {
    fontSize: 21,
    fontWeight: "400",
    color: Colors.primary500,
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
