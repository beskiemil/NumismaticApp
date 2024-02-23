import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export const CoinImage = ({ url, copyright, copyrightUrl }) => {
  return (
    <>
      <View style={styles.imgContainer}>
        <Image source={{ uri: url }} style={styles.img} />
      </View>
      {copyright && (
        <Text style={styles.pictureCopyright}>
          Copyright &copy; {copyright}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    borderWidth: 2,
    borderColor: Colors.primary500,
    borderRadius: 5,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    aspectRatio: 1,
  },
  pictureCopyright: {
    fontSize: 10,
    color: "grey",
  },
});
