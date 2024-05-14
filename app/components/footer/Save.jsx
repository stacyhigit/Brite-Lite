import {
  Alert,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Burnt from "burnt";
import PropTypes from "prop-types";

import ModalComponent from "../ui/ModalComponent";
import { containerFooter } from "../../constants/styles";
import { insertBoard, updateBoard } from "../../util/database";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";

export default function Save({ board, setBoard, boxes, takeScreenshot }) {
  const [showModal, setShowModal] = useState(false);
  const saveList = ["Brite-Lite file", "Image file"];

  const showSaveToast = (title) => {
    Burnt.toast({
      title: title,
      preset: "done",
    });
  };

  const saveImage = async () => {
    try {
      setShowModal(false);
      const screenshotURI = await takeScreenshot();
      if (screenshotURI) {
        await MediaLibrary.saveToLibraryAsync(screenshotURI);
        showSaveToast("Saved to Gallery");
      }
    } catch (error) {
      console.log("error saveImage", error);
    }
  };

  const openSettingsAlert = () =>
    Alert.alert(
      "Allow Brite-Lite to access your photos and videos?",
      "This will allow Brite-Lite to save your Image.\n\nTo enable this, click Open Settings below and then select Photos and videos under the Permissions menu",
      [
        {
          text: "NO THANKS",
          style: "cancel",
        },
        {
          text: "OPEN SETTINGS",
          onPress: () => handleOpenSettings(),
        },
      ]
    );

  const handleOpenSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const handleSave = async (item) => {
    if (item === "Brite-Lite file") {
      setShowModal(false);
      if (board.id === null) {
        const boardId = await insertBoard(boxes, board);
        if (boardId) {
          setBoard((prevboard) => ({ ...prevboard, id: boardId }));
        }
        showSaveToast("Saved successfully");
      } else {
        await updateBoard(boxes, board.id);
        showSaveToast("Saved successfully");
      }
    }
    if (item === "Image file") {
      try {
        let getPerms = await MediaLibrary.getPermissionsAsync(true);
        if (getPerms.granted) {
          setShowModal(false);
          saveImage();
          return;
        }
        if (getPerms.canAskAgain) {
          let reqPerms = await MediaLibrary.requestPermissionsAsync(true);
          if (reqPerms.granted) {
            setShowModal(false);
            saveImage();
            return;
          }
          setShowModal(false);
          return;
        }
        if (!getPerms.canAskAgain) {
          openSettingsAlert();
        }
      } catch (error) {
        console.log("error requestPermissions", error);
      }
    }
    setShowModal(false);
  };

  Save.propTypes = {
    boxes: PropTypes.array,
    board: PropTypes.object,
    setBoard: PropTypes.func,
    takeScreenshot: PropTypes.func,
  };

  return (
    <>
      <MaterialCommunityIconsComponent
        onPress={() => setShowModal(true)}
        containerStyle={containerFooter}
        icon={{ name: "content-save", size: 28, color: "white" }}
      />
      <ModalComponent
        isVisible={showModal}
        title={"Save as"}
        closeModal={() => setShowModal(false)}
      >
        <View>
          {saveList.map((item) => {
            return (
              <Pressable
                key={item}
                onPress={() => {
                  handleSave(item);
                }}
                style={styles.itemContainer}
              >
                <MaterialCommunityIconsComponent
                  icon={{ name: "content-save", size: 28, color: "#484848" }}
                />
                <Text style={styles.text}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      </ModalComponent>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    color: "#484848",
    paddingHorizontal: 16,
    marginHorizontal: 24,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 16,
  },
});
