import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";

const Collection = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Kolekcja",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Kolekcja</Text>
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

export default Collection;
