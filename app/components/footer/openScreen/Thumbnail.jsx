import { Image, Pressable } from "react-native";
import PropTypes from "prop-types";

import { thumbnailMargin, thumbnailWidth } from "../../../constants/values";
import { globalStyles } from "../../../constants/styles";
import ThumbnailRadio from "./ThumbnailRadio";

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
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={{ margin: thumbnailMargin / 2 }}
    >
      <Image
        source={{ uri: board.imagePath }}
        style={[
          globalStyles.thumbnail,
          {
            height: imageHeight,
            width: thumbnailWidth,
          },
        ]}
        resizeMode="contain"
      />
      <ThumbnailRadio
        boardId={board.id}
        showCheckboxes={showCheckboxes}
        checkedList={checkedList}
      />
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
