import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { View } from "react-native";
import PropTypes from "prop-types";
export default function MaterialCommunityIconsComponent({
  onPress,
  containerStyle,
  icon,
}) {
  return (
    <View style={containerStyle}>
      <TouchableNativeFeedback onPress={onPress}>
        <MaterialCommunityIcons
          name={icon.name}
          size={icon.size}
          color={icon.color}
        />
      </TouchableNativeFeedback>
    </View>
  );
}

MaterialCommunityIconsComponent.propTypes = {
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  icon: PropTypes.object,
};
