import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

import MaterialCommunityIconsComponent from "../../ui/MaterialCommunityIconsComponent";

export default function ThumbnailRadio({
  showCheckboxes,
  checkedList,
  boardId,
}) {
  return (
    <>
      {showCheckboxes && !checkedList.has(boardId) && (
        <MaterialCommunityIconsComponent
          icon={{
            name: "checkbox-blank-circle-outline",
            size: 20,
            color: "white",
          }}
          containerStyle={styles.blankIcon}
        />
      )}
      {showCheckboxes && checkedList.has(boardId) && (
        <MaterialCommunityIconsComponent
          icon={{ name: "check-circle", size: 20, color: "black" }}
          containerStyle={styles.checkedIcon}
        />
      )}
    </>
  );
}

ThumbnailRadio.propTypes = {
  boardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showCheckboxes: PropTypes.bool,
  checkedList: PropTypes.object,
};

const styles = StyleSheet.create({
  blankIcon: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "#00000080",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  checkedIcon: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "white",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
