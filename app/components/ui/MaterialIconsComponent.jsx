import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default function MaterialIconsComponent({
  onPress,
  containerStyle,
  icon,
}) {
  return (
    <Pressable
      style={({ pressed }) => [containerStyle, pressed && styles.pressed]}
      onPress={onPress}
    >
      <MaterialIcons name={icon.name} size={icon.size} color={icon.color} />
    </Pressable>
  );
}

MaterialIconsComponent.propTypes = {
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  icon: PropTypes.object,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
