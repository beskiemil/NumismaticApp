import { Pressable, StyleSheet, Text, View } from "react-native";
import SimpleTextInput from "../components/SimpleTextInput";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";
import AuthContent from "../components/Authentication/AuthContent";

const LoginScreen = ({ navigation }) => {
  return <AuthContent isLogin />;
};

export default LoginScreen;
