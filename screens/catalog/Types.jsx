import { FlatList, StyleSheet, View } from "react-native";
import { TypeCard, TypeSearchForm } from "../../features/catalog/";
import useAxios from "../../hooks/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../Loading";
import * as qs from "qs";

const Types = ({ route, navigation }) => {
  const [queryParams, setQueryParams] = useState(route.params?.searchParams);
  // TODO: TEKST WPISANY W POLE WYSZUKIWANIA NIE ZOSTAJE ZAPAMIĘTANY
  const handleSearch = async (queryParams) => {
    setQueryParams(queryParams);
  };

  const { get } = useAxios();
  const {
    data: types,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["types", queryParams],
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
      });
      return get(`/types?${q}`);
    },
    enabled: !!queryParams,
  });

  const onTypeClick = (id) => {
    navigation.navigate("Type", { id });
  };

  if (isLoading) return <Loading message={"Przeszukujemy katalog..."} />;
  if (error) console.log(error.message, queryParams);

  const listHeader = <TypeSearchForm onSubmit={handleSearch} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={types.data}
        renderItem={({ item }) => (
          <TypeCard type={item} onCardClick={onTypeClick} />
        )}
        ListHeaderComponent={listHeader}
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
});
