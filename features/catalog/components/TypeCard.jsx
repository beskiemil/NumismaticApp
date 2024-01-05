import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import { useCallback } from "react";

export const TypeCard = ({ type, onCardClick }) => {
  const { id } = type;
  const {
    title,
    numista_id,
    issuer,
    reverse,
    obverse,
    type: kind,
    series,
    composition,
    weight,
    size,
  } = type?.attributes;

  const handleCardClick = useCallback(() => {
    onCardClick(id);
  }, [id, onCardClick]);

  return (
    <Pressable onPress={handleCardClick}>
      <View style={styles.card}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.imageRow}>
          {obverse && (
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: obverse?.picture?.data?.attributes?.formats?.thumbnail
                    .url,
                }}
                style={styles.img}
              />
              <Text style={styles.copyright}>
                &copy; {obverse.picture_copyright}
              </Text>
            </View>
          )}
          {reverse && (
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: reverse?.picture?.data?.attributes?.formats?.thumbnail
                    .url,
                }}
                style={styles.img}
              />
              <Text style={styles.copyright}>
                &copy; {obverse.picture_copyright}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.propertiesWrapper}>
          {numista_id && (
            <Text style={styles.propertyText}>Numista ID: N#{numista_id}</Text>
          )}
          <Text style={styles.propertyText}>
            {issuer?.data?.attributes?.name}
          </Text>
          <Text style={styles.propertyText}>
            {kind}
            {series && ": " + series}
          </Text>
          <Text style={styles.propertyText}>
            {composition}
            {weight && ", " + weight + " g"}
            {size && ", " + size + " mm"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary500,
    gap: 5,
    minHeight: 250,
    borderRadius: 15,
    padding: 25,
  },
  title: {
    color: "white",
    fontSize: 24,
  },
  imageRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
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
  propertiesWrapper: {
    gap: 2,
  },
  propertyText: {
    color: "white",
  },
});
