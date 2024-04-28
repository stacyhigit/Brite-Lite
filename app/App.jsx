import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar as rnStatusBar,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";

import { boxColors, buttonColors } from "./constants/colors";
import { initDatabase } from "./util/database";
import { color, colorEmpty } from "./models/color";

import ModalComponent from "./components/ui/ModalComponent";
import Header from "./components/Header";
import Zoom from "./components/ui/Zoom";
import Footer from "./components/Footer";
import Board from "./components/Board";

SplashScreen.preventAutoHideAsync();

const statusBarHeight =
  Platform.OS == "android" ? rnStatusBar.currentHeight : 0;

export default function App() {
  const visibility = NavigationBar.useVisibility();

  const defaultColor = new color("ett_green", boxColors.ett_green);

  const [appIsReady, setAppIsReady] = useState(false);
  const [boxes, setBoxes] = useState();
  const [activeColor, setActiveColor] = useState(defaultColor);
  const [showEraseModal, setShowEraseModal] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

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

  useEffect(() => {
    async function prepare() {
      try {
        await initDatabase();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

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
    <SafeAreaView style={styles.outerContainer} onLayout={onLayoutRootView}>
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
            activeColor={activeColor}
            setBoxes={setBoxes}
            isZoomed={isZoomed}
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
