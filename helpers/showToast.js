import Toast from "react-native-root-toast";
import Colors from "../constants/colors";

export const showToast = ({ message, type }) => {
  const bgcolor = () => {
    switch (type) {
      case "success":
        return Colors.success500;
      case "error":
        return Colors.danger500;
      default:
        return Colors.primary500;
    }
  };
  let toast = Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP + 100,
    backgroundColor: bgcolor(),
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 0.9,
  });
};
