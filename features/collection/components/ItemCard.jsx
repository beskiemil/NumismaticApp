import { StyleSheet, Text, View } from "react-native";
import { CoinImage } from "../../../components/CoinImage";
import { Label, Row, Value } from "../../../components/PropertyComponents";
import Colors from "../../../constants/colors";
import { Category } from "../../../constants/categories";
import { banknoteGrades, coinGrades } from "../../../constants/grades";
import { Badge } from "../../../components/buttons/Badge";
import { CommonActions, useNavigation } from "@react-navigation/native";

export const ItemCard = ({ item, showAddOfferBadge }) => {
  const navigation = useNavigation();

  const { type } = item;

  const grade =
    type.category === Category.COIN || type.category === Category.EXONUMIA
      ? coinGrades.find((g) => g.value === item.grade)
      : banknoteGrades.find((g) => g.value === item.grade);
  const addOffer = () => {
    navigation.navigate("OffersRoot", {
      screen: "AddOffer",
      initial: false,
      params: { entity: { item } },
    });
  };

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
          <Value>{type?.category}</Value>
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
          <Badge color={Colors.primary300}>Szczegóły</Badge>
          {showAddOfferBadge && (
            <Badge color={Colors.primary300} onPress={addOffer}>
              Dodaj ofertę
            </Badge>
          )}
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
