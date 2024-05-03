import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { boxColors } from "../constants/colors";
import { Color, ColorEmpty } from "../models/color";

export default function ColorPicker({
  activeColor,
  handleSelectColor,
  isZoomed,
}) {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        {Object.entries(boxColors).map(([name, hex]) => (
          <View
            key={name}
            style={!isZoomed && activeColor.hex === hex && styles.active}
          >
            <Pressable
              style={({ pressed }) => [
                styles.circle,
                { backgroundColor: hex },
                pressed && styles.pressed,
              ]}
              onPress={() => handleSelectColor(new Color(name, hex))}
            />
          </View>
        ))}
        <View style={activeColor.name === "empty" && styles.active}>
          <Entypo
            name="eraser"
            size={24}
            color="white"
            onPress={() => handleSelectColor(new ColorEmpty())}
          />
        </View>
      </View>
    </ScrollView>
  );
}

ColorPicker.propTypes = {
  activeColor: PropTypes.object,
  handleSelectColor: PropTypes.func,
  isZoomed: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 11,
  },
  active: {
    alignItems: "center",
    height: 32,
    width: 32,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 24,
    padding: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
