import { View } from "react-native";
import { captureRef } from "react-native-view-shot";

import PropTypes from "prop-types";

import ShareCapture from "./ShareCapture";
import Save from "./Save";
import EraseBoard from "./EraseBoard";
import Open from "./Open";
import { globalStyles } from "../../constants/styles";

export default function Footer({ shareRef }) {
  const takeScreenshot = async (options) => {
    try {
      const screenshotURI = await captureRef(shareRef, options);
      return screenshotURI;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.footerContainer}>
      <EraseBoard />
      <Save takeScreenshot={takeScreenshot} />
      <Open />
      <ShareCapture takeScreenshot={takeScreenshot} />
    </View>
  );
}

Footer.propTypes = {
  shareRef: PropTypes.object,
};
