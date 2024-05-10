import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Svg, { Circle } from "react-native-svg";
import SvgDefs from "./ui/SvgDefs";
import { boxSize } from "../constants/values";

export default function BoxComponent({ box }) {
  return (
    <View style={styles.outerBox}>
      {box.color.id === "empty" ? (
        <View style={styles.innerBoxEmpty} />
      ) : (
        <Svg height={boxSize.height} width={boxSize.width}>
          <SvgDefs boxColor={box.color} />
          <Circle
            cx={boxSize.height / 2}
            cy={boxSize.height / 2}
            r={boxSize.height / 2 - 1}
            fill={`url(#id${box.color.id}${box.color.hex})`}
          />
        </Svg>
      )}
    </View>
  );
}

BoxComponent.propTypes = {
  box: PropTypes.object,
};

const styles = StyleSheet.create({
  outerBox: {
    alignItems: "center",
    justifyContent: "center",
    height: boxSize.height,
    width: boxSize.width,
    backgroundColor: "black",
  },
  innerBoxEmpty: {
    height: 5,
    width: 5,
    backgroundColor: "#484848",
    borderRadius: boxSize.width,
  },
});
