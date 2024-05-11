import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { pressedStyle } from "../../constants/styles";

export default function MaterialIconsComponent({
  onPress,
  containerStyle,
  icon,
}) {
  return (
    <Pressable
      style={({ pressed }) => [containerStyle, pressed && pressedStyle]}
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
