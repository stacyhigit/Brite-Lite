import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar as rnStatusBar,
} from "react-native";
import { useState } from "react";

import { boxColors, buttonColors } from "./constants/colors";
import ModalComponent from "./components/ModalComponent";
import Header from "./components/Header";
import { Box, BoxEmpty } from "./models/box";
import { color } from "./models/color";
import { boxSize } from "./constants/values";
import BoxComponent from "./components/BoxComponent";

export default function App() {
  const nullColor = new color(null, null);
  const defaultColor = new color("ett_green", boxColors.ett_green);

  const [boxes, setBoxes] = useState([[new Box(0, 0, nullColor)]]);
  const [activeColor, setActiveColor] = useState(defaultColor);
  const [showEraseModal, setShowEraseModal] = useState(false);

  const handlePointerEnter = (id) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((row) =>
        row.map((prevbox) =>
          prevbox.id === id ? { ...prevbox, color: activeColor } : prevbox
        )
      )
    );
  };

  const handleErase = () => {
    setShowEraseModal(true);
  };

  const eraseBoxes = () => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((row) =>
        row.map((prevBox) => ({ ...prevBox, color: nullColor }))
      )
    );
    setShowEraseModal(false);
  };

  const handleOnLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    const columnCount = Math.floor(width / boxSize.width);
    const rowCount = Math.floor(height / boxSize.height);

    setBoxes(
      Array.from({ length: columnCount }, (_, column) =>
        Array.from({ length: rowCount }, (_, row) => new BoxEmpty(row, column))
      )
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Header
          activeColor={activeColor}
          setActiveColor={setActiveColor}
          handleErase={handleErase}
        />

        <Pressable>
          {({ pressed }) => (
            <View style={styles.boxContainer} onLayout={handleOnLayout}>
              {boxes.length < 2 && (
                <View style={styles.activityIndicatorContainer}>
                  <ActivityIndicator size="large" color={boxColors.ett_blue} />
                </View>
              )}
              {boxes.map((row) => (
                <View key={row[0].column}>
                  {row.map((box) => {
                    return (
                      <BoxComponent
                        key={box.id}
                        box={box}
                        handlePointerEnter={() =>
                          pressed && handlePointerEnter(box.id)
                        }
                      />
                    );
                  })}
                </View>
              ))}
            </View>
          )}
        </Pressable>
        <ModalComponent
          isVisible={showEraseModal}
          title={"Erase Board?"}
          body={"This will permanently erase your board"}
          button1={{
            text: "Cancel",
            color: buttonColors.gray,
            onPress: () => setShowEraseModal(false),
          }}
          button2={{
            text: "ERASE",
            color: buttonColors.red,
            onPress: eraseBoxes,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const statusBarHeight =
  Platform.OS == "android" ? rnStatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    marginTop: statusBarHeight,
    alignItems: "center",
  },
  boxContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  activityIndicatorContainer: {
    flex: 1,
    height: "50%",
    justifyContent: "center",
    padding: 10,
  },
});
