import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import { CoinImage } from "../../../components/CoinImage";
import { Label, Row, Value } from "../../../components/PropertyComponents";
export const TypeCard = ({ type }) => {
  //Wyświetlenie karty okazu

  return (
    <View style={styles.container}>
      <View style={styles.propertiesContainer}>
        <Row>
          <Text style={styles.title}>{type.title}</Text>
        </Row>
        {type.isNumistaType ? (
          <Row>
            <Label>Numista ID: </Label>
            <Value>N# {type.id}</Value>
          </Row>
        ) : (
          <Row>
            <Label>ID: </Label>
            <Value>#{type.id}</Value>
          </Row>
        )}
        <Row>
          <Label>Kategoria: </Label>
          <Value>{type.category}</Value>
        </Row>
        {type.issuer && (
          <Row>
            <Label>Emitent: </Label>
            <Value>{type.issuer?.name}</Value>
          </Row>
        )}
        {type.min_year && (
          <Row>
            <Label>Lata: </Label>
            <Value>
              {type?.min_year} - {type?.max_year}
            </Value>
          </Row>
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
