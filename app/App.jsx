import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
  StatusBar as rnStatusBar,
} from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";

import { boxColors, buttonColors } from "./constants/colors";
import ModalComponent from "./components/ui/ModalComponent";
import Header from "./components/Header";
import { BoxEmpty } from "./models/box";
import { color, colorEmpty } from "./models/color";
import { boxSize } from "./constants/values";
import Zoom from "./components/ui/Zoom";
import Footer from "./components/Footer";
import Board from "./components/Board";

const statusBarHeight =
  Platform.OS == "android" ? rnStatusBar.currentHeight : 0;

export default function App() {
  const visibility = NavigationBar.useVisibility();

  useEffect(() => {
    if (visibility === "visible") {
      const interval = setTimeout(() => {
        NavigationBar.setVisibilityAsync("hidden");
      }, 3000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, [visibility]);

  const { width, height } = useWindowDimensions();
  const defaultColor = new color("ett_green", boxColors.ett_green);

  const [boxes, setBoxes] = useState();
  const [activeColor, setActiveColor] = useState(defaultColor);
  const [showEraseModal, setShowEraseModal] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const columnCount = Math.floor(width / boxSize.width);
  const rowCount = Math.floor(height / boxSize.height);
  const boxCount = columnCount * rowCount;

  useLayoutEffect(() => {
    if (columnCount > 0) {
      setBoxes(
        Array.from({ length: boxCount }, (_, count) => new BoxEmpty(count))
      );
    }
  }, []);

  const handlePointerEnter = (id) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((prevbox) =>
        prevbox.id === id ? { ...prevbox, color: activeColor } : prevbox
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
      prevBoxes.map((prevBox) => ({ ...prevBox, color: new colorEmpty() }))
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
          <Board
            boxes={boxes}
            columnCount={columnCount}
            isZoomed={isZoomed}
            handlePointerEnter={handlePointerEnter}
          />
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
});
