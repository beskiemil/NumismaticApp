import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import * as qs from "qs";
import { useState } from "react";
import Pagination from "../../../components/Pagination";
import Loading from "../../../screens/Loading";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import { TypeCard } from "./TypeCard";

export const TypesList = ({ queryParams, onTypeClick }) => {
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
  return (
    <>
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
        />
      )}
      {types && types.data.length === 0 && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>
            Nie znaleziono okazów spełniających podane kryteria
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
