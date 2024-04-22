import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { Entypo } from "@expo/vector-icons";

import { boxColors } from "../constants/colors";
import { color } from "../models/color";

export default function ColorPicker({ activeColor, setActiveColor }) {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        {Object.entries(boxColors).map(([name, hex]) => (
          <Pressable
            key={name}
            style={({ pressed }) => [
              styles.circle,
              { backgroundColor: hex },
              activeColor.hex === hex && styles.active,
              pressed && styles.pressed,
            ]}
            onPress={() => setActiveColor(new color(name, hex))}
          />
        ))}
        <Entypo
          name="eraser"
          size={24}
          color="white"
          onPress={() => setActiveColor(new color(null, null))}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    minWidth: "100%",
    height: 55,
    backgroundColor: "black",
    padding: 12,
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 11,
    backgroundColor: "red",
  },
  active: {
    borderWidth: 3,
    borderColor: "white",
  },
  pressed: {
    opacity: 0.7,
  },
});

ColorPicker.propTypes = {
  activeColor: PropTypes.object,
  setActiveColor: PropTypes.func,
};
