import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import PropTypes from "prop-types";

export default function Zoom({ isZoomed, zoomVals, children }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const zoomedWidth = useSharedValue(windowWidth);
  const zoomedHeight = useSharedValue(windowHeight);

  const scale = useSharedValue(1);
  const scaleOffset = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateXOffset = useSharedValue(0);
  const translateYOffset = useSharedValue(0);

  const originX = useSharedValue(0);
  const originY = useSharedValue(0);

  const boundaries = useDerivedValue(() => {
    const offsetX =
      Math.max(0, zoomedWidth.value * scale.value - windowWidth) / 2;
    const offsetY =
      Math.max(0, zoomedHeight.value * scale.value - windowHeight) / 2;

    return { x: offsetX, y: offsetY };
  }, [scale, zoomedWidth, zoomedHeight, windowWidth, windowHeight]);

  const isPinchActive = useSharedValue(false);

  const pinchTransform = ({ toScale, fromScale, delta, origin, offset }) => {
    "worklet";

    const fromPinchX = -1 * (origin.x * fromScale - origin.x);
    const fromPinchY = -1 * (origin.y * fromScale - origin.y);
    const toPinchX = -1 * (origin.x * toScale - origin.x);
    const toPinchY = -1 * (origin.y * toScale - origin.y);

    const x = offset.x + toPinchX - fromPinchX + delta.x;
    const y = offset.y + toPinchY - fromPinchY + delta.y;
    return { x, y };
  };

  const clamp = (lowerBound, upperBound, value) => {
    "worklet";
    return Math.max(lowerBound, Math.min(value, upperBound));
  };

  const config = { duration: 200, easing: Easing.linear };

  const pinch = Gesture.Pinch()
    .onStart((e) => {
      isPinchActive.value = true;
      originX.value = e.focalX - zoomedWidth.value / 2;
      originY.value = e.focalY - zoomedHeight.value / 2;

      translateXOffset.value = translateX.value;
      translateYOffset.value = translateY.value;
      scaleOffset.value = scale.value;
    })
    .onUpdate((e) => {
      const toScale = e.scale * scaleOffset.value;
      const deltaX = e.focalX - zoomedWidth.value / 2 - originX.value;
      const deltaY = e.focalY - zoomedHeight.value / 2 - originY.value;

      const { x: toX, y: toY } = pinchTransform({
        toScale: toScale,
        fromScale: scaleOffset.value,
        origin: { x: originX.value, y: originY.value },
        offset: { x: translateXOffset.value, y: translateYOffset.value },
        delta: { x: deltaX, y: deltaY },
      });

      const boundX = Math.max(0, zoomedWidth.value * toScale - windowWidth) / 2;
      const boundY =
        Math.max(0, zoomedHeight.value * toScale - windowHeight) / 2;

      translateX.value = clamp(-1 * boundX, boundX, toX);
      translateY.value = clamp(-1 * boundY, boundY, toY);
      scale.value = clamp(0.9, toScale, 2.5);
    })
    .onEnd(() => {
      isPinchActive.value = false;

      if (scale.value < 1) {
        scale.value = withTiming(1);
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    });

  const isWithinBoundX = useSharedValue(true);
  const isWithinBoundY = useSharedValue(true);
  const pan = Gesture.Pan()
    .maxPointers(1)
    .onStart(() => {
      cancelAnimation(translateX);
      cancelAnimation(translateY);

      translateXOffset.value = translateX.value;
      translateYOffset.value = translateY.value;
    })
    .onChange(({ translationX, translationY }) => {
      const toX = translateXOffset.value + translationX;
      const toY = translateYOffset.value + translationY;

      const { x: boundX, y: boundY } = boundaries.value;
      isWithinBoundX.value = toX >= -1 * boundX && toX <= boundX;
      isWithinBoundY.value = toY >= -1 * boundY && toY <= boundY;

      if (isWithinBoundX.value) {
        translateX.value = clamp(-1 * boundX, boundX, toX);
      } else {
        if (zoomedWidth.value * scale.value < windowWidth) {
          translateX.value = clamp(-1 * boundX, boundX, toX);
        }
      }

      if (isWithinBoundY.value) {
        translateY.value = clamp(-1 * boundY, boundY, toY);
      } else {
        if (zoomedHeight.value * scale.value < windowHeight) {
          translateY.value = clamp(-1 * boundY, boundY, toY);
        }
      }
    })
    .onEnd(({ velocityX, velocityY }) => {
      const { x: boundX, y: boundY } = boundaries.value;
      const toX = clamp(-1 * boundX, boundX, translateX.value);
      const toY = clamp(-1 * boundY, boundY, translateY.value);

      translateX.value = isWithinBoundX.value
        ? withDecay({ velocity: velocityX / 2, clamp: [-1 * boundX, boundX] })
        : withTiming(toX, config);

      translateY.value = isWithinBoundY.value
        ? withDecay({ velocity: velocityY / 2, clamp: [-1 * boundY, boundY] })
        : withTiming(toY, config);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    width: zoomedWidth.value,
    height: zoomedHeight.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <GestureDetector gesture={pinch.enabled(isZoomed)}> */}
      <GestureDetector
        gesture={Gesture.Race(pan.enabled(isZoomed), pinch.enabled(isZoomed))}
      >
        <View style={styles.animatedContainer}>
          <Animated.View
            style={[styles.container, animatedStyle]}
            resizeMethod={"scale"}
          >
            {children}
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

Zoom.propTypes = {
  children: PropTypes.object,
  isZoomed: PropTypes.bool,
  zoomVals: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedContainer: {
    height: "100%",
    overflow: "hidden",
  },
});
