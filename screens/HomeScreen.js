import { Button, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Strona główna",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Login" onPress={() => navigation.push("Login")} />
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

export default HomeScreen;
