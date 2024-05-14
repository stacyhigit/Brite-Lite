import { StyleSheet, View } from "react-native";
import { captureRef } from "react-native-view-shot";

import PropTypes from "prop-types";

import ShareCapture from "./footer/ShareCapture";
import Save from "./footer/Save";
import EraseBoard from "./footer/EraseBoard";

export default function Footer({
  boxes,
  board,
  setBoard,
  eraseAllBoxes,
  shareRef,
}) {
  const takeScreenshot = async () => {
    try {
      const screenshotURI = await captureRef(shareRef, {
        format: "jpg",
        quality: 0.7,
        fileName: "Brite-Lite-",
      });
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
        board={board}
        setBoard={setBoard}
        takeScreenshot={takeScreenshot}
      />
      <ShareCapture takeScreenshot={takeScreenshot} />
    </View>
  );
}

Footer.propTypes = {
  boxes: PropTypes.array,
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
