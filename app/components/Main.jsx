import { StyleSheet, View, StatusBar } from "react-native";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PropTypes from "prop-types";

import { getAllColors, initDatabase } from "../util/database";
import { defaultColor } from "../constants/colors";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import BoardComponent from "./BoardComponent";
import { BoardContext } from "../store/board-context";
import ActivityIndicatorComponent from "./ui/ActivityIndicatorComponent";

export default function Main({ route }) {
  const visibility = NavigationBar.useVisibility();

  const [appIsReady, setAppIsReady] = useState(false);
  const [activeColor, setActiveColor] = useState(defaultColor);
  const [customColors, setCustomColors] = useState([]);

  const boardCtx = useContext(BoardContext);

  const shareRef = useRef();
  const insets = useSafeAreaInsets();

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
      } catch (error) {
        console.log(error);
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

  return (
    <GestureHandlerRootView
      style={[styles.outerContainer, { paddingTop: insets.top }]}
      onLayout={onLayoutRootView}
    >
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Header
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        customColors={customColors}
        setCustomColors={setCustomColors}
      />
      <View style={styles.container}>
        {boardCtx.isLoading ? (
          <ActivityIndicatorComponent />
        ) : (
          <BoardComponent activeColor={activeColor} shareRef={shareRef} />
        )}
      </View>
      <Footer shareRef={shareRef} />
    </GestureHandlerRootView>
  );
}

Main.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
