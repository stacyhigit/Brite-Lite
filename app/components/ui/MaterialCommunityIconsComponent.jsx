import { Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import { pressedStyle } from "../../constants/styles";

export default function MaterialCommunityIconsComponent({
  onPress,
  containerStyle,
  icon,
}) {
  return (
    <Pressable
      style={({ pressed }) => [containerStyle, pressed && pressedStyle]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon.name}
        size={icon.size}
        color={icon.color}
      />
    </Pressable>
  );
}

MaterialCommunityIconsComponent.propTypes = {
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  icon: PropTypes.object,
};
