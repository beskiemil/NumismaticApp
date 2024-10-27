import { ScrollScreen } from "../../../components/screen";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { OfferDetails } from "../components/OfferDetails";
import Loading from "../../../screens/Loading";
import { Text } from "react-native";

export const Offer = ({ navigation, route }) => {
  const { id: offerId } = route.params;
  const { axiosInstance } = useAxios();
  const {
    data: offer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: async () => {
      const q = qs.stringify({
        populate: [
          "item",
          "item.user",
          "item.obverse",
          "item.reverse",
          "item.obverse.picture",
          "item.reverse.picture",
          "item.type",
          "item.type.obverse",
          "item.type.reverse",
          "item.type.edge",
          "item.type.watermark",
          "item.type.obverse.picture",
          "item.type.reverse.picture",
          "item.type.edge.picture",
          "item.type.watermark.picture",
          "item.type.issuer",
          "item.type.mints",
          "item.type.value",
          "item.type.value.currency",
        ],
      });
      return await axiosInstance
        .get(`/offers/${offerId}?${q}`)
        .then((res) => res.data);
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <Text>Error: {error.message}</Text>;

  console.log(offer);

  return (
    <ScrollScreen>
      <OfferDetails offer={offer?.data} />
    </ScrollScreen>
  );
};
