import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

import * as MediaLibrary from "expo-media-library";
import * as Burnt from "burnt";
import PropTypes from "prop-types";

import ModalComponent from "../ui/ModalComponent";
import { containerFooter } from "../../constants/styles";
import { saveBoard, updateBoardImagePath } from "../../util/database";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";
import { buttonColors } from "../../constants/colors";

export default function Save({ board, setBoard, boxes, takeScreenshot }) {
  const [showModal, setShowModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const saveList = ["Image file", "Brite-Lite file"];
  const docDir = FileSystem.documentDirectory;

  const showSaveToast = (title) => {
    Burnt.toast({
      title: title,
      preset: "done",
    });
  };

  const handleScreenshot = async (newBoardId, board) => {
    const screenshotURI = await takeScreenshot({
      format: "jpg",
      width: 100,
      quality: 0.5,
      fileName: "Brite-Lite-",
    });
    const newImagePath = docDir + newBoardId + Date.now() + ".jpg";
    moveImage(screenshotURI, newImagePath);
    deleteImage(board.imagePath);
    setBoard((prevboard) => ({
      ...prevboard,
      id: newBoardId,
      imagePath: newImagePath,
    }));
    return await updateBoardImagePath(newBoardId, newImagePath);
  };

  const moveImage = async (from, to) => {
    const res = await FileSystem.moveAsync({
      from: from,
      to: to,
    });
    return res;
  };

  const deleteImage = async (fileName) => {
    if (fileName.length) {
      return await FileSystem.deleteAsync(fileName, {
        idempotent: true,
      });
    }
    return;
  };

  const saveImage = async () => {
    try {
      setShowModal(false);
      const screenshotURI = await takeScreenshot({
        format: "jpg",
        fileName: "Brite-Lite-",
      });
      if (screenshotURI) {
        await MediaLibrary.saveToLibraryAsync(screenshotURI);
        showSaveToast("Saved to Gallery");
      } else {
        showSaveToast("An error occurred saving file");
      }
    } catch (error) {
      console.log("error saveImage", error);
    }
  };

  const handleOpenSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const handleSave = async (item) => {
    setIsSaving(true);
    if (item === "Brite-Lite file") {
      const newBoardId = await saveBoard(boxes, board);
      if (newBoardId) {
        await handleScreenshot(newBoardId, board);
        setIsSaving(false);
        setShowModal(false);
        showSaveToast("Saved successfully");
      } else {
        showSaveToast("An error occurred saving file");
      }
      return;
    }

    if (item === "Image file") {
      try {
        let getPerms = await MediaLibrary.getPermissionsAsync(true);
        if (getPerms.granted) {
          saveImage();
          return;
        }
        if (getPerms.canAskAgain) {
          let reqPerms = await MediaLibrary.requestPermissionsAsync(true);
          if (reqPerms.granted) {
            saveImage();
            return;
          }
        }
        if (!getPerms.canAskAgain) {
          setShowSettingsModal(true);
        }
      } catch (error) {
        console.log("error requestPermissions", error);
      } finally {
        setIsSaving(false);
        setShowModal(false);
      }
    }
    setIsSaving(false);
    setShowModal(false);
  };

  return (
    <>
      <MaterialCommunityIconsComponent
        onPress={() => setShowModal(true)}
        containerStyle={containerFooter}
        icon={{ name: "tray-arrow-down", size: 28, color: "white" }}
      />
      <ModalComponent
        isVisible={showModal}
        title={"Save"}
        closeModal={() => setShowModal(false)}
      >
        <>
          {isSaving && (
            <ActivityIndicator size="large" style={styles.activityIndicator} />
          )}
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
                    icon={{
                      name: "tray-arrow-down",
                      size: 28,
                      color: "#484848",
                    }}
                  />
                  <Text style={styles.text}>{item}</Text>
                </Pressable>
              );
            })}
          </View>
        </>
      </ModalComponent>
      <ModalComponent
        isVisible={showSettingsModal}
        title={"Allow Brite-Lite to access your files?"}
        body={
          "This will allow Brite-Lite to save your Image.\n\nTo enable this, tap Settings below and then tap the Permissions menu"
        }
        closeModal={() => setShowSettingsModal(false)}
        button1={{
          text: "No Thanks",
          color: buttonColors.gray,
          onPress: () => setShowSettingsModal(false),
        }}
        button2={{
          text: "SETTINGS",
          color: buttonColors.green,
          onPress: () => {
            handleOpenSettings();
            setShowSettingsModal(false);
            setShowModal(true);
          },
        }}
      />
    </>
  );
}

Save.propTypes = {
  boxes: PropTypes.array,
  board: PropTypes.object,
  setBoard: PropTypes.func,
  takeScreenshot: PropTypes.func,
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    color: "#484848",
    paddingHorizontal: 16,
    marginHorizontal: 24,
  },
  activityIndicator: {
    position: "absolute",
    right: 0,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 16,
  },
});
