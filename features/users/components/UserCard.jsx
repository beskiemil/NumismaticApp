import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "./Avatar";
import { Badge } from "../../../components/ui/Badge";
import { useNavigation } from "@react-navigation/native";

export const UserCard = ({ user }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.userListItem}>
      <Avatar
        src={user?.avatar?.formats?.thumbnail?.url}
        username={user.username}
      />
      <View style={styles.properties}>
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.stats}>
          <Badge onPress={() => navigation.navigate("Items", { user })}>
            Przedmioty: {user.items?.length || 0}
          </Badge>
          <Badge onPress={() => console.log("b")}>
            Oferty: {user.offers?.length || 0}
          </Badge>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userListItem: {
    padding: 10,
    flexDirection: "row",
    gap: 30,
  },
  properties: {
    justifyContent: "space-around",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  username: {
    fontSize: 18,
    color: "black",
  },
});
