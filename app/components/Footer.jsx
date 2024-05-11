import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import MaterialIconsComponent from "./ui/MaterialIconsComponent";
import ShareCapture from "./footer/ShareCapture";
import Save from "./footer/Save";
import { containerFooter } from "../constants/styles";
import EraseBoard from "./footer/EraseBoard";

export default function Footer({ eraseAllBoxes, shareRef }) {
  return (
    <View style={styles.footerContainer}>
      <EraseBoard eraseAllBoxes={eraseAllBoxes} />
      <ShareCapture shareRef={shareRef} />
    </View>
  );
}

Footer.propTypes = {
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
