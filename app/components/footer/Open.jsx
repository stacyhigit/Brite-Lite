import { useNavigation } from "@react-navigation/native";

import { containerFooter } from "../../constants/styles";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";

export default function Open() {
  const navigation = useNavigation();

  return (
    <MaterialCommunityIconsComponent
      onPress={() => navigation.navigate("OpenScreen")}
      containerStyle={containerFooter}
      icon={{ name: "folder-open-outline", size: 28, color: "white" }}
    />
  );
}
