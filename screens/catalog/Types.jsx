import { FlatList, StyleSheet, Text, View } from "react-native";
import { TypeCard } from "../../features/catalog/";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../Loading";
import * as qs from "qs";
import Pagination from "../../components/ui/Pagination";

const Types = ({ route, navigation }) => {
  const [queryParams, setQueryParams] = useState(route.params?.searchParams);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { axiosInstance } = useAxios();
  const {
    data: types,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["types", queryParams, page],
    queryFn: async () => {
      console.log("queryParams", queryParams);
      const q = qs.stringify({
        ...queryParams,
        populate: [
          "issuer",
          "obverse",
          "obverse.picture",
          "reverse",
          "reverse.picture",
          "edge",
          "edge.picture",
          "watermark",
          "watermark.picture",
        ],
        pagination: {
          page,
          pageSize,
        },
      });
      return await axiosInstance.get(`/types?${q}`).then((res) => res.data);
    },
    enabled: !!queryParams,
  });
  const onTypeClick = ({ isNumistaType, id, numista_id }) => {
    navigation.navigate("Type", { isNumistaType, id, numista_id });
  };

  if (isLoading) return <Loading message={"Przeszukujemy katalog..."} />;
  if (error) console.log(error.message, queryParams);

  const paginationComponent = (
    <View style={styles.listHeaderFooterContainer}>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        pageCount={types?.meta?.pagination?.pageCount}
      />
    </View>
  );

  const listHeader = paginationComponent;
  const listFooter = types.data.length > 1 && paginationComponent;

  return (
    <View style={styles.container}>
      {types && types.data.length > 0 && (
        <FlatList
          data={types.data}
          renderItem={({ item }) => (
            <TypeCard type={item} onCardClick={onTypeClick} />
          )}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}
      {types && types.data.length === 0 && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>
            Nie znaleziono okazów spełniających podane kryteria
          </Text>
        </View>
      )}
    </View>
  );
};

export default Types;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: "7%",
    gap: 20,
  },
  listHeaderFooterContainer: {
    alignItems: "center",
    gap: 20,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
  },
  notFoundText: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 20,
  },
});
