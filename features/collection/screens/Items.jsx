import { FlatList, Pressable, StyleSheet, View } from "react-native";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../authentication";
import { useContext, useLayoutEffect, useState } from "react";
import qs from "qs";
import Pagination from "../../../components/ui/Pagination";
import Loading from "../../../screens/Loading";
import { ItemCard } from "../components/ItemCard";
import Colors from "../../../constants/colors";

export const Items = ({ navigation, route }) => {
  const { user } = route.params;
  const { user: currentUser } = useContext(AuthContext);
  useLayoutEffect(() => {
    if (user.id === currentUser.id)
      navigation.setOptions({ title: "Moja kolekcja" });
    else navigation.setOptions({ title: `Kolekcja ${user.username}` });
  }, []);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { axiosInstance } = useAxios();
  const {
    data: items,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["items", user.id, page],
    queryFn: async () => {
      const q = qs.stringify({
        user: user.id,
        populate: [
          "obverse",
          "reverse",
          "type",
          "type.issuer",
          "type.obverse",
          "type.obverse.picture",
          "type.reverse",
          "type.reverse.picture",
          "type.edge",
          "type.edge.picture",
          "type.watermark",
          "type.watermark.picture",
        ],
        sort: ["createdAt:desc"],
        pagination: {
          page,
          pageSize,
        },
      });
      return await axiosInstance.get(`/items?${q}`).then((res) => res.data);
    },
  });

  const onItemClick = (id) => {
    navigation.navigate("Item", { id });
  };

  if (isLoading) return <Loading message={"Pobieramy twoją kolekcję..."} />;
  if (error) console.log(error.message);

  const paginationComponent = items.data.length > pageSize && (
    <View style={styles.paginationContainer}>
      <Pagination
        currentPage={page}
        pageCount={items?.meta?.pagination?.pageCount}
        onPageChange={setPage}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {items && items.data.length > 0 && (
        <FlatList
          contentContainerStyle={styles.innerContainer}
          data={items.data}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => onItemClick(item.id)}>
              <View
                style={[
                  { borderColor: Colors.primary400 },
                  // eslint-disable-next-line react-native/no-inline-styles
                  index < items.data.length - 1 && { borderBottomWidth: 2 },
                ]}
              >
                <ItemCard item={item} />
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.id || item.numista_id}
          ListHeaderComponent={paginationComponent}
          ListFooterComponent={paginationComponent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
  },
  paginationContainer: {
    alignItems: "center",
  },
});
