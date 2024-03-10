import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import * as qs from "qs";
import Loading from "../../../screens/Loading";
import { ScrollView, StyleSheet } from "react-native";
import { TypeDetails } from "../components/TypeDetails";
import PrimaryButton from "../../../components/PrimaryButton";

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

  const handleAddToCollection = () => {
    navigation.navigate("CollectionRoot", {
      screen: "AddItem",
      initial: false,
      params: { type: type.data },
    });
  };

  const handleAddOffer = () => {
    navigation.navigate("OffersRoot", {
      screen: "AddOffer",
      initial: false,
      params: { type: type.data },
    });
  };

  if (isLoading) return <Loading message={"Ładowanie..."} />;
  if (error) console.log("id: ", id, "error: ", error);

  if (isSuccess)
    return (
      <ScrollView
        contentContainerStyle={styles.view}
        alwaysBounceVertical={false}
      >
        <TypeDetails type={type.data} />
        <PrimaryButton
          text={"Dodaj do kolekcji"}
          onPress={handleAddToCollection}
        />
        <PrimaryButton
          text={"Dodaj ofertę innego sprzedawcy"}
          onPress={handleAddOffer}
        />
      </ScrollView>
    );
};
export default Type;

const styles = StyleSheet.create({
  view: {
    padding: 20,
    gap: 10,
  },
});
