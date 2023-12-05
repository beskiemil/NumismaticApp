import { useContext } from "react";
import { AuthContext } from "../features/authentication";
import axios from "axios";

const useAxios = () => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: isAuthenticated ? `Bearer ${token}` : "",
    },
  });

  const get = async (path, data) => {
    const response = await instance.get(path, data);
    return response.data;
  };
  const post = async (path, data) => {
    const response = await instance.post(path, data);
    return response.data;
  };
  const del = async (path) => {
    const response = await instance.delete(path);
    return response.data;
  };

  return { get, post, del, instance };
};

export default useAxios;
