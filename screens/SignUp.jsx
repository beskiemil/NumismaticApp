import { useContext, useLayoutEffect, useState } from "react";
import { signup } from "../util/auth";
import Loading from "./Loading";
import { AuthContent, AuthContext } from "../features/authentication/index";

const SignUp = ({ navigation }) => {
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

  if (isLoading) return <Loading requestError={errorMessage} />;

  return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignUp;
