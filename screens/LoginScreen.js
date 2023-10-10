import AuthContent from "../components/Authentication/AuthContent";
import { login } from "../util/auth";
import LoadingScreen from "./LoadingScreen";
import { useContext, useState } from "react";
import { AuthContext } from "../store/authContext";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const authContext = useContext(AuthContext);
  const loginHandler = async ({ identifier, password }) => {
    setIsLoading(true);
    setErrorMessage(null);
    login(identifier, password)
      .then((res) => {
        authContext.authenticate(res.data.jwt, res.data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.error.name === "ValidationError")
            setErrorMessage("Nieprawidłowe dane logowania");
          else setErrorMessage(err.response.error.message);
          console.error(err.response);
        } else if (err.request) {
          setErrorMessage("Błąd połączenia");
          console.error(err.request);
        } else {
          setErrorMessage(`Błąd ${err.message}`);
          console.error(err.message);
        }
        setIsLoading(false);
      });
  };

  if (errorMessage)
    return (
      <AuthContent
        isLogin
        onAuthenticate={loginHandler}
        requestError={errorMessage}
      />
    );

  if (isLoading)
    return <LoadingScreen message={"Sprawdzamy dane logowania..."} />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
