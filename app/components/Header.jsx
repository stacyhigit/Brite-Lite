import { StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";

import ColorPicker from "./ColorPicker";
import { colorEmpty } from "../models/color";
export default function Header({ activeColor, handleSelectColor, isZoomed }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.colorPickerContainer}>
        <ColorPicker
          activeColor={activeColor}
          handleSelectColor={handleSelectColor}
          isZoomed={isZoomed}
        />
      </View>
      <View
        style={
          !isZoomed && activeColor.name === "empty" && styles.eraserContainer
        }
      >
        <Entypo
          name="eraser"
          size={24}
          color="white"
          onPress={() => handleSelectColor(new colorEmpty())}
        />
      </View>
    </View>
  );
}

Header.propTypes = {
  activeColor: PropTypes.object,
  handleSelectColor: PropTypes.func,
  handleErase: PropTypes.func,
  isZoomed: PropTypes.bool,
};

const styles = StyleSheet.create({
  headerContainer: {
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    gap: 8,
    paddingHorizontal: 18,
    backgroundColor: "black",
  },
  colorPickerContainer: {
    maxWidth: "80%",
  },
  eraserContainer: {
    height: 32,
    width: 32,
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 24,
    padding: 2,
  },
});
