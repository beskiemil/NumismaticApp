import { FlatList, StyleSheet, Text, View } from "react-native";
import { TypeCard } from "../../features/catalog/";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import * as qs from "qs";
import Pagination from "../../components/ui/Pagination";

const Types = ({ route, navigation }) => {
  const [queryParams, setQueryParams] = useState(route.params?.searchParams);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // TODO: TEKST WPISANY W POLE WYSZUKIWANIA NIE ZOSTAJE ZAPAMIĘTANY

  const { get } = useAxios();
  const {
    data: types,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["types", queryParams, page],
    queryFn: () => {
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
      return get(`/types?${q}`);
    },
    enabled: !!queryParams,
  });
  // TODO KLIKNIECIE NA TYP Z NUMISTA
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
        pageCount={types.meta.pagination.pageCount}
      />
    </View>
  );

  const listHeader = paginationComponent;
  const listFooter = types.data.length > 1 && paginationComponent;

  return (
    <View style={styles.container}>
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
});
