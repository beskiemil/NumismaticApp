import { FlatList, StyleSheet, View } from "react-native";
import { TypeCard, TypeSearchForm } from "../../features/catalog/";
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
  // TODO: TEKST WPISANY W POLE WYSZUKIWANIA NIE ZOSTAJE ZAPAMIĘTANY
  const handleSearch = async (queryParams) => {
    setQueryParams(queryParams);
    setPage(1);
  };

  const { get } = useAxios();
  const {
    data: {
      data: types,
      meta: { pagination },
    },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["types", queryParams, page],
    queryFn: () => {
      const { searchQuery, mint, issuer } = queryParams;
      const q = qs.stringify({
        ...(searchQuery && { q: searchQuery }),
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
    initialData: { data: [], meta: { pagination: {} } },
  });

  const onTypeClick = (id) => {
    navigation.navigate("Type", { id });
  };

  if (isLoading) return <Loading message={"Przeszukujemy katalog..."} />;
  if (error) console.log(error.message, queryParams);

  const listHeader = (
    <View style={styles.listHeaderFooterContainer}>
      <TypeSearchForm onSubmit={handleSearch} />
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        pageCount={pagination.pageCount}
      />
    </View>
  );
  const listFooter = types.length > 1 && (
    <View style={styles.listHeaderFooterContainer}>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        pageCount={pagination.pageCount}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={types}
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
    paddingHorizontal: "10%",
    gap: 20,
  },
  listHeaderFooterContainer: {
    alignItems: "center",
    gap: 20,
  },
});
