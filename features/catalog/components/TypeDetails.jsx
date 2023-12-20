import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";

export const TypeDetails = ({ type }) => {
  const { id } = type;
  const {
    title,
    numista_id,
    commemorated_topic,
    series,
    issuer,
    mints,
    min_year,
    max_year,
    category,
    type: kind,
    value,
    shape,
    composition,
    weight,
    size,
    thickness,
    technique,
    orientation,
    reverse,
    obverse,
    edge,
    watermark,
  } = type?.attributes;

  console.log(value);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.imageRow}>
        {obverse && (
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: obverse?.picture?.data?.attributes?.formats?.thumbnail.url,
              }}
              style={styles.img}
            />
            <Text style={styles.copyrightText}>
              &copy; {obverse.picture_copyright}
            </Text>
          </View>
        )}
        {reverse && (
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: reverse?.picture?.data?.attributes?.formats?.thumbnail.url,
              }}
              style={styles.img}
            />
            <Text style={styles.copyrightText}>
              &copy; {obverse.picture_copyright}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.propertiesWrapper}>
        {numista_id && (
          <View style={styles.propertyRow}>
            <View style={styles.leftCell}>
              <Text style={styles.propertyNameText}>Numista ID</Text>
            </View>
            <View style={styles.rightCell}>
              <Text style={styles.propertyValueText}>N# {numista_id}</Text>
            </View>
          </View>
        )}

        <View style={styles.propertyRow}>
          <View style={styles.leftCell}>
            <Text style={styles.propertyNameText}>Upamiętniony temat</Text>
          </View>
          {commemorated_topic && (
            <View style={styles.rightCell}>
              <Text style={styles.propertyValueText}>{commemorated_topic}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRow}>
          <View style={styles.leftCell}>
            <Text style={styles.propertyNameText}>Seria</Text>
          </View>
          {series && (
            <View style={styles.rightCell}>
              <Text style={styles.propertyValueText}>{commemorated_topic}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRow}>
          <View style={styles.leftCell}>
            <Text style={styles.propertyNameText}>Emitent</Text>
          </View>
          {issuer && (
            <View style={styles.rightCell}>
              <Text style={styles.propertyValueText}>
                {issuer?.data.attributes.name}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRow}>
          <View style={styles.leftCell}>
            <Text style={styles.propertyNameText}>Mennice</Text>
          </View>
          {/*  TODO: MOZE BYC WIECEJ MENNIC!!*/}
          {mints && (
            <View style={styles.rightCell}>
              <Text style={styles.propertyValueText}>
                {mints?.data[0]?.attributes.name}
              </Text>
            </View>
          )}
        </View>

        {/*<View style={styles.propertyRow}>*/}
        {/*  <View style={styles.leftCell}>*/}
        {/*    <Text style={styles.propertyNameText}>Wartość</Text>*/}
        {/*  </View>*/}
        {/*  {value && (*/}
        {/*    <View style={styles.rightCell}>*/}
        {/*      <Text style={styles.propertyValueText}>{value?.text}</Text>*/}
        {/*    </View>*/}
        {/*  )}*/}
        {/*</View>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  titleWrapper: {
    marginBottom: 10,
    width: "100%",
  },
  titleText: {
    fontSize: 24,
    color: Colors.primary500,
  },
  imageRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageWrapper: {
    alignItems: "center",
  },
  copyrightText: {
    fontSize: 10,
  },
  img: {
    width: 140,
    height: 140,
  },
  propertiesWrapper: {
    marginTop: 20,
  },
  propertyRow: {
    flexDirection: "row",
  },
  leftCell: {
    minWidth: "40%",
    flexDirection: "row",
  },
  rightCell: {
    flexDirection: "row",
  },
  propertyNameText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  propertyValueText: {
    fontSize: 14,
  },
});
