import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { BoardEmpty } from "../models/board";
import { BoxEmpty } from "../models/box";
import { useWindowDimensions } from "react-native";
import { boxSize } from "../constants/values";

export const BoardContext = createContext();

export default function BoardContextProvider({ children }) {
  const { width, height } = useWindowDimensions();
  const columnCount = Math.min(Math.floor(width / boxSize.width), 33);
  const rowCount = Math.min(Math.floor(height / boxSize.height), 48);

  const getBoxesList = (columnCount, rowCount) => {
    return Array.from(
      { length: columnCount * rowCount },
      (_, count) => new BoxEmpty(count)
    );
  };
  const initialBoxes = getBoxesList(columnCount, rowCount);
  const initialBoard = new BoardEmpty(columnCount, rowCount);

  const [boxes, setBoxes] = useState(initialBoxes);
  const [board, setBoard] = useState(initialBoard);
  const [isLoading, setIsLoading] = useState(false);
  const [initialSize, setInitialSize] = useState({ columnCount, rowCount });

  const setNewBoxes = (
    columnCount = initialSize.columnCount,
    rowCount = initialSize.rowCount
  ) => {
    setBoxes(getBoxesList(columnCount, rowCount));
  };

  const setNewBoard = (
    columnCount = initialSize.columnCount,
    rowCount = initialSize.rowCount
  ) => {
    setBoard(new BoardEmpty(columnCount, rowCount));
  };

  const value = {
    board,
    setBoard,
    boxes,
    setBoxes,
    isLoading,
    setIsLoading,
    initialSize,
    setInitialSize,
    setNewBoxes,
    setNewBoard,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

BoardContextProvider.propTypes = {
  children: PropTypes.object,
};
