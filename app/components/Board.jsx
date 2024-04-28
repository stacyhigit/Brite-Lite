import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import PropTypes from "prop-types";

import BoxComponent from "./BoxComponent";
import { boxColors } from "../constants/colors";
import { useLayoutEffect } from "react";
import { BoxEmpty } from "../models/box";
import { boxSize } from "../constants/values";

export default function Board({ boxes, setBoxes, isZoomed, activeColor }) {
  const { width, height } = useWindowDimensions();
  const rowCount = Math.floor(width / boxSize.width);
  const columnCount = Math.floor(height / boxSize.height);
  const boxCount = columnCount * rowCount;

  useLayoutEffect(() => {
    if (columnCount > 0) {
      setBoxes(
        Array.from({ length: boxCount }, (_, count) => new BoxEmpty(count))
      );
    }
  }, []);

  const boxes2d = [];
  for (let i = 0; i < boxes?.length; i += columnCount) {
    boxes2d.push(boxes.slice(i, i + columnCount));
  }

  const handlePointerEnter = (id) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((prevbox) =>
        prevbox.id === id ? { ...prevbox, color: activeColor } : prevbox
      )
    );
  };

  return (
    <Pressable>
      {({ pressed }) => (
        <View style={styles.boxContainer}>
          {!boxes ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color={boxColors.ett_blue} />
            </View>
          ) : (
            boxes2d.map((row) => {
              return (
                <View key={row[0]?.id}>
                  {row.map((box) => {
                    return (
                      <BoxComponent
                        key={box.id}
                        box={box}
                        handlePointerEnter={() =>
                          !isZoomed && pressed && handlePointerEnter(box.id)
                        }
                      />
                    );
                  })}
                </View>
              );
            })
          )}
        </View>
      )}
    </Pressable>
  );
}

Board.propTypes = {
  boxes: PropTypes.array,
  setBoxes: PropTypes.func,
  isZoomed: PropTypes.bool,
  activeColor: PropTypes.object,
};
const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    overflow: "hidden",
  },
  activityIndicatorContainer: {
    flex: 1,
    height: "50%",
    padding: 10,
  },
});
