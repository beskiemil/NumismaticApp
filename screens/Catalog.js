import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";

const Catalog = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Katalog",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Katalog</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Catalog;
