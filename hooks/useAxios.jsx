import { useContext, useMemo } from "react";
import { AuthContext } from "../features/authentication";
import axios from "axios";

const useAxios = () => {
  //hook zwracający instancję axiosa z uwzględnieniem tokenu jwt
  //dzięki temu nie musimy za każdym razem pisać nagłówka z tokenem
  //instancja jest memoizowana, więc nie tworzy się za każdym razem od nowa, jednynie gdy zmieni się token
  const { isAuthenticated, token } = useContext(AuthContext);
  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: process.env.EXPO_PUBLIC_API_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: isAuthenticated ? `Bearer ${token}` : "",
        },
      }),
    [isAuthenticated, token],
  );

  return { axiosInstance };
};

export default useAxios;
