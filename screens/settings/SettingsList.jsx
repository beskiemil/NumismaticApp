import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";
import { AuthContext } from "../../features/authentication/";
import { useContext } from "react";

const SettingsList = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Account")}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Konto</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Application")}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Aplikacja</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => logout()}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Wyloguj się</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 20,
  },
});

export default SettingsList;
