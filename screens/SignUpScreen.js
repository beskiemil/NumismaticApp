import { useState } from "react";
import { signup } from "../util/auth";
import LoadingScreen from "./LoadingScreen";
import AuthContent from "../components/Authentication/AuthContent";

const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const signUpHandler = async ({ username, email, password }) => {
    setIsLoading(true);
    signup(username, email, password)
      .then((res) => {
        console.log("Dane:");
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          if (
            err.response.data.error.message ===
            "Email or Username are already taken"
          )
            setErrorMessage("Nazwa lub e-mail są już zajęte");
          else setErrorMessage(err.response.data.error.message);
          console.log(err.response);
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

  if (isLoading) return <LoadingScreen requestError={errorMessage} />;

  return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignUpScreen;
