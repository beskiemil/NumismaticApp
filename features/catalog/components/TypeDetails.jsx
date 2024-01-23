import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import { TypeImage } from "./TypeImage";

export const TypeDetails = ({ type }) => {
  //Wyświetlenie szczegółów okazu
  //Zaleznie od tego, czy dane pochodzą z wewnętrznej bazy danych czy z API Numista, wyświetlany jest inny komponent
  if (type.data.isNumistaType) return <NumistaDetails type={type} />;
  return <NumismaticDetails type={type} />;
};

const NumismaticDetails = ({ type }) => {
  const {
    id,
    title,
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
  } = type.data;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.propertiesWrapper}>
        <View style={styles.imageRow}>
          {obverse && (
            <TypeImage
              pictureUrl={obverse?.picture?.formats?.thumbnail.url}
              pictureCopyright={obverse?.picture?.copyright}
            />
          )}
          {reverse && (
            <TypeImage
              pictureUrl={reverse?.picture?.formats?.thumbnail.url}
              pictureCopyright={obverse?.picture?.copyright}
            />
          )}
        </View>
      </View>
      <View style={styles.propertiesWrapper}>
        {id && (
          <View style={styles.propertyRowWrapper}>
            <View style={styles.propertyNameWrapper}>
              <Text style={styles.propertyNameText}>Numista ID</Text>
            </View>
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>N# {id}</Text>
            </View>
          </View>
        )}
        {series && (
          <View style={styles.propertyRowWrapper}>
            <View style={styles.propertyNameWrapper}>
              <Text style={styles.propertyNameText}>Seria</Text>
            </View>

            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{series}</Text>
            </View>
          </View>
        )}
        {commemorated_topic && (
          <View style={styles.propertyRowWrapper}>
            <View style={styles.propertyNameWrapper}>
              <Text style={styles.propertyNameText}>Upamiętniony temat</Text>
            </View>

            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{commemorated_topic}</Text>
            </View>
          </View>
        )}

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Kategoria</Text>
          </View>
          {category && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{category}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Typ</Text>
          </View>
          {kind && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{kind}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.propertiesWrapper}>
        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Emitent</Text>
          </View>
          {issuer && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{issuer?.name}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Mennice</Text>
          </View>
          {/*  TODO: MOZE BYC WIECEJ MENNIC!!*/}
          {mints && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{mints?.[0].name}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Lata</Text>
          </View>
          {min_year && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>
                {min_year} - {max_year}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.propertiesWrapper}>
        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Wartość</Text>
          </View>
          {value?.text && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{value?.text}</Text>
            </View>
          )}
        </View>
        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Waluta</Text>
          </View>
          {value?.currency?.full_name && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>
                {value?.currency?.full_name}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.propertiesWrapper}>
        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Kształt</Text>
          </View>
          {shape && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{shape}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Skład</Text>
          </View>
          {composition && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{composition}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Waga</Text>
          </View>
          {weight && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{weight} g</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Wymiary</Text>
          </View>
          {size && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{size} mm</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Grubość</Text>
          </View>
          {thickness && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{thickness} mm</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Technika</Text>
          </View>
          {technique && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{technique}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Orientacja</Text>
          </View>
          {orientation && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{orientation}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const NumistaDetails = ({ type }) => {
  const {
    id,
    title,
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
  } = type.data;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.propertiesWrapper}>
        <View style={styles.imageRow}>
          {obverse && (
            <TypeImage
              pictureUrl={obverse.thumbnail}
              pictureCopyright={obverse.picture_opyright}
            />
          )}
          {reverse && (
            <TypeImage
              pictureUrl={reverse.thumbnail}
              pictureCopyright={reverse.pictre_copyright}
            />
          )}
        </View>
      </View>
      <View style={styles.propertiesWrapper}>
        {id && (
          <View style={styles.propertyRowWrapper}>
            <View style={styles.propertyNameWrapper}>
              <Text style={styles.propertyNameText}>Numista ID</Text>
            </View>
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>N# {id}</Text>
            </View>
          </View>
        )}
        {series && (
          <View style={styles.propertyRowWrapper}>
            <View style={styles.propertyNameWrapper}>
              <Text style={styles.propertyNameText}>Seria</Text>
            </View>

            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{series}</Text>
            </View>
          </View>
        )}
        {commemorated_topic && (
          <View style={styles.propertyRowWrapper}>
            <View style={styles.propertyNameWrapper}>
              <Text style={styles.propertyNameText}>Upamiętniony temat</Text>
            </View>

            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{commemorated_topic}</Text>
            </View>
          </View>
        )}

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Kategoria</Text>
          </View>
          {category && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{category}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Typ</Text>
          </View>
          {kind && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{kind}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.propertiesWrapper}>
        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Emitent</Text>
          </View>
          {issuer && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{issuer?.name}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Mennice</Text>
          </View>
          {/*  TODO: MOZE BYC WIECEJ MENNIC!!*/}
          {mints && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{mints?.[0].name}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Lata</Text>
          </View>
          {min_year && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>
                {min_year} - {max_year}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.propertiesWrapper}>
        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Wartość</Text>
          </View>
          {value?.text && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{value?.text}</Text>
            </View>
          )}
        </View>
        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Waluta</Text>
          </View>
          {value.currency?.full_name && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>
                {value.currency?.full_name}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.propertiesWrapper}>
        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Kształt</Text>
          </View>
          {shape && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{shape}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Skład</Text>
          </View>
          {composition?.text && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{composition?.text}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Waga</Text>
          </View>
          {weight && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{weight} g</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Wymiary</Text>
          </View>
          {size && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{size} mm</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Grubość</Text>
          </View>
          {thickness && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{thickness} mm</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Technika</Text>
          </View>
          {technique?.text && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{technique?.text}</Text>
            </View>
          )}
        </View>

        <View style={styles.propertyRowWrapper}>
          <View style={styles.propertyNameWrapper}>
            <Text style={styles.propertyNameText}>Orientacja</Text>
          </View>
          {orientation && (
            <View style={styles.propertyValueWrapper}>
              <Text style={styles.propertyValueText}>{orientation}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 24,
    color: Colors.primary500,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  propertiesWrapper: {
    flexDirection: "column",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  propertyRowWrapper: {
    flexDirection: "row",
    marginVertical: 1,
  },
  propertyNameWrapper: {
    flex: 2,
  },
  propertyValueWrapper: {
    flex: 3,
  },
  propertyNameText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  propertyValueText: {
    fontSize: 14,
  },
});
