import { AddItemForm } from "../components/AddItemForm";
import useAxios from "../../../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../authentication";
import { useContext } from "react";
import { createItemFormData } from "../helpers/createItemFormData";
import { TypeCard } from "../../catalog/components/TypeCard";
import { ScrollScreen } from "../../../components/screen";

export const AddItem = ({ navigation, route }) => {
  const { type } = route.params;
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  const { mutateAsync: addItem } = useMutation({
    mutationFn: async (formData) =>
      await axiosInstance.post("/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const { user } = useContext(AuthContext);
  const handleFormSubmit = async (values) => {
    values.user = user.id;
    const formData = createItemFormData(values, user, type);
    try {
      await addItem(formData);
      navigation.popToTop();
      navigation.navigate("CollectionRoot", {
        screen: "Items",
        initial: false,
        params: { user },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollScreen>
      {type && (
        <>
          <TypeCard type={type} />
          <AddItemForm type={type} onSubmit={handleFormSubmit} />
        </>
      )}
    </ScrollScreen>
  );
};
