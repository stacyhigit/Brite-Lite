import { ActivityIndicator, StyleSheet, View } from "react-native";
import { boxColors } from "../../constants/colors";

export default function ActivityIndicatorComponent() {
  return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size="large" color={boxColors.ett_blue} />
    </View>
  );
}
const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 10,
  },
});
