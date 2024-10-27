import { StyleSheet, Text, View } from "react-native";
import { CoinImage } from "../../../components/CoinImage";
import {
  PropertyLabel,
  PropertyRow,
  PropertyValue,
} from "../../../components/PropertyComponents";
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
          <PropertyValue>{type?.category}</PropertyValue>
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
        {type?.value?.currency?.full_name && (
          <PropertyRow>
            <PropertyLabel>Waluta: </PropertyLabel>
            <PropertyValue>{type?.value?.currency?.full_name}</PropertyValue>
          </PropertyRow>
        )}
        <PropertyRow>
          <PropertyLabel>Stan: </PropertyLabel>
          <PropertyValue>{grade.label}</PropertyValue>
        </PropertyRow>

        <PropertyRow>
          <Badge color={Colors.primary300}>Szczegóły</Badge>
          {showAddOfferBadge && (
            <Badge color={Colors.primary300} onPress={addOffer}>
              Dodaj ofertę
            </Badge>
          )}
        </PropertyRow>
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
