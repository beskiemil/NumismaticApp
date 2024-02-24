import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { TypeCard } from "../components/TypeCard";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../../../screens/Loading";
import * as qs from "qs";
import Pagination from "../../../components/ui/Pagination";
import Colors from "../../../constants/colors";

export const Types = ({ route, navigation }) => {
  const [queryParams, setQueryParams] = useState(route.params?.searchParams);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { axiosInstance } = useAxios();

  //pobranie listy okazów z API
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

  //funkcja która wywołuje się po naciśnięciu na kartę okazu, przenosi do ekranu Type i przekazuje parametry okazu
  const onTypeClick = ({ isNumistaType, id, numista_id }) => {
    navigation.navigate("Type", { isNumistaType, id, numista_id });
  };

  //komponent wyświetlany podczas ładowania danych
  if (isLoading) return <Loading message={"Przeszukujemy katalog..."} />;
  if (error) console.log(error.message, queryParams);

  //komponent paginacji
  const paginationComponent =
    (types?.meta?.pagination?.pageCount > 1 && (
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        pageCount={types?.meta?.pagination?.pageCount}
      />
    )) ||
    null;

  console.log(JSON.stringify(types));

  return (
    <View style={styles.container}>
      {types && types.data.length > 0 && (
        //wyświetlenie dynamicznej listy okazów
        <FlatList
          data={types.data}
          renderItem={({ item: type, index }) => (
            //wyświetlenie karty okazu

            <View
              style={[
                { borderColor: Colors.primary400 },
                // eslint-disable-next-line react-native/no-inline-styles
                index < types.data.length - 1 && {
                  borderBottomWidth: 2,
                  paddingBottom: 20,
                  marginBottom: 20,
                },
              ]}
            >
              <Pressable
                onPress={() =>
                  onTypeClick({
                    isNumistaType: type.isNumistaType,
                    id: type.id,
                    numista_id: type.numista_id,
                  })
                }
              >
                <TypeCard type={type} />
              </Pressable>
            </View>
          )}
          ListHeaderComponent={
            <View style={styles.listHeaderContainer}>
              {paginationComponent}
            </View>
          }
          ListFooterComponent={
            <View style={styles.listFooterContainer}>
              {paginationComponent}
            </View>
          }
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.innerContainer}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
  },
  listHeaderContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  listFooterContainer: {
    alignItems: "center",
    marginTop: 20,
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
