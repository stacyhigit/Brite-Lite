import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Svg, { Circle } from "react-native-svg";
import SvgDefs from "./SvgDefs";
import { boxSize } from "../constants/values";

export default function BoxComponent({ box, handlePointerEnter }) {
  return (
    <View style={styles.boxContainer} onPointerEnter={handlePointerEnter}>
      {box.color.name ? (
        <Svg height={boxSize.height} width={boxSize.width}>
          <SvgDefs />
          <Circle
            cx={boxSize.height / 2}
            cy={boxSize.height / 2}
            r={boxSize.height / 2 - 1}
            fill={`url(#${box.color.name})`}
          />
        </Svg>
      ) : (
        <View style={styles.innerBoxEmpty} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  boxContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    width: 20,
    backgroundColor: "black",
  },
  innerBoxEmpty: {
    height: 5,
    width: 5,
    backgroundColor: "#484848",
    borderRadius: 24,
  },
});

BoxComponent.propTypes = {
  box: PropTypes.object,
  handlePointerEnter: PropTypes.func,
};
