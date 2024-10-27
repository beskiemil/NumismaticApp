import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import {
  PropertyLabel,
  PropertyRow,
  PropertyValue,
} from "../../../components/PropertyComponents";

export const ShortTypeDetails = ({ type }) => {
  return (
    <View style={styles.container}>
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
