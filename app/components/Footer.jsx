import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import { boxColors } from "../constants/colors";
import MaterialIconsComponent from "./ui/MaterialIconsComponent";

export default function Footer({
  handleEraseAll,
  isZoomed,
  setIsZoomed,
  activeColor,
}) {
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
        icon={{ name: "delete-forever", size: 28, color: "white" }}
      />

      <MaterialIconsComponent
        onPress={() => setIsZoomed(false)}
        containerStyle={{
          ...containerStyle,
          borderTopColor: isZoomed ? null : activeColor.hex,
        }}
        icon={{
          name: "edit",
          size: 24,
          color: isZoomed ? "white" : activeColor.hex,
        }}
      />

      <MaterialIconsComponent
        onPress={() => setIsZoomed((prevZoom) => !prevZoom)}
        containerStyle={{
          ...containerStyle,
          borderTopColor: isZoomed ? boxColors.ett_yellow : null,
        }}
        icon={{
          name: "zoom-in",
          size: 32,
          color: isZoomed ? boxColors.ett_yellow : "white",
        }}
      />
    </View>
  );
}

Footer.propTypes = {
  handleEraseAll: PropTypes.func,
  isZoomed: PropTypes.bool,
  setIsZoomed: PropTypes.func,
  activeColor: PropTypes.object,
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
