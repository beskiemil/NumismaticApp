import axios from "axios";

const loginURL = `${process.env.EXPO_PUBLIC_API_URL}/auth/local`;
const signupURL = `${process.env.EXPO_PUBLIC_API_URL}/auth/local/register`;

export const signup = async (username, email, password) => {
  return await axios.post(signupURL, {
    username,
    email,
    password,
  });
};

export const login = async (identifier, password) => {
  return await axios.post(loginURL, {
    identifier,
    password,
  });
};
