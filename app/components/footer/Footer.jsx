import { View } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import PropTypes from "prop-types";

import ShareCapture from "./ShareCapture";
import Save from "./Save";
import EraseBoard from "./EraseBoard";
import Open from "./Open";
import { globalStyles } from "../../constants/styles";
import { useContext } from "react";
import { BoardContext } from "../../store/board-context";
import { deleteImage, moveImage } from "../../util/shared";
import { saveBoard } from "../../util/database";

export default function Footer({ shareRef }) {
  const boardCtx = useContext(BoardContext);

  const takeScreenshot = async (options) => {
    try {
      const screenshotURI = await captureRef(shareRef, options);
      return screenshotURI;
    } catch (error) {
      console.log(error);
    }
  };

  const saveBoardHandler = async () => {
    const prevImagePath = boardCtx.board.imagePath;
    const docDir = FileSystem.documentDirectory;
    const newImagePath = docDir + "thumbnail" + Date.now() + ".jpg";

    const screenshotURI = await takeScreenshot({
      format: "jpg",
      width: 100,
      quality: 0.5,
      fileName: "Brite-Lite-",
    });

    moveImage(screenshotURI, newImagePath);

    const newBoardId = await saveBoard(
      newImagePath,
      boardCtx.boxes,
      boardCtx.board
    );
    if (prevImagePath) {
      deleteImage(prevImagePath);
    }
    return { newBoardId, newImagePath };
  };

  return (
    <View style={globalStyles.footerContainer}>
      <EraseBoard />
      <Save
        takeScreenshot={takeScreenshot}
        saveBoardHandler={saveBoardHandler}
      />
      <Open saveBoardHandler={saveBoardHandler} />
      <ShareCapture takeScreenshot={takeScreenshot} />
    </View>
  );
}

Footer.propTypes = {
  boxes: PropTypes.array,
  setBoxes: PropTypes.func,
  board: PropTypes.object,
  setBoard: PropTypes.func,
  eraseAllBoxes: PropTypes.func,
  shareRef: PropTypes.object,
};
