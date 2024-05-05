import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import MaterialIconsComponent from "./ui/MaterialIconsComponent";
import ShareCapture from "./ShareCapture";

export default function Footer({ handleEraseAll, shareRef }) {
  const containerStyle = {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 3,
    width: 32,
  };

  return (
    <View style={styles.footerContainer}>
      <MaterialIconsComponent
        onPress={handleEraseAll}
        containerStyle={containerStyle}
        icon={{ name: "note-add", size: 28, color: "white" }}
      />
      <ShareCapture shareRef={shareRef} />
    </View>
  );
}

Footer.propTypes = {
  handleEraseAll: PropTypes.func,
  activeColor: PropTypes.object,
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
