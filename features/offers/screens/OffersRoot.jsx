import { StyleSheet, View } from "react-native";
import PrimaryButton from "../../../components/PrimaryButton";
import {
  InfoBanner,
  InfoBannerContent,
  InfoBannerTitle,
} from "../components/InfoBanner";
import { useContext } from "react";
import { AuthContext } from "../../authentication";

export const OffersRoot = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  console.log(navigation.getState());
  return (
    <View style={styles.container}>
      <InfoBanner>
        <InfoBannerTitle>Dodawanie ofert</InfoBannerTitle>
        {/* eslint-disable-next-line react-native/no-raw-text */}
        <InfoBannerContent>
          W Numismatic możesz dodawać oferty monet i banknotów, na przykład te,
          które widziałeś na targach numizmatycznych, w skupie monet lub w
          internecie. Inni użytkownicy będą mogli zobaczyć, jakie są aktualne
          ceny ich ulubionych numizmatów na rynku.
        </InfoBannerContent>
      </InfoBanner>
      <PrimaryButton
        text={"Moje oferty"}
        onPress={() => navigation.navigate("Offers", { user })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
