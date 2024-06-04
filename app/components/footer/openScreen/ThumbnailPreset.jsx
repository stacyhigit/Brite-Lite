import { Image, Pressable } from "react-native";
import PropTypes from "prop-types";

import { thumbnailMargin, thumbnailWidth } from "../../../constants/values";
import { globalStyles } from "../../../constants/styles";
export default function ThumbnailPreset({ board, handlePress, image }) {
  return (
    <Pressable onPress={handlePress} style={{ margin: thumbnailMargin / 2 }}>
      <Image
        source={{ uri: image }}
        style={[
          globalStyles.thumbnail,
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
  image: PropTypes.string,
};
