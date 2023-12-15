import { ScrollView, StyleSheet, Text } from "react-native";
import { TypeSearchForm, TypesList } from "../../features/catalog/";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../Loading";

const initialQueryParams = {
  searchQuery: "",
  mint: "",
  issuer: "",
};
const Types = ({ route, navigation }) => {
  const [queryParams, setQueryParams] = useState(route.params?.searchParams);
  const handleSearch = (queryParams) => {
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
      const q = searchQuery ? `q=${searchQuery}` : "";
      return get(`/types/?${q}`);
    },
    enabled: !!queryParams,
  });

  if (isLoading) return <Loading message={"Przeszukujemy katalog..."} />;
  if (error) console.log(error, queryParams);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={"handled"}
      keyboardDismissMode={"on-drag"}
      bounces={false}
    >
      <TypeSearchForm onSubmit={handleSearch} />
      <TypesList types={types} />
    </ScrollView>
  );
};

export default Types;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 20,
  },
});
