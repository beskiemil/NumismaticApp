import { FlatList, StyleSheet, Text, View } from "react-native";
import { UserCard } from "./UserCard";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { useState } from "react";
import { Input } from "../../../components/forms/Input";
import LoadingComponent from "../../../components/LoadingComponent";

export const UsersList = () => {
  const [username, setUsername] = useState("");

  const { axiosInstance } = useAxios();
  const {
    data: users,
    error,
    isPending,
  } = useQuery({
    queryKey: ["users", username],
    queryFn: async () => {
      const q = qs.stringify({
        filters: {
          username: { $containsi: username },
        },
        populate: ["avatar.picture", "items", "items.type", "offers"],
      });
      return axiosInstance.get(`/users?${q}`).then((res) => res.data);
    },
    enabled: !!username,
  });

  if (error) return <Text>{error.message}</Text>;

  return (
    <>
      <Input
        label={"Nazwa użytkownika"}
        placeholder={"jannowak76"}
        value={username}
        onChange={setUsername}
      />
      {isPending && !!username && (
        <View style={styles.loadingContainer}>
          <LoadingComponent message={"Szukamy użytkowników..."} />
        </View>
      )}
      {users && users.length > 0 && (
        <FlatList
          data={users}
          renderItem={({ item, index }) => {
            return (
              <>
                <UserCard key={item?.id} user={item} />
                {index !== users.length - 1 && (
                  <View
                    style={{
                      height: 2,
                      backgroundColor: "lightgrey",
                      margin: 10,
                    }}
                  />
                )}
              </>
            );
          }}
        />
      )}
      {users?.length === 0 && (
        <Text style={styles.notFoundText}>Nie znaleziono</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    textAlign: "center",
    color: "grey",
    fontSize: 18,
    marginTop: 20,
  },
});
