import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar as rnStatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";

import { boxColors, buttonColors } from "./constants/colors";
import { Color, ColorEmpty } from "./models/color";

import ModalComponent from "./components/ui/ModalComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Board from "./components/Board";

const statusBarHeight =
  Platform.OS == "android" ? rnStatusBar.currentHeight : 0;

export default function App() {
  const visibility = NavigationBar.useVisibility();

  const defaultColor = new Color("ett_green", boxColors.ett_green);

  const [boxes, setBoxes] = useState();
  const [activeColor, setActiveColor] = useState(defaultColor);
  const [showEraseModal, setShowEraseModal] = useState(false);

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

  const handleSelectColor = (newColor) => {
    setActiveColor(newColor);
  };

  const handleEraseAll = () => {
    setShowEraseModal(true);
  };

  const eraseAllBoxes = () => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((prevBox) => ({ ...prevBox, color: new ColorEmpty() }))
    );
    setShowEraseModal(false);
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <Header activeColor={activeColor} handleSelectColor={handleSelectColor} />
      <StatusBar style="light" />
      <View style={styles.container}>
        <Board boxes={boxes} setBoxes={setBoxes} activeColor={activeColor} />
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
      <Footer handleEraseAll={handleEraseAll} />
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
    justifyContent: "center",
    overflow: "hidden",
  },
});
