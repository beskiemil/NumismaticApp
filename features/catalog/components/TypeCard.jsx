import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import { TypeImage } from "./TypeImage";
import { useCallback } from "react";
export const TypeCard = ({ type, onCardClick }) => {
  const {
    id,
    numista_id,
    title,
    isNumistaType,
    issuer,
    reverse,
    obverse,
    category,
    min_year,
    max_year,
    obverse_thumbnail,
    reverse_thumbnail,
  } = type;

  const handleCardClick = useCallback(() => {
    onCardClick({ isNumistaType, id, numista_id });
  }, [id, onCardClick, isNumistaType, numista_id]);

  return (
    <Pressable onPress={handleCardClick}>
      <View style={styles.card}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.imageRow}>
          {isNumistaType && obverse_thumbnail && (
            <TypeImage pictureUrl={obverse_thumbnail} />
          )}
          {isNumistaType && reverse_thumbnail && (
            <TypeImage pictureUrl={reverse_thumbnail} />
          )}
          {!isNumistaType && obverse && (
            <TypeImage
              pictureUrl={obverse?.picture?.formats?.thumbnail.url}
              pictureCopyright={obverse?.picture?.copyright}
            />
          )}
          {!isNumistaType && reverse && (
            <TypeImage
              pictureUrl={reverse?.picture?.formats?.thumbnail.url}
              pictureCopyright={obverse?.picture?.copyright}
            />
          )}
        </View>
        <View style={styles.propertiesWrapper}>
          {numista_id && (
            <Text style={styles.propertyText}>Numista ID: N#{numista_id}</Text>
          )}
          <Text style={styles.propertyText}>Emitent: {issuer?.name}</Text>
          <Text style={styles.propertyText}>Kategoria: {category}</Text>
          <Text style={styles.propertyText}>
            Produkcja: {min_year} - {max_year}
          </Text>
          {/*<Text style={styles.propertyText}>*/}
          {/*  {composition}*/}
          {/*  {weight && ", " + weight + " g"}*/}
          {/*  {size && ", " + size + " mm"}*/}
          {/*</Text>*/}
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
  propertiesWrapper: {
    gap: 2,
  },
  propertyText: {
    color: "white",
  },
});
