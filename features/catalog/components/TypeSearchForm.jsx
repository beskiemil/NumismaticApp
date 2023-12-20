import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import ControlledInput from "../../../components/ui/ControlledInput";
import PrimaryButton from "../../../components/PrimaryButton";
import useAxios from "../../../hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../screens/Loading";
import { useEffect, useState } from "react";

export const TypeSearchForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchQuery: "",
      issuer: "",
      mint: "",
    },
  });

  return (
    <View style={styles.container}>
      <ControlledInput
        control={control}
        name={"searchQuery"}
        placeholder={"Wyszukaj..."}
      />
      <PrimaryButton text={"Wyszukaj"} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
});
