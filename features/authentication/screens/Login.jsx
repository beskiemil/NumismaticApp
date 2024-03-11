import { AuthContent, AuthContext } from "../index";
import { login } from "../../../util/auth";
import Loading from "../../../screens/Loading";
import { useContext, useLayoutEffect, useState } from "react";
import { showToast } from "../../../helpers/showToast";

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
        authContext.authenticate(res.data.jwt, res.data.user);
        setIsLoading(false);
        showToast({ message: "Zalogowano pomyślnie!", type: "success" });
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        showToast({ message: "Błąd logowania", type: "error" });
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
