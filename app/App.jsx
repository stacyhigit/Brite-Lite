import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
  StatusBar as rnStatusBar,
} from "react-native";
import { useLayoutEffect, useState } from "react";

import { boxColors, buttonColors } from "./constants/colors";
import ModalComponent from "./components/ModalComponent";
import Header from "./components/Header";
import { BoxEmpty } from "./models/box";
import { color, colorEmpty } from "./models/color";
import { boxSize } from "./constants/values";
import BoxComponent from "./components/BoxComponent";
import Zoom from "./components/Zoom";
import Footer from "./components/Footer";

const statusBarHeight =
  Platform.OS == "android" ? rnStatusBar.currentHeight : 0;

export default function App() {
  const { width, height } = useWindowDimensions();
  const defaultColor = new color("ett_green", boxColors.ett_green);

  const [boxes, setBoxes] = useState();
  const [activeColor, setActiveColor] = useState(defaultColor);
  const [showEraseModal, setShowEraseModal] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useLayoutEffect(() => {
    const columnCount = Math.floor(width / boxSize.width);
    const rowCount = Math.floor(height / boxSize.height);

    if (columnCount > 0) {
      setBoxes(
        Array.from({ length: columnCount }, (_, column) =>
          Array.from(
            { length: rowCount },
            (_, row) => new BoxEmpty(row, column)
          )
        )
      );
    }
  }, []);

  const handlePointerEnter = (id) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((row) =>
        row.map((prevbox) =>
          prevbox.id === id ? { ...prevbox, color: activeColor } : prevbox
        )
      )
    );
  };

  const handleSelectColor = (newColor) => {
    setActiveColor(newColor);
    setIsZoomed(false);
  };

  const handleEraseAll = () => {
    setShowEraseModal(true);
  };

  const eraseAllBoxes = () => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((row) =>
        row.map((prevBox) => ({ ...prevBox, color: new colorEmpty() }))
      )
    );
    setShowEraseModal(false);
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <Header
        activeColor={activeColor}
        handleSelectColor={handleSelectColor}
        isZoomed={isZoomed}
      />
      <StatusBar style="light" />
      <View style={styles.container}>
        <Zoom isZoomed={isZoomed}>
          <Pressable>
            {({ pressed }) => (
              <View style={styles.boxContainer}>
                {!boxes ? (
                  <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                      size="large"
                      color={boxColors.ett_blue}
                    />
                  </View>
                ) : (
                  boxes.map((row) => {
                    return (
                      <View key={row[0]?.id}>
                        {row.map((box) => {
                          return (
                            <BoxComponent
                              key={box.id}
                              box={box}
                              handlePointerEnter={() =>
                                !isZoomed &&
                                pressed &&
                                handlePointerEnter(box.id)
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
        </Zoom>

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
            onPress: eraseAllBoxes,
          }}
        />
      </View>
      <Footer
        handleEraseAll={handleEraseAll}
        isZoomed={isZoomed}
        setIsZoomed={setIsZoomed}
        activeColor={activeColor}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "black",
    marginTop: statusBarHeight,
  },
  container: {
    flex: 1,
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
    overflow: "hidden",
  },
  activityIndicatorContainer: {
    flex: 1,
    height: "50%",
    padding: 10,
  },
});
