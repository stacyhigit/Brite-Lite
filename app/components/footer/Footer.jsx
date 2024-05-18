import { StyleSheet, View } from "react-native";
import { captureRef } from "react-native-view-shot";

import PropTypes from "prop-types";

import ShareCapture from "./ShareCapture";
import Save from "./Save";
import EraseBoard from "./EraseBoard";
import Open from "./Open";

export default function Footer({
  boxes,
  setBoxes,
  board,
  setBoard,
  eraseAllBoxes,
  shareRef,
}) {
  const takeScreenshot = async (options) => {
    try {
      const screenshotURI = await captureRef(shareRef, options);
      return screenshotURI;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.footerContainer}>
      <EraseBoard eraseAllBoxes={eraseAllBoxes} />
      <Save
        boxes={boxes}
        setBoxes={setBoxes}
        board={board}
        setBoard={setBoard}
        takeScreenshot={takeScreenshot}
      />
      <Open board={board} />
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

const styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 36,
    paddingVertical: 6,
    backgroundColor: "black",
  },
});
