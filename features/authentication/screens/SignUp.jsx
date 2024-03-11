import { useContext, useLayoutEffect, useState } from "react";
import { signup } from "../../../util/auth";
import Loading from "../../../screens/Loading";
import { AuthContent, AuthContext } from "../index";
import { showToast } from "../../../helpers/showToast";

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
    await signup(username, email, password)
      .then((res) => {
        // go to email confirmation message screen
        setIsLoading(false);
        showToast({ message: "Zarejestrowano pomyślnie!", type: "success" });
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        showToast({ message: err.message, type: "error" });
      });
  };

  if (isLoading) return <Loading requestError={errorMessage} />;

  return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignUp;
