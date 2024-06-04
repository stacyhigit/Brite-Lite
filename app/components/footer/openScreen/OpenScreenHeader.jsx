import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import MaterialCommunityIconsComponent from "../../ui/MaterialCommunityIconsComponent";

export default function OpenScreenHeader({
  setShowCheckboxes,
  setCheckedList,
  checkedListSize,
}) {
  return (
    <View style={styles.headerContainer}>
      <MaterialCommunityIconsComponent
        icon={{ name: "arrow-left", size: 24, color: "black" }}
        containerStyle={styles.headerArrow}
        onPress={() => {
          setShowCheckboxes(false);
          setCheckedList(new Set());
        }}
      />
      <Text style={styles.textHeading}>{checkedListSize} Selected</Text>
    </View>
  );
}

OpenScreenHeader.propTypes = {
  setShowCheckboxes: PropTypes.func,
  setCheckedList: PropTypes.func,
  checkedListSize: PropTypes.number,
};

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 18,
    marginBottom: 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  headerArrow: {
    marginRight: 12,
  },
});
