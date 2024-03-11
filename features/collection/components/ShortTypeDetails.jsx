import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import { Label, Row, Value } from "../../../components/PropertyComponents";

export const ShortTypeDetails = ({ type }) => {
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
