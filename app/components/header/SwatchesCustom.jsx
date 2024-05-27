import { ScrollView, StyleSheet, View } from "react-native";
import { styles as cpStyles } from "reanimated-color-picker/lib/src/styles";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import PropTypes from "prop-types";

import { circledStyle, pressedStyle, scrollView } from "../../constants/styles";

export default function SwatchesCustom({
  colors = [],
  style = {},
  swatchStyle = {},
  activeColor,
  setActiveColor,
}) {
  return (
    <ScrollView horizontal={true} style={scrollView}>
      <View
        style={[cpStyles.swatchesContainer, styles.swatchesContainer, style]}
      >
        {colors.length > 0 ? (
          colors.map((color) => {
            return (
              <View
                key={color.hex + color.id}
                style={[
                  styles.circleContainer,
                  color.id == activeColor.id && circledStyle,
                ]}
              >
                <TouchableNativeFeedback
                  onPress={() => setActiveColor(color)}
                  style={[
                    styles.swatch,
                    swatchStyle,
                    { backgroundColor: color.hex },
                  ]}
                />
              </View>
            );
          })
        ) : (
          <View style={styles.circleContainer}>
            <View
              style={[styles.swatch, swatchStyle, styles.placeHolder]}
            ></View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
SwatchesCustom.propTypes = {
  colors: PropTypes.array,
  style: PropTypes.object,
  swatchStyle: PropTypes.object,
  activeColor: PropTypes.object,
  setActiveColor: PropTypes.func,
};

const styles = StyleSheet.create({
  placeHolder: {
    borderColor: "#707070",
    borderWidth: 1,
  },
  swatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  swatchesContainer: {
    alignItems: "center",
  },
  circleContainer: {
    justifyContent: "center",
    height: 38,
    width: 38,
  },
});
