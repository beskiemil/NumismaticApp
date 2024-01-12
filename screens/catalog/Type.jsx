import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import * as qs from "qs";
import Loading from "../Loading";
import { ScrollView, StyleSheet } from "react-native";
import { TypeDetails } from "../../features/catalog";

export const Type = ({ navigation, route }) => {
  const { isNumistaType, id, numista_id } = route.params;
  const { get } = useAxios();

  const {
    data: type,
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
          "value.currency",
        ],
      });
      if (isNumistaType)
        return await get(`/types/${numista_id}?isNumistaType=${isNumistaType}`);
      return await get(`/types/${id}?${q}`);
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading message={"Ładowanie..."} />;
  if (error) console.log("id: ", id, "error: ", error);

  if (isSuccess)
    return (
      <ScrollView style={styles.view} alwaysBounceVertical={false}>
        <TypeDetails type={type} />
      </ScrollView>
    );
};
export default Type;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
  },
});
