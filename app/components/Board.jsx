import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import BoxComponent from "./BoxComponent";
import { boxColors } from "../constants/colors";

export default function Board({
  boxes,
  columnCount,
  isZoomed,
  handlePointerEnter,
}) {
  const boxes2d = [];
  for (let i = 0; i < boxes?.length; i += columnCount) {
    boxes2d.push(boxes.slice(i, i + columnCount));
  }

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
  columnCount: PropTypes.number,
  isZoomed: PropTypes.bool,
  handlePointerEnter: PropTypes.func,
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
