import { useContext, useMemo } from "react";
import { AuthContext } from "../features/authentication";
import axios from "axios";
import Colors from "../constants/colors";
import Toast from "react-native-root-toast";

const useAxios = () => {
  //hook zwracający instancję axiosa z uwzględnieniem tokenu jwt
  //dzięki temu nie musimy za każdym razem pisać nagłówka z tokenem
  //instancja jest memoizowana, więc nie tworzy się za każdym razem od nowa, jednynie gdy zmieni się token
  const { isAuthenticated, token, logout } = useContext(AuthContext);
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
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        let toast = Toast.show("Sesja wygasła, zaloguj się ponownie", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP + 100,
          backgroundColor: Colors.danger500,
          shadow: false,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        console.log("Session expired. Logged out.");
        logout();
      }
      return Promise.reject(error);
    },
  );

  return { axiosInstance };
};

export default useAxios;
