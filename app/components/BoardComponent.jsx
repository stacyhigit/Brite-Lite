import { StyleSheet } from "react-native";
import { useWindowDimensions, View } from "react-native";
import { useContext, useLayoutEffect } from "react";
import PropTypes from "prop-types";

import BoxComponent from "./BoxComponent";
import PanAndZoom from "./ui/PanAndZoom";
import { boxSize } from "../constants/values";
import ViewShot from "react-native-view-shot";
import { BoardContext } from "../store/board-context";
export default function BoardComponent({ activeColor, shareRef }) {
  const { width, height } = useWindowDimensions();
  const columnCount = Math.min(Math.floor(width / boxSize.width), 33);
  const rowCount = Math.min(Math.floor(height / boxSize.height), 48);

  const boardCtx = useContext(BoardContext);

  useLayoutEffect(() => {
    if (columnCount > 0 && !boardCtx.boxes) {
      boardCtx.setNewBoxes(columnCount, rowCount);
      boardCtx.setNewBoard(columnCount, rowCount);
      boardCtx.setInitialSize({
        columnCount: columnCount,
        rowCount: rowCount,
      });
    }
  }, []);

  const setColor = (index) => {
    boardCtx.setBoxes((prevBoxes) =>
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
              flex: boardCtx.board.columnCount,
              width: boardCtx.board.columnCount * boxSize.width,
              height: boardCtx.board.rowCount * boxSize.height,
            },
          ]}
        >
          {boardCtx.boxes &&
            boardCtx.boxes.map((box) => (
              <BoxComponent key={box.index} box={box} />
            ))}
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
