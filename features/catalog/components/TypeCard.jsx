import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import { useCallback } from "react";

export const TypeCard = ({ type, onCardClick }) => {
  const { id } = type;
  const {
    title,
    numista_id,
    reverse,
    obverse,
    category,
    series,
    commemorated_topic,
    min_year,
    max_year,
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
            <View>
              <Text style={styles.text}>Numista ID: N#{numista_id}</Text>
            </View>
          )}
          <Text style={styles.text}>Kategoria: {category}</Text>
          {commemorated_topic && (
            <>
              <Text style={styles.text}>Wydanie okolicznościowe</Text>
              <Text style={styles.text}>Seria: {series}</Text>
            </>
          )}
          <Text style={styles.text}>
            Lata emisji: {min_year} - {max_year}
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
    opacity: 0.9,
  },
  titleWrapper: {
    flexDirection: "row",
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontSize: 24,
  },
  imageRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
    gap: 5,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
  },
});
