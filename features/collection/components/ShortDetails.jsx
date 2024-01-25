import { StyleSheet, Text, View } from "react-native";

export const ShortDetails = ({ type }) => {
  return (
    <View>
      <Row>
        <Label>Tytuł: </Label>
        <Value>{type.data.title}</Value>
      </Row>
      {type.data.isNumistaType ? (
        <Row>
          <Label>Numista ID: </Label>
          <Value>N# {type.data.id}</Value>
        </Row>
      ) : (
        <Row>
          <Label>ID: </Label>
          <Value>#{type.data.id}</Value>
        </Row>
      )}
      <Row>
        <Label>Kategoria: </Label>
        <Value>{type.data?.category}</Value>
      </Row>
      <Row>
        <Label>Typ: </Label>
        <Value>{type.data?.type}</Value>
      </Row>
      <Row>
        <Label>Emitent: </Label>
        <Value>{type.data?.issuer?.name}</Value>
      </Row>
      <Row>
        <Label>Lata: </Label>
        <Value>
          {type.data?.min_year} - {type.data?.max_year}
        </Value>
      </Row>
      <Row>
        <Label>Waluta: </Label>
        <Value>{type.data?.value?.currency?.full_name}</Value>
      </Row>
    </View>
  );
};

const Label = ({ children }) => {
  return (
    <View style={styles.label}>
      <Text style={styles.labelText}>{children}</Text>
    </View>
  );
};
const Value = ({ children }) => {
  return (
    <View style={styles.value}>
      <Text style={styles.valueText}>{children}</Text>
    </View>
  );
};

const Row = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 1,
    alignItems: "baseline",
  },
  label: {
    flex: 2,
  },
  value: {
    flex: 3,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  valueText: {
    fontSize: 14,
  },
});
