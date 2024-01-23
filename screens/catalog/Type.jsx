import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import * as qs from "qs";
import Loading from "../Loading";
import { ScrollView, StyleSheet } from "react-native";
import { TypeDetails } from "../../features/catalog";

export const Type = ({ navigation, route }) => {
  const { isNumistaType, id, numista_id } = route.params;
  const { axiosInstance } = useAxios();

  //pobranie szczegółów okazu z API
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
        return await axiosInstance
          .get(`/types/${numista_id}?isNumistaType=${isNumistaType}`)
          .then((res) => res.data);
      return await axiosInstance
        .get(`/types/${id}?${q}`)
        .then((res) => res.data);
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
