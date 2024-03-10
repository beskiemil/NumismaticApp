import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { TypesList } from "../components/TypesList";

export const Types = ({ route, navigation }) => {
  const [queryParams, setQueryParams] = useState(route.params?.searchParams);

  //funkcja która wywołuje się po naciśnięciu na kartę okazu, przenosi do ekranu Type i przekazuje parametry okazu
  const onTypeClick = ({ isNumistaType, id, numista_id }) => {
    navigation.navigate("Type", { isNumistaType, id, numista_id });
  };

  return (
    <View style={styles.container}>
      <TypesList queryParams={queryParams} onTypeClick={onTypeClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
