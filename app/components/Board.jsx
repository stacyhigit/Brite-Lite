import { FlatList, useWindowDimensions } from "react-native";
import { memo, useLayoutEffect } from "react";
import PropTypes from "prop-types";

import BoxComponent from "./BoxComponent";
import PanAndZoom from "./ui/PanAndZoom";
import { BoxEmpty } from "../models/box";
import { boxSize } from "../constants/values";
import ViewShot from "react-native-view-shot";

function Board({ boxes, setBoxes, activeColor, shareRef }) {
  const { width, height } = useWindowDimensions();
  const columnCount = Math.min(Math.floor(width / boxSize.width), 33);
  const rowCount = Math.min(Math.floor(height / boxSize.height), 48);
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
      prevBoxes.map((prevbox, i) =>
        i === id ? { ...prevbox, color: activeColor } : prevbox
      )
    );
  };

  return (
    <PanAndZoom
      columnCount={columnCount}
      rowCount={rowCount}
      setColor={setColor}
    >
      <ViewShot ref={shareRef}>
        <FlatList
          data={boxes}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          numColumns={columnCount}
          renderItem={({ item }) => {
            return <BoxComponent box={item} />;
          }}
        />
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

export default memo(Board);
