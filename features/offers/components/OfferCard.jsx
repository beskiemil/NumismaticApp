import { StyleSheet, View } from "react-native";
import { CoinImage } from "../../../components/CoinImage";
import {
  PropertyLabel,
  PropertyRow,
  PropertyValue,
  PropertyTitle,
  TitleRow,
  UserRow,
} from "../../../components/PropertyComponents";
import Colors from "../../../constants/colors";
import { Category } from "../../../constants/categories";
import { banknoteGrades, coinGrades } from "../../../constants/grades";
import { Badge } from "../../../components/buttons/Badge";
import { useNavigation } from "@react-navigation/native";
import { traderTypes } from "../constants/traderTypes";
import { Avatar } from "../../users";

export const OfferCard = ({ offer }) => {
  const navigation = useNavigation();
  const {
    item: { type, ...item },
  } = offer;

  const grade =
    type.category === Category.COIN || type.category === Category.EXONUMIA
      ? coinGrades.find((g) => g.value === item.grade)
      : banknoteGrades.find((g) => g.value === item.grade);

  const handleDetailsPress = () => {
    navigation.navigate("Offer", { id: offer.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.propertiesContainer}>
        <TitleRow>
          <PropertyTitle>{type.title}</PropertyTitle>
        </TitleRow>
        <UserRow>
          <PropertyLabel>Sprzedawca: </PropertyLabel>
          {offer.trader_type === traderTypes.USER ? (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{ flex: 3, flexDirection: "row" }}>
              <Avatar
                username={item?.user?.username}
                src={item?.user?.avatar?.formats?.thumbnail?.url}
                size={"sm"}
              />
              <PropertyValue>{offer?.item?.user?.username}</PropertyValue>
            </View>
          ) : (
            <PropertyValue>{offer.trader}</PropertyValue>
          )}
        </UserRow>
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
        {/*<PropertyRow>*/}
        {/*  <PropertyLabel>Kategoria: </PropertyLabel>*/}
        {/*  <PropertyValue>{type?.category}</PropertyValue>*/}
        {/*</PropertyRow>*/}
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
        {/*{type?.value?.currency?.full_name && (*/}
        {/*  <PropertyRow>*/}
        {/*    <PropertyLabel>Waluta: </PropertyLabel>*/}
        {/*    <PropertyValue>{type?.value?.currency?.full_name}</PropertyValue>*/}
        {/*  </PropertyRow>*/}
        {/*)}*/}
        <PropertyRow>
          <PropertyLabel>Stan: </PropertyLabel>
          <PropertyValue>{grade.label}</PropertyValue>
        </PropertyRow>
        {/*<PropertyRow>*/}
        {/*  <PropertyLabel>Opis oferty: </PropertyLabel>*/}
        {/*  <PropertyValue>{offer.description}</PropertyValue>*/}
        {/*</PropertyRow>*/}
        <PropertyRow>
          <PropertyLabel>Cena: </PropertyLabel>
          <PropertyValue>{offer.price} zł</PropertyValue>
        </PropertyRow>

        <PropertyRow>
          <Badge color={Colors.primary300} onPress={handleDetailsPress}>
            Szczegóły
          </Badge>
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
    alignItems: "center",
  },
  propertiesContainer: {
    flex: 5,
    justifyContent: "center",
    gap: 2,
  },
  imagesContainer: {
    flex: 2,
    gap: 5,
  },
});
