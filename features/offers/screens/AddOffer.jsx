import { AddOfferForm } from "../components/AddOfferForm";
import { AddItemForm } from "../../collection/components/AddItemForm";
import useAxios from "../../../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../authentication";
import { useContext, useMemo } from "react";
import { ItemCard } from "../../collection";
import qs from "qs";
import { createItemFormData } from "../../collection/helpers/createItemFormData";
import { ScrollScreen } from "../../../components/screen";

export const AddOffer = ({ navigation, route }) => {
  const item = useMemo(
    () => route?.params?.entity?.item || null,
    [route?.params?.entity],
  );
  const type = useMemo(
    () => route?.params?.entity?.type || null,
    [route?.params?.entity],
  );
  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();
  const { mutateAsync: addItem } = useMutation({
    mutationFn: async (formData) => {
      const q = qs.stringify({
        populate: ["obverse", "reverse", "type"],
      });
      return await axiosInstance.post(`/items?${q}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const { user } = useContext(AuthContext);
  const handleAddItem = async (values) => {
    const formData = createItemFormData(values, user, type);
    try {
      const newItem = await addItem(formData).then((res) => res.data);
      route.params.item = { ...newItem.data, type };
    } catch (err) {
      console.log(err);
    }
  };

  const { mutateAsync: addOffer } = useMutation({
    mutationFn: async ({
      item,
      trader_type,
      trader,
      trader_description,
      trader_location,
      price,
      finished,
      description,
    }) => {
      return await axiosInstance.post("/offers", {
        data: {
          ...(item && { item: item.id }),
          trader_type,
          trader,
          trader_description,
          trader_location,
          price,
          finished,
          description,
        },
      });
    },
    onError: (err) => {
      console.error(err);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
  });

  const handleAddOffer = async (values) => {
    try {
      await addOffer(values);
      navigation.navigate("OffersRoot", {
        screen: "Offers",
        initial: false,
        params: { user },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollScreen>
      {!item && type && <AddItemForm type={type} onSubmit={handleAddItem} />}
      {item && <ItemCard item={item} />}
      {item && (
        <AddOfferForm item={item} user={user} onSubmit={handleAddOffer} />
      )}
    </ScrollScreen>
  );
};
