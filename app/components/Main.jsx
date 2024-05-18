import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import PropTypes from "prop-types";

import { getAllColors, getBoxes, initDatabase } from "../util/database";
import { Board } from "../models/board";
import { boxColors, defaultColor } from "../constants/colors";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import BoardComponent from "./BoardComponent";
import { BoxEmpty } from "../models/box";

SplashScreen.preventAutoHideAsync();

const statusBarHeight = Platform.OS == "android" ? StatusBar.currentHeight : 0;

export default function Main({ route }) {
  const visibility = NavigationBar.useVisibility();

  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [boxes, setBoxes] = useState();
  const [board, setBoard] = useState(new Board());
  const [initialSize, setInitialSize] = useState({
    columnCount: 0,
    rowCount: 0,
  });
  const [activeColor, setActiveColor] = useState(defaultColor);
  const [customColors, setCustomColors] = useState([]);

  const shareRef = useRef();

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
        const allColors = await getAllColors();
        setCustomColors(allColors);
      } catch (e) {
        console.log(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, [board]);

  useEffect(() => {
    async function prepare() {
      if (route?.params?.erase) {
        eraseAllBoxes();
        return;
      }
      if (route?.params?.board) {
        setIsLoading(true);
        setTimeout(() => {
          setBoard(route.params.board);
          setIsLoading(false);
        }, 100);
        if (route.params.boxes) {
          setBoxes(route.params.boxes);
        } else {
          handleGetBoxes(route.params.board.id);
        }
      }
    }
    prepare();
  }, [route]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }

  const handleGetBoxes = async (id) => {
    const newBoxes = await getBoxes(id);
    setBoxes(newBoxes);
  };

  const eraseAllBoxes = () => {
    setBoard(
      new Board(null, "", initialSize.columnCount, initialSize.rowCount)
    );
    setBoxes(
      Array.from(
        { length: initialSize.columnCount * initialSize.rowCount },
        (_, count) => new BoxEmpty(count)
      )
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer} onLayout={onLayoutRootView}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Header
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        customColors={customColors}
        setCustomColors={setCustomColors}
      />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color={boxColors.ett_blue} />
          </View>
        ) : (
          <BoardComponent
            boxes={boxes}
            board={board}
            setBoard={setBoard}
            setBoxes={setBoxes}
            setInitialSize={setInitialSize}
            activeColor={activeColor}
            shareRef={shareRef}
          />
        )}
      </View>
      <Footer
        boxes={boxes}
        setBoxes={setBoxes}
        board={board}
        setBoard={setBoard}
        eraseAllBoxes={eraseAllBoxes}
        shareRef={shareRef}
      />
    </SafeAreaView>
  );
}

Main.propTypes = {
  route: PropTypes.object,
};

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
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
