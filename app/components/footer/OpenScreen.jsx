import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PropTypes from "prop-types";

import { board as fishBoard } from "../../../assets/templates/fish";
import { board as flowersBoard } from "../../../assets/templates/flowers";
import { deleteBoards, getAllBoards } from "../../util/database";
import { buttonColors } from "../../constants/colors";
import { BoardContext } from "../../store/board-context";

import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";
import ModalComponent from "../ui/ModalComponent";
import Thumbnail from "./Thumbnail";
import ThumbnailPreset from "./ThumbnailPreset";
import { activityIndicatorModal } from "../../constants/styles";

export default function OpenScreen({ navigation }) {
  const [allBoards, setAllBoards] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [checkedList, setCheckedList] = useState(() => new Set());
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const boardCtx = useContext(BoardContext);

  const handlePress = async (board, boxes = null) => {
    if (showCheckboxes) {
      checkedList.has(board.id) ? removeCheck(board.id) : addCheck(board.id);
    } else {
      navigation.navigate("Main", { board, boxes });
    }
  };

  const addCheck = (id) => {
    setCheckedList((prev) => new Set(prev).add(id));
  };

  const removeCheck = (id) => {
    setCheckedList((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleDeletePress = async () => {
    if (checkedList.size === 0) {
      setShowCheckboxes((prev) => !prev);
      return;
    } else {
      setShowModal(true);
    }
  };

  const handleDeleteRequest = async () => {
    setIsDeleting(true);
    setShowCheckboxes(false);
    setCheckedList(new Set());
    await deleteBoards(checkedList);
    await getBoards();
    setShowModal(false);
    setIsDeleting(false);
    if (checkedList.has(boardCtx.board.id)) {
      boardCtx.setBoard((prevBoard) => ({
        ...prevBoard,
        id: null,
        imagePath: "",
      }));
    }
  };

  const getDeleteModalTitle = () => {
    if (isDeleting || checkedList.size === 0) {
      return "Deleting...";
    }
    if (checkedList.size === 1) {
      return `Delete ${checkedList.size} board?`;
    }
    return `Delete ${checkedList.size} boards?`;
  };

  async function getBoards() {
    const allBoards = await getAllBoards();
    setAllBoards(allBoards);
  }

  useEffect(() => {
    getBoards();
  }, [navigation]);

  return (
    <GestureHandlerRootView>
      <ScrollView style={styles.container}>
        <View style={[styles.headerContainer, styles.sectionContainer]}>
          {showCheckboxes && (
            <Text style={styles.textHeading}>{checkedList.size} Selected</Text>
          )}
          {allBoards.length > 0 && (
            <MaterialCommunityIconsComponent
              icon={{ name: "delete-forever", size: 32, color: "black" }}
              containerStyle={styles.alignRight}
              onPress={handleDeletePress}
            />
          )}
        </View>
        {allBoards.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.imageContainer}>
              {allBoards.map((board) => (
                <Thumbnail
                  key={board.id}
                  board={board}
                  handlePress={() => handlePress(board)}
                  showCheckboxes={showCheckboxes}
                  setShowCheckboxes={setShowCheckboxes}
                  addCheck={addCheck}
                  removeCheck={removeCheck}
                  checkedList={checkedList}
                />
              ))}
            </View>
          </View>
        )}
        <View style={styles.sectionContainer}>
          <Text style={styles.text}>Presets</Text>
          <View style={styles.imageContainer}>
            <ThumbnailPreset
              board={fishBoard}
              handlePress={() => handlePress(fishBoard, "fish")}
            />
            <ThumbnailPreset
              board={flowersBoard}
              handlePress={() => handlePress(flowersBoard, "flowers")}
            />
          </View>
        </View>
      </ScrollView>
      <ModalComponent
        isVisible={showModal}
        title={getDeleteModalTitle()}
        closeModal={() => setShowModal(false)}
        button1={{
          text: "Cancel",
          color: buttonColors.gray,
          onPress: () => setShowModal(false),
        }}
        button2={{
          text: "DELETE",
          color: buttonColors.red,
          onPress: handleDeleteRequest,
        }}
      >
        <>
          {isDeleting && (
            <ActivityIndicator size="large" style={activityIndicatorModal} />
          )}
        </>
      </ModalComponent>
    </GestureHandlerRootView>
  );
}

OpenScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
  textHeading: {
    fontSize: 18,
    marginBottom: 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionContainer: {
    paddingHorizontal: 24,
    paddingBottom: 12,
    marginBottom: 12,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
  },
  alignRight: {
    marginLeft: "auto",
  },
});
