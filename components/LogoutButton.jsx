import IconButton from "./IconButton";
import { useContext } from "react";
import { AuthContext } from "../features/authentication/";

export const LogoutButton = ({ size, color }) => {
  const authContext = useContext(AuthContext);
  return (
    <IconButton
      iconFamily={"MaterialIcons"}
      name={"logout"}
      size={size}
      color={color}
      onPress={authContext.logout}
    />
  );
};
