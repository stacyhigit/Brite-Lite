import { Image, Pressable, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";
import { thumbnailWidth } from "../../constants/values";
import { thumbnail } from "../../constants/styles";

export default function Thumbnail({
  board,
  handlePress,
  showCheckboxes,
  setShowCheckboxes,
  addCheck,
  checkedList,
}) {
  const imageHeight =
    board.columnCount > 0
      ? (board.rowCount * thumbnailWidth) / board.columnCount
      : 200;

  const handleLongPress = () => {
    setShowCheckboxes(true);
    addCheck(board.id);
  };

  return (
    <Pressable onPress={handlePress} onLongPress={handleLongPress}>
      <Image
        source={{
          uri: board.imagePath,
        }}
        style={[
          thumbnail,
          {
            height: imageHeight,
            width: thumbnailWidth,
          },
        ]}
        resizeMode="contain"
      />
      {showCheckboxes && !checkedList.has(board.id) && (
        <MaterialCommunityIconsComponent
          icon={{
            name: "checkbox-blank-circle-outline",
            size: 20,
            color: "white",
          }}
          containerStyle={styles.blankIcon}
        />
      )}
      {showCheckboxes && checkedList.has(board.id) && (
        <MaterialCommunityIconsComponent
          icon={{ name: "check-circle", size: 20, color: "black" }}
          containerStyle={styles.checkedIcon}
        />
      )}
    </Pressable>
  );
}

Thumbnail.propTypes = {
  board: PropTypes.object,
  handlePress: PropTypes.func,
  showCheckboxes: PropTypes.bool,
  setShowCheckboxes: PropTypes.func,
  addCheck: PropTypes.func,
  checkedList: PropTypes.object,
};

const styles = StyleSheet.create({
  blankIcon: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "#00000080",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  checkedIcon: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "white",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
