import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const useChangePassword = () => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (data) =>
      await axiosInstance
        .post("/auth/change-password", data)
        .then((res) => res.data),
  });
};

export default useChangePassword;
