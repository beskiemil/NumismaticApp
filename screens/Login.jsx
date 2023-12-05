import AuthContent from "../components/authentication/AuthContent";
import { login } from "../util/auth";
import Loading from "./Loading";
import { useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "../store/authContext";

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Zaloguj się",
    });
  }, [navigation]);

  const authContext = useContext(AuthContext);
  const loginHandler = async ({ identifier, password }) => {
    setIsLoading(true);
    setErrorMessage(null);
    login(identifier, password)
      .then((res) => {
        console.log(`Authenticating: ${res.data.user}`);
        authContext.authenticate(res.data.jwt, res.data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
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

  if (isLoading) return <Loading message={"Sprawdzamy dane logowania..."} />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default Login;
