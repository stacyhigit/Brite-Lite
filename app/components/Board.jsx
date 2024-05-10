import { StyleSheet } from "react-native";
import { useWindowDimensions, View } from "react-native";
import { useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";

import BoxComponent from "./BoxComponent";
import PanAndZoom from "./ui/PanAndZoom";
import { BoxEmpty } from "../models/box";
import { boxSize } from "../constants/values";
import ViewShot from "react-native-view-shot";

import { boxes as fishBoxes } from "../../assets/templates/fish";
export default function Board({ boxes, setBoxes, activeColor, shareRef }) {
  const { width, height } = useWindowDimensions();
  const columnCount = Math.min(Math.floor(width / boxSize.width), 33);
  const rowCount = Math.min(Math.floor(height / boxSize.height), 48);
  const boxCount = columnCount * rowCount;

  const styles = makeStyles(columnCount, rowCount);
  useLayoutEffect(() => {
    if (columnCount > 0) {
      setBoxes(
        Array.from({ length: boxCount }, (_, count) => new BoxEmpty(count))
      );
    }
  }, []);

  const setColor = (id) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((prevbox) =>
        prevbox.id === id ? { ...prevbox, color: activeColor } : prevbox
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
        <View style={styles.boxContainer}>
          {boxes && boxes.map((box) => <BoxComponent key={box.id} box={box} />)}
        </View>
      </ViewShot>
    </PanAndZoom>
  );
}

Board.propTypes = {
  boxes: PropTypes.array,
  setBoxes: PropTypes.func,
  activeColor: PropTypes.object,
  shareRef: PropTypes.object,
};

const makeStyles = (columnCount, rowCount) => {
  const styles = StyleSheet.create({
    boxContainer: {
      flex: columnCount,
      flexDirection: "row",
      flexWrap: "wrap",
      width: columnCount * boxSize.width,
      height: rowCount * boxSize.height,
    },
    viewShot: {
      width: "100%",
      height: "100%",
    },
  });
  return styles;
};
