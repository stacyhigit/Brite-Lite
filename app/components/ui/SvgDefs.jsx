import { Defs, Stop, RadialGradient } from "react-native-svg";
import PropTypes from "prop-types";

export default function SvgDefs({ boxColor }) {
  return (
    <Defs>
      <RadialGradient
        key={boxColor.id}
        id={`id${boxColor.id}${boxColor.hex}`}
        cx="50%"
        cy="40%"
        r="40%"
        fx="50%"
        fy="50%"
      >
        <Stop offset="0%" stopColor="white" stop-opacity="0.1" />
        <Stop offset="100%" stopColor={boxColor.hex} stop-opacity="1" />
      </RadialGradient>
    </Defs>
  );
}
SvgDefs.propTypes = {
  boxColor: PropTypes.object,
};
