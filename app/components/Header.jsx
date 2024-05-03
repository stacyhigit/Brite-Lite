import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import ColorPicker from "./ColorPicker";
import MaterialIconsComponent from "./ui/MaterialIconsComponent";

export default function Header({ activeColor, handleSelectColor }) {
  return (
    <View style={styles.headerContainer}>
      <MaterialIconsComponent
        onPress={undefined}
        containerStyle={undefined}
        icon={{ name: "color-lens", size: 28, color: activeColor.hex }}
      />
      <View style={styles.colorPickerContainer}>
        <ColorPicker
          activeColor={activeColor}
          handleSelectColor={handleSelectColor}
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
});
