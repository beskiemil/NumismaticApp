import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../authentication";
import { useContext, useLayoutEffect } from "react";
import { ItemsList } from "../components/ItemsList";

export const Items = ({ navigation, route }) => {
  const { user } = route.params;
  const { user: currentUser } = useContext(AuthContext);
  useLayoutEffect(() => {
    if (user.id === currentUser.id)
      navigation.setOptions({ title: "Moja kolekcja" });
    else navigation.setOptions({ title: `Kolekcja ${user.username}` });
  }, []);

  const onItemClick = (item) => {
    navigation.navigate("Item", { id: item.id });
  };
  return (
    <View style={styles.container}>
      <ItemsList onItemClick={onItemClick} user={user} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
