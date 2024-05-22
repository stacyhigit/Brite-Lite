import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { Board, BoardEmpty } from "../models/board";
import { BoxEmpty } from "../models/box";

export const BoardContext = createContext();

export default function BoardContextProvider({ children }) {
  const [boxes, setBoxes] = useState();
  const [board, setBoard] = useState(new Board());
  const [isLoading, setIsLoading] = useState(false);
  const [initialSize, setInitialSize] = useState({
    columnCount: 0,
    rowCount: 0,
  });

  const setNewBoxes = (
    columnCount = initialSize.columnCount,
    rowCount = initialSize.rowCount
  ) => {
    setBoxes(
      Array.from(
        { length: columnCount * rowCount },
        (_, count) => new BoxEmpty(count)
      )
    );
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
