import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";

const Settings = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Ustawienia",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Ustawienia</Text>
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

export default Settings;
