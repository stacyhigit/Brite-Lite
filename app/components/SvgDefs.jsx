import { Defs, Stop, RadialGradient } from "react-native-svg";
import { boxColors } from "../constants/colors";
export default function SvgDefs() {
  return (
    <Defs>
      {Object.entries(boxColors).map(([color, hex]) => (
        <RadialGradient
          key={color}
          id={color}
          cx="50%"
          cy="40%"
          r="40%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="0%" stopColor="white" stop-opacity="0.1" />
          <Stop offset="100%" stopColor={hex} stop-opacity="1" />
        </RadialGradient>
      ))}
    </Defs>
  );
}
