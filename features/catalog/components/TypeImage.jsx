import { Image, Text, View, StyleSheet } from "react-native";

export const TypeImage = ({ pictureUrl, pictureCopyright }) => (
  <View style={styles.imageWrapper}>
    <Image
      source={{
        uri: pictureUrl,
      }}
      style={styles.img}
    />
    {pictureCopyright && (
      <Text style={styles.copyright}>&copy; {pictureCopyright}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: "center",
  },
  copyright: {
    color: "white",
    fontSize: 10,
  },
  img: {
    width: 140,
    height: 140,
  },
});
