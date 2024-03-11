import { useState } from "react";
import { TypesList } from "../components/TypesList";
import { Screen } from "../../../components/screen";
import { showToast } from "../../../helpers/showToast";

export const Types = ({ route, navigation }) => {
  const [queryParams, setQueryParams] = useState(route.params?.searchParams);
  showToast({ message: "Witaj w katalogu monet!", type: "danger" });
  //funkcja która wywołuje się po naciśnięciu na kartę okazu, przenosi do ekranu Type i przekazuje parametry okazu
  const onTypeClick = ({ isNumistaType, id, numista_id }) => {
    navigation.navigate("Type", { isNumistaType, id, numista_id });
  };

  return (
    <Screen>
      <TypesList queryParams={queryParams} onTypeClick={onTypeClick} />
    </Screen>
  );
};
