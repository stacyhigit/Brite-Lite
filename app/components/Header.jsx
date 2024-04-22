import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import ColorPicker from "./ColorPicker";

export default function Header({ activeColor, setActiveColor, handleErase }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.colorPickerContainer}>
        <MaterialIcons
          name="color-lens"
          size={28}
          color={activeColor.hex ? activeColor.hex : "white"}
        />
        <ColorPicker
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
      </View>
      <MaterialIcons
        onPress={handleErase}
        style={styles.deleteIcon}
        name="delete-forever"
        size={28}
        color="white"
      />
    </View>
  );
}
Header.propTypes = {
  activeColor: PropTypes.object,
  setActiveColor: PropTypes.func,
  handleErase: PropTypes.func,
};
const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  colorPickerContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  deleteIcon: {
    marginLeft: 18,
  },
});
