import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import { Category } from "../../../constants/categories";
import { banknoteGrades, coinGrades } from "../../../constants/grades";
import { Checkbox } from "expo-checkbox";
import { Label, Row, Value } from "../../../components/ui/PropertyComponents";

export const ItemDetails = ({ item }) => {
  const { type } = item;

  let grade;
  if (type.category === Category.COIN)
    grade = coinGrades.find((g) => g.value === item.grade);
  else if (type.category === Category.BANKNOTE)
    grade = banknoteGrades.find((g) => g.value === item.grade);

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  title: {
    fontSize: 21,
    fontWeight: "400",
    color: Colors.primary500,
  },
});
