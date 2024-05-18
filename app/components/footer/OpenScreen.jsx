import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  boxes as fishBoxes,
  board as fishBoard,
} from "../../../assets/templates/fish";
import {
  boxes as flowersBoxes,
  board as flowersBoard,
} from "../../../assets/templates/flowers";
import { deleteBoards, getAllBoards } from "../../util/database";
import Thumbnail from "./Thumbnail";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";
import ModalComponent from "../ui/ModalComponent";
import { buttonColors } from "../../constants/colors";
import ThumbnailPreset from "./ThumbnailPreset";

export default function OpenScreen({ navigation, route }) {
  const [allBoards, setAllBoards] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [checkedList, setCheckedList] = useState(() => new Set());
  const [showModal, setShowModal] = useState(false);

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
    await deleteBoards(checkedList);
    getBoards();
    setShowModal(false);
    if (checkedList.has(route.params.boardId)) {
      navigation.navigate("Main", { erase: true });
    } else {
      navigation.navigate("Main");
    }
  };

  async function getBoards() {
    const allBoards = await getAllBoards();
    setAllBoards(allBoards);
  }

  useEffect(() => {
    getBoards();
  }, [navigation]);

  return (
    <>
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
              boxes={fishBoxes}
              handlePress={() => handlePress(fishBoard, fishBoxes)}
            />
            <ThumbnailPreset
              board={flowersBoard}
              boxes={flowersBoxes}
              handlePress={() => handlePress(flowersBoard, flowersBoxes)}
            />
          </View>
        </View>
      </ScrollView>
      <ModalComponent
        isVisible={showModal}
        title={
          checkedList.size === 1
            ? `Delete ${checkedList.size} board?`
            : `Delete ${checkedList.size} boards?`
        }
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
      />
    </>
  );
}

OpenScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
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
  image: {
    resizeMode: "contain",
    backgroundColor: "#ccc",
  },
  alignRight: {
    marginLeft: "auto",
  },
});
