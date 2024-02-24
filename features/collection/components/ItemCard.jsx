import { StyleSheet, Text, View } from "react-native";
import { CoinImage } from "../../../components/CoinImage";
import { Label, Row, Value } from "../../../components/ui/PropertyComponents";
import { Checkbox } from "expo-checkbox";
import Colors from "../../../constants/colors";
import { Category } from "../../../constants/categories";
import { banknoteGrades, coinGrades } from "../../../constants/grades";

export const ItemCard = ({ item }) => {
  const { type } = item;

  let grade;
  if (type.category === Category.COIN)
    grade = coinGrades.find((g) => g.value === item.grade);
  else if (type.category === Category.BANKNOTE)
    grade = banknoteGrades.find((g) => g.value === item.grade);

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
        {type?.value?.currency?.full_name && (
          <Row>
            <Label>Waluta: </Label>
            <Value>{type?.value?.currency?.full_name}</Value>
          </Row>
        )}
        <Row>
          <Label>Stan: </Label>
          <Value>{grade.label}</Value>
        </Row>
        <Row>
          <Label>Do zamiany: </Label>
          <Value>
            <View>
              <Checkbox value={item.toChange} color={Colors.primary500} />
            </View>
          </Value>
        </Row>
        <Row>
          <Label>Na sprzedaż: </Label>
          <Value>
            <View>
              <Checkbox value={item.toSell} color={Colors.primary500} />
            </View>
          </Value>
        </Row>
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
    fontSize: 21,
    fontWeight: "400",
    color: Colors.primary500,
  },
  propertiesContainer: {
    flex: 5,
    justifyContent: "center",
    gap: 2,
  },
  imagesContainer: {
    flex: 2,
    gap: 5,
    justifyContent: "center",
  },
});
