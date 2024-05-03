import { FlatList, useWindowDimensions } from "react-native";
import { useLayoutEffect } from "react";
import PropTypes from "prop-types";

import BoxComponent from "./BoxComponent";
import PanAndZoom from "./ui/PanAndZoom";
import { BoxEmpty } from "../models/box";
import { boxSize } from "../constants/values";

export default function Board({ boxes, setBoxes, activeColor }) {
  const { width, height } = useWindowDimensions();
  const columnCount = Math.floor(width / boxSize.width);
  const rowCount = Math.floor(height / boxSize.height);
  const boxCount = columnCount * rowCount;

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
      <FlatList
        data={boxes}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        numColumns={columnCount}
        renderItem={({ item }) => {
          return <BoxComponent box={item} />;
        }}
      />
    </PanAndZoom>
  );
}

Board.propTypes = {
  boxes: PropTypes.array,
  setBoxes: PropTypes.func,
  activeColor: PropTypes.object,
};
