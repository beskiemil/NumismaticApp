import axios from "axios";

const loginURL = `${process.env.EXPO_PUBLIC_API_URL}/auth/local`;
const signupURL = `${process.env.EXPO_PUBLIC_API_URL}/auth/local/register`;

export const signup = async (username, email, password) => {
  try {
    return await axios.post(signupURL, {
      username,
      email,
      password,
    });
  } catch (err) {
    if (err.response) {
      console.error("Signup response error: ", err.response);
      if (
        err.response.data.error.message ===
        "Email or Username are already taken"
      )
        return Promise.reject(new Error("Nazwa lub e-mail są już zajęte"));
      return Promise.reject(new Error(err.response.data.error.message));
    } else if (err.request) {
      console.error("Signup request error: ", err.request);
      return Promise.reject(new Error("Błąd połączenia"));
    } else {
      console.error("Signup error: ", err.message);
      return Promise.reject(new Error(`Błąd ${err.message}`));
    }
  }
};

export const login = async (identifier, password) => {
  try {
    return await axios.post(loginURL, {
      identifier,
      password,
    });
  } catch (err) {
    if (err.response) {
      console.error("Login response error: ", err.response);
      if (err.response.data.error.message === "Invalid identifier or password")
        return Promise.reject(new Error("Nieprawidłowe dane logowania"));
      else if (
        err.response.data.error.message ===
        "Your account email is not confirmed"
      )
        return Promise.reject(new Error("Niepotwierdzony adres e-mail"));
      else return Promise.reject(new Error(err.response.data.error.message));
    } else if (err.request) {
      console.error("Request error: ", err.request);
      return Promise.reject(new Error("Błąd połączenia"));
    } else {
      console.error(err.data.error.message);
      return Promise.reject(new Error(`Błąd ${err.data.error.message}`));
    }
  }
};
