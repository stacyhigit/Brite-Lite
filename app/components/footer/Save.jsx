import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useContext, useState } from "react";

import * as MediaLibrary from "expo-media-library";
import PropTypes from "prop-types";

import ModalComponent from "../ui/ModalComponent";
import { globalStyles } from "../../constants/styles";
import { saveBoard } from "../../util/database";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";
import { buttonColors } from "../../constants/colors";
import { BoardContext } from "../../store/board-context";
import { deleteImage, showToast } from "../../util/shared";

export default function Save({ takeScreenshot }) {
  const [showModal, setShowModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const boardCtx = useContext(BoardContext);

  const saveList = ["Image file", "Brite-Lite file"];

  const moveImage = async (from, to) => {
    const res = await FileSystem.moveAsync({
      from: from,
      to: to,
    });
    return res;
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
        showToast("success", "Saved to Gallery");
      } else {
        showToast("error", "An error occurred saving file");
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
      const prevImagePath = boardCtx.board.imagePath;
      const screenshotURI = await takeScreenshot({
        format: "jpg",
        width: 100,
        quality: 0.5,
        fileName: "Brite-Lite-",
      });
      const docDir = FileSystem.documentDirectory;
      const newImagePath = docDir + "thumbnail" + Date.now() + ".jpg";
      moveImage(screenshotURI, newImagePath);
      const newBoardId = await saveBoard(
        newImagePath,
        boardCtx.boxes,
        boardCtx.board
      );
      if (newBoardId) {
        setIsSaving(false);
        setShowModal(false);
        showToast("success", "Saved successfully");
        if (prevImagePath) {
          await deleteImage(prevImagePath);
        }
        boardCtx.setBoard((prevboard) => ({
          ...prevboard,
          id: newBoardId,
          imagePath: newImagePath,
        }));
      } else {
        setIsSaving(false);
        setShowModal(false);
        showToast("error", "An error occurred saving file");
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
        containerStyle={globalStyles.containerFooterIcon}
        icon={{ name: "tray-arrow-down", size: 28, color: "white" }}
      />
      <ModalComponent
        isVisible={showModal}
        showActivityIndicator={isSaving}
        title={"Save"}
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
                disabled={isSaving}
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
  text: {
    fontSize: 16,
    marginHorizontal: 16,
  },
});
