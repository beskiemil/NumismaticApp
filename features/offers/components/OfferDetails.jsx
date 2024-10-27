import { StyleSheet, View } from "react-native";
import Colors from "../../../constants/colors";
import { CoinImage } from "../../../components/CoinImage";
import {
  PropertyLabel,
  PropertyRow,
  PropertyTitle,
  PropertyValue,
  TitleRow,
  UserRow,
} from "../../../components/PropertyComponents";
import { traderTypes, traderTypesOptions } from "../constants/traderTypes";
import { Avatar } from "../../users";
import { Category } from "../../../constants/categories";
import { banknoteGrades, coinGrades } from "../../../constants/grades";

export const OfferDetails = ({
  offer: {
    item: { type, ...item },
    ...offer
  },
}) => {
  const grade =
    type.category === Category.COIN || type.category === Category.EXONUMIA
      ? coinGrades.find((g) => g.value === item.grade)
      : banknoteGrades.find((g) => g.value === item.grade).label;

  const traderType = traderTypesOptions?.find(
    (t) => t.value === offer.trader_type,
  )?.label;
  return (
    <View>
      <PropertyTitle>{item?.type?.title}</PropertyTitle>
      <PropertySection>
        <ImageRow>
          {item.obverse && (
            <CoinImage url={item.obverse.formats.thumbnail.url} />
          )}
          {item.reverse && (
            <CoinImage url={item.reverse.formats.thumbnail.url} />
          )}
        </ImageRow>
      </PropertySection>
      <PropertySection>
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
          <PropertyLabel>Stan: </PropertyLabel>
          <PropertyValue>{grade.label}</PropertyValue>
        </PropertyRow>
      </PropertySection>
      <PropertySection>
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
              <PropertyValue>{item?.user?.username}</PropertyValue>
            </View>
          ) : (
            <PropertyValue>{offer.trader}</PropertyValue>
          )}
        </UserRow>
        {offer?.trader_type !== traderTypes.USER && (
          <>
            <PropertyRow>
              <PropertyLabel>Typ sprzedawcy:</PropertyLabel>
              <PropertyValue>{traderType}</PropertyValue>
            </PropertyRow>
            <PropertyRow>
              <PropertyLabel>Opis sprzedawcy:</PropertyLabel>
              <PropertyValue>{offer.trader_description}</PropertyValue>
            </PropertyRow>
          </>
        )}
      </PropertySection>
      <PropertySection>
        <PropertyRow>
          <PropertyLabel>Opis oferty:</PropertyLabel>
          <PropertyValue>{offer.description}</PropertyValue>
        </PropertyRow>
        <PropertyRow>
          <PropertyLabel>Cena:</PropertyLabel>
          <PropertyValue>{offer.price && offer.price + " zł"}</PropertyValue>
        </PropertyRow>
        <PropertyRow>
          <PropertyLabel>Oferta zakończona:</PropertyLabel>
          <PropertyValue>{offer.finished ? "Tak" : "Nie"}</PropertyValue>
        </PropertyRow>
      </PropertySection>
    </View>
  );
};

const PropertySection = ({ children }) => {
  return <View style={styles.propertySection}>{children}</View>;
};
const ImageRow = ({ children }) => {
  return <View style={styles.imageRow}>{children}</View>;
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    color: Colors.primary500,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
    width: "80%",
    alignSelf: "center",
  },
  propertySection: {
    flexDirection: "column",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  propertyRow: {
    flexDirection: "row",
    marginVertical: 1,
  },
  propertyLabel: {
    flex: 2,
  },
  propertyValue: {
    flex: 3,
  },
  propertyLabelText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  propertyValueText: {
    fontSize: 14,
  },
});
