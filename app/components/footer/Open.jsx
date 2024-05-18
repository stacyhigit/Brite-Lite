import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

import { containerFooter } from "../../constants/styles";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";

export default function Open({ board }) {
  const navigation = useNavigation();

  return (
    <MaterialCommunityIconsComponent
      onPress={() => navigation.navigate("OpenScreen", { boardId: board.id })}
      containerStyle={containerFooter}
      icon={{ name: "folder-open-outline", size: 28, color: "white" }}
    />
  );
}

Open.propTypes = {
  board: PropTypes.object,
};
