import { Pressable, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

export default function ButtonComponent({ onPress, children, color }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

ButtonComponent.propTypes = {
  children: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
