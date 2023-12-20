import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import * as qs from "qs";
import Loading from "../Loading";
import { ScrollView, StyleSheet, View } from "react-native";
import { TypeDetails } from "../../features/catalog";

export const Type = ({ navigation, route }) => {
  const { id } = route.params;
  const { get } = useAxios();

  const {
    data: { data: type },
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["type", { id }],
    queryFn: async () => {
      const q = qs.stringify({
        populate: [
          "obverse",
          "obverse.picture",
          "reverse",
          "reverse.picture",
          "edge",
          "edge.picture",
          "watermark",
          "watermark.picture",
          "issuer",
          "mints",
          "value",
        ],
      });
      console.log(q);
      return await get(`/types/${id}?${q}`);
    },
    initialData: { data: {}, meta: {} },
    enabled: !!id,
  });

  if (isLoading) return <Loading message={"Ładowanie..."} />;
  if (error) console.log("id: ", id, "error: ", error);

  if (isSuccess)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TypeDetails type={type} />
      </ScrollView>
    );
};
export default Type;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
