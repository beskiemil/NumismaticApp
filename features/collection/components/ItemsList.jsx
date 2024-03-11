import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import Loading from "../../../screens/Loading";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Pagination from "../../../components/Pagination";
import Colors from "../../../constants/colors";
import { ItemCard } from "./ItemCard";
import { useContext, useState } from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { useAddItemPopup } from "../hooks/useAddItemPopup";
import { AuthContext } from "../../authentication";

export const ItemsList = ({ onItemClick, user }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { user: currentUser } = useContext(AuthContext);
  const showAddOfferBadge = user.id === currentUser.id;

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
          "type.obverse",
          "type.reverse",
          "user",
        ],
        sort: ["createdAt:desc"],
        pagination: {
          page,
          pageSize,
        },
        filters: {
          user: { id: { $eq: user.id } },
        },
      });
      return await axiosInstance.get(`/items?${q}`).then((res) => res.data);
    },
  });

  const handleAddItemPress = useAddItemPopup();

  if (isLoading) return <Loading message={"Pobieramy twoją kolekcję..."} />;
  if (error) console.log(error.message);

  const paginationComponent =
    (items.data.length > pageSize && (
      <View style={styles.paginationContainer}>
        <Pagination
          currentPage={page}
          pageCount={items?.meta?.pagination?.pageCount}
          onPageChange={setPage}
        />
      </View>
    )) ||
    null;

  return (
    <>
      {items && items.data.length > 0 && (
        <FlatList
          data={items.data}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => onItemClick(item)}>
              <View
                style={[
                  { borderColor: Colors.primary400 },
                  // eslint-disable-next-line react-native/no-inline-styles
                  index < items.data.length - 1 && { borderBottomWidth: 2 },
                ]}
              >
                <ItemCard item={item} showAddOfferBadge={showAddOfferBadge} />
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.id || item.numista_id}
          ListHeaderComponent={paginationComponent}
          ListFooterComponent={paginationComponent}
        />
      )}
      {items.data.length < 1 && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Nie znaleziono przedmiotów.</Text>
          {user.id === currentUser.id && (
            <PrimaryButton
              text={"Dodaj przedmiot"}
              onPress={() => handleAddItemPress()}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    alignItems: "center",
  },
  notFoundContainer: {
    gap: 20,
  },
  notFoundText: {
    textAlign: "center",
    color: "grey",
    fontSize: 18,
    marginTop: 20,
  },
});
