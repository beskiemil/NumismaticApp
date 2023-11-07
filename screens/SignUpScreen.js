import { useContext, useLayoutEffect, useState } from "react";
import { signup } from "../util/auth";
import LoadingScreen from "./LoadingScreen";
import AuthContent from "../components/authentication/AuthContent";
import { AuthContext } from "../store/authContext";

const SignUpScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Zarejestruj się",
    });
  }, [navigation]);

  const authContext = useContext(AuthContext);
  const signUpHandler = async ({ username, email, password }) => {
    setIsLoading(true);
    signup(username, email, password)
      .then((res) => {
        // go to email confirmation message screen
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
      });
  };

  if (isLoading) return <LoadingScreen requestError={errorMessage} />;

  return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignUpScreen;
