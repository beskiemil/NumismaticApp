import { StyleSheet } from "react-native";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import {
  InfoBanner,
  InfoBannerContent,
  InfoBannerTitle,
} from "../components/InfoBanner";
import { useContext } from "react";
import { AuthContext } from "../../authentication";
import { Screen } from "../../../components/screen";

export const OffersRoot = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  console.log(navigation.getState());
  return (
    <Screen style={styles.container}>
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
  },
});
