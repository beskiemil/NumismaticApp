import { AuthContext } from "../../authentication";
import { useContext, useLayoutEffect } from "react";
import { ItemsList } from "../components/ItemsList";
import { Screen } from "../../../components/screen";

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
    <Screen>
      <ItemsList onItemClick={onItemClick} user={user} />
    </Screen>
  );
};
