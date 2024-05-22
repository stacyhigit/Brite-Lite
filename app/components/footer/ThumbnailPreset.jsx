import { Image, Pressable } from "react-native";
import PropTypes from "prop-types";

import { thumbnailWidth } from "../../constants/values";
import { thumbnail } from "../../constants/styles";

export default function ThumbnailPreset({ board, handlePress }) {
  return (
    <Pressable onPress={handlePress}>
      <Image
        source={board.presetImagePath}
        style={[
          thumbnail,
          {
            width: thumbnailWidth,
            height: (board.rowCount * thumbnailWidth) / board.columnCount,
          },
        ]}
        resizeMode="contain"
      />
    </Pressable>
  );
}
ThumbnailPreset.propTypes = {
  board: PropTypes.object,
  handlePress: PropTypes.func,
};
