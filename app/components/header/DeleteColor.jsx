import { Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import { globalStyles } from "../../constants/styles";

export default function DeleteColor({
  activeColor,
  showDelete,
  setShowDelete,
  handleDeleteColor,
}) {
  return (
    <>
      {showDelete && (
        <View style={[styles.pressable, styles.deleteContainer]}>
          <View style={styles.deleteInnerContainer}>
            <Text style={[styles.text, styles.deleteText]}>Delete Color</Text>
            <View
              style={[{ backgroundColor: activeColor.hex }, styles.deleteColor]}
            ></View>
          </View>
          <View
            style={[styles.deleteInnerContainer, styles.deleteButtonContainer]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.pressable,
                pressed && globalStyles.pressedStyle,
              ]}
              onPressOut={() => setShowDelete(false)}
            >
              <Text style={styles.text}>Cancel</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.pressable,
                pressed && globalStyles.pressedStyle,
              ]}
              onPressOut={handleDeleteColor}
            >
              <Text style={styles.text}>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
}
DeleteColor.propTypes = {
  activeColor: PropTypes.object,
  showDelete: PropTypes.bool,
  setShowDelete: PropTypes.func,
  handleDeleteColor: PropTypes.func,
};
const styles = StyleSheet.create({
  deleteContainer: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 22,
    borderRadius: 24,
    width: "auto",
  },
  pressable: {
    alignSelf: "center",
    alignItems: "center",
    width: 133,
    backgroundColor: "#202124",
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: "#707070",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  deleteInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  deleteButtonContainer: {
    marginTop: 12,
  },
  deleteColor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
  deleteText: {
    fontSize: 16,
  },
});
