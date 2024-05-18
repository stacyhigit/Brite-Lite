import { StyleSheet, Text } from "react-native";
import { useWindowDimensions, View } from "react-native";
import { useLayoutEffect } from "react";
import PropTypes from "prop-types";

import BoxComponent from "./BoxComponent";
import PanAndZoom from "./ui/PanAndZoom";
import { BoxEmpty } from "../models/box";
import { boxSize } from "../constants/values";
import ViewShot from "react-native-view-shot";

import {
  boxes as fishBoxes,
  board as fishBoard,
} from "../../assets/templates/fish";
export default function BoardComponent({
  boxes,
  setBoxes,
  board,
  setBoard,
  setInitialSize,
  activeColor,
  shareRef,
}) {
  const { width, height } = useWindowDimensions();
  let columnCount = Math.min(Math.floor(width / boxSize.width), 33);
  let rowCount = Math.min(Math.floor(height / boxSize.height), 48);

  useLayoutEffect(() => {
    if (columnCount > 0 && !boxes) {
      setBoxes(
        Array.from(
          { length: columnCount * rowCount },
          (_, count) => new BoxEmpty(count)
        )
      );
      setBoard((prevBoard) => ({ ...prevBoard, columnCount, rowCount }));
      setInitialSize({
        columnCount: columnCount,
        rowCount: rowCount,
      });
    }
  }, []);

  const setColor = (index) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((prevbox) =>
        prevbox.index === index ? { ...prevbox, color: activeColor } : prevbox
      )
    );
  };

  return (
    <PanAndZoom
      columnCount={columnCount}
      rowCount={rowCount}
      setColor={setColor}
    >
      <ViewShot ref={shareRef} collapsable={false} style={styles.viewShot}>
        <View
          style={[
            styles.boxContainer,
            {
              flex: board.columnCount,
              width: board.columnCount * boxSize.width,
              height: board.rowCount * boxSize.height,
            },
          ]}
        >
          {boxes &&
            boxes.map((box) => <BoxComponent key={box.index} box={box} />)}
        </View>
      </ViewShot>
    </PanAndZoom>
  );
}

BoardComponent.propTypes = {
  boxes: PropTypes.array,
  setBoxes: PropTypes.func,
  board: PropTypes.object,
  setBoard: PropTypes.func,
  setInitialSize: PropTypes.func,
  activeColor: PropTypes.object,
  shareRef: PropTypes.object,
};

const styles = StyleSheet.create({
  viewShot: {
    width: "100%",
    height: "100%",
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
