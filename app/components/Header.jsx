import { Image, Pressable, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import PropTypes from "prop-types";

import { useState } from "react";
import { ColorEmpty } from "../models/color";
import ModalColorPicker from "./ui/ModalColorPicker";
import { circledStyle, pressedStyle } from "../constants/styles";
import SwatchesCustom from "./ui/SwatchesCustom";
import { basicSwatches } from "../constants/colors";
export default function Header({
  activeColor,
  setActiveColor,
  customColors,
  setCustomColors,
}) {
  const [showModal, setShowModal] = useState(false);

  const allColors = [...customColors, ...basicSwatches];

  return (
    <View style={styles.headerContainer}>
      <View style={styles.colorPickerContainer}>
        <Pressable
          style={({ pressed }) => pressed && pressedStyle}
          onPress={() => setShowModal(true)}
        >
          <Image
            source={require("../../assets/color_circle.png")}
            style={styles.colorPickerImg}
          />
        </Pressable>
        <SwatchesCustom
          colors={allColors}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        <View style={activeColor.id === "empty" && circledStyle}>
          <Entypo
            name="eraser"
            size={24}
            color="white"
            onPress={() => setActiveColor(new ColorEmpty())}
          />
        </View>
        <ModalColorPicker
          showModal={showModal}
          setShowModal={setShowModal}
          customColors={customColors}
          setCustomColors={setCustomColors}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
      </View>
    </View>
  );
}

Header.propTypes = {
  activeColor: PropTypes.object,
  setActiveColor: PropTypes.func,
  handleErase: PropTypes.func,
  isZoomed: PropTypes.bool,
  customColors: PropTypes.array,
  setCustomColors: PropTypes.func,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    maxWidth: "95%",
  },
  colorPickerImg: {
    height: 28,
    width: 28,
  },
});
