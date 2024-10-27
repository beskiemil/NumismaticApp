import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export const CoinImage = ({ url, copyright, copyrightUrl }) => {
  return (
    <View style={styles.wrapper}>
      <Image source={{ uri: url }} style={styles.img} resizeMode={"contain"} />

      {copyright && (
        <Text style={styles.pictureCopyright}>
          Copyright &copy; {copyright}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  img: {
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: Colors.primary500,
    borderRadius: 5,
    overflow: "hidden",
  },
  pictureCopyright: {
    fontSize: 10,
    color: "grey",
  },
});
