import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const useChangePassword = () => {
  const { post } = useAxios();
  return useMutation({
    mutationFn: async (data) => await post("/auth/change-password", data),
  });
};

export default useChangePassword;
