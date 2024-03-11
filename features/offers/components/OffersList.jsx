import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import qs from "qs";
import Loading from "../../../screens/Loading";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Pagination from "../../../components/Pagination";
import Colors from "../../../constants/colors";
import { OfferCard } from "./OfferCard";

export const OffersList = ({ user }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { axiosInstance } = useAxios();
  const {
    data: offers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offers", user],
    queryFn: async () => {
      const q = qs.stringify({
        ...(user && {
          filters: {
            item: { user: { id: user.id } },
          },
          populate: [
            "item",
            "item.user",
            "item.obverse",
            "item.reverse",
            "item.type",
            "item.type.obverse",
            "item.type.reverse",
          ],
          pagination: {
            pageSize,
            page,
          },
        }),
      });
      return await axiosInstance.get(`/offers?${q}`).then((res) => res.data);
    },
  });

  if (isLoading) return <Loading message={"Przeszukujemy katalog ofert..."} />;
  if (error) return <Text>{error.message}</Text>;

  const paginationComponent =
    (offers.data.length > pageSize && (
      <View style={styles.paginationContainer}>
        <Pagination
          currentPage={page}
          pageCount={offers?.meta?.pagination?.pageCount}
          onPageChange={setPage}
        />
      </View>
    )) ||
    null;

  return (
    <>
      <FlatList
        data={offers.data}
        renderItem={({ item: offer, index }) => (
          <View
            style={[
              { borderColor: Colors.primary400 },
              // eslint-disable-next-line react-native/no-inline-styles
              index < offers.data.length - 1 && { borderBottomWidth: 2 },
            ]}
          >
            <OfferCard offer={offer} />
          </View>
        )}
        keyExtractor={(offer) => offer.id}
        ListHeaderComponent={paginationComponent}
        ListFooterComponent={paginationComponent}
      />
      {offers?.data?.length === 0 && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Nie znaleziono przedmiotów.</Text>
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
