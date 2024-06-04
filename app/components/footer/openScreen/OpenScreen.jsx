import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";

import { board as fishBoard } from "../../../../assets/templates/fish";
import { board as flowersBoard } from "../../../../assets/templates/flowers";
import images from "../../../../assets/images/imagesBase64";

import { deleteBoards, getAllBoards, getBoxes } from "../../../util/database";
import { BoardContext } from "../../../store/board-context";

import Thumbnail from "./Thumbnail";
import ThumbnailPreset from "./ThumbnailPreset";
import ActivityIndicatorComponent from "../../ui/ActivityIndicatorComponent";
import OpenScreenHeader from "./OpenScreenHeader";
import { deleteImage } from "../../../util/shared";
import DeleteModal from "./DeleteModal";
import { thumbnailWidth, thumbnailMargin } from "../../../constants/values";
import NewBoard from "./NewBoard";

export default function OpenScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const columnCount = Math.floor(
    (width - thumbnailMargin * 2) / (thumbnailWidth + thumbnailMargin)
  );

  const [allBoards, setAllBoards] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [checkedList, setCheckedList] = useState(() => new Set());
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const boardCtx = useContext(BoardContext);

  const handleGetBoxes = async (id) => {
    const newBoxes = await getBoxes(id);
    boardCtx.setBoxes(newBoxes);
    boardCtx.setIsLoading(false);
  };

  const handleGetPresetBoxes = async (boxes) => {
    try {
      if (boxes === "fish") {
        const newBoxes = await import("../../../../assets/templates/fish");
        boardCtx.setBoxes(newBoxes.boxes);
      }
      if (boxes === "flowers") {
        const newBoxes = await import("../../../../assets/templates/flowers");
        boardCtx.setBoxes(newBoxes.boxes);
      }
    } catch (error) {
      console.log("error handleGetPresetBoxes", error);
    } finally {
      boardCtx.setIsLoading(false);
    }
  };

  const handlePress = async (board, boxes = null) => {
    if (showCheckboxes) {
      return checkedList.has(board.id)
        ? removeCheck(board.id)
        : addCheck(board.id);
    } else {
      boardCtx.setIsLoading(true);
      setTimeout(() => {
        boardCtx.setBoard(board);
        if (boxes) {
          handleGetPresetBoxes(boxes);
        } else {
          handleGetBoxes(board.id);
        }
      }, 0);
      navigation.navigate("Main");
    }
  };

  const addCheck = (id) => {
    id && setCheckedList((prev) => new Set(prev).add(id));
  };

  const removeCheck = (id) => {
    setCheckedList((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleDeleteRequest = async () => {
    setIsDeleting(true);
    setShowCheckboxes(false);

    const prevChecklist = new Set([...checkedList]);
    setCheckedList(new Set());

    await deleteBoards(checkedList);
    await getBoards();
    setShowModal(false);
    setIsDeleting(false);

    if (prevChecklist.has(boardCtx.board.id)) {
      boardCtx.setBoard((prevBoard) => ({
        ...prevBoard,
        id: null,
        imagePath: "",
      }));
    }
    allBoards.forEach((board) => {
      if (prevChecklist.has(board.id)) {
        deleteImage(board.imagePath);
      }
    });
  };

  async function getBoards() {
    const allBoards = await getAllBoards();
    setAllBoards(allBoards);
  }

  const handleDeletePress = useCallback(async () => {
    if (checkedList.size === 0) {
      setShowCheckboxes((prev) => !prev);
    } else {
      setShowModal(true);
    }
  }, [checkedList.size]);

  const renderItem = ({ item }) => (
    <Thumbnail
      board={item}
      handlePress={() => handlePress(item)}
      showCheckboxes={showCheckboxes}
      setShowCheckboxes={setShowCheckboxes}
      addCheck={addCheck}
      removeCheck={removeCheck}
      checkedList={checkedList}
    />
  );

  const Presets = () => {
    return (
      <>
        <View style={styles.sectionContainer}>
          <Text style={styles.text}>Presets</Text>
        </View>
        <View style={styles.imageContainer}>
          <ThumbnailPreset
            board={fishBoard}
            handlePress={() => handlePress(fishBoard, "fish")}
            image={images.fish}
          />
          <ThumbnailPreset
            board={flowersBoard}
            handlePress={() => handlePress(flowersBoard, "flowers")}
            image={images.flowers}
          />
        </View>
      </>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPressOut={handleDeletePress}>
          <MaterialCommunityIcons
            name="delete-forever"
            size={32}
            color="black"
          />
        </Pressable>
      ),
    });
  }, [navigation, handleDeletePress]);

  useEffect(() => {
    getBoards();
  }, [navigation]);

  return (
    <GestureHandlerRootView>
      {boardCtx.isLoading ? (
        <ActivityIndicatorComponent />
      ) : (
        <>
          {showCheckboxes && (
            <OpenScreenHeader
              setShowCheckboxes={setShowCheckboxes}
              setCheckedList={setCheckedList}
              checkedListSize={checkedList.size}
            />
          )}
          <View style={{ marginHorizontal: thumbnailMargin }}>
            <FlatList
              data={allBoards}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              numColumns={columnCount}
              persistentScrollbar={true}
              ListFooterComponent={Presets}
            />
          </View>
        </>
      )}
      <NewBoard />
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        checkedList={checkedList}
        isDeleting={isDeleting}
        handleDeleteRequest={handleDeleteRequest}
      />
    </GestureHandlerRootView>
  );
}

OpenScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginBottom: 6,
  },
  sectionContainer: {
    marginLeft: 8,
    marginTop: 16,
  },
  imageContainer: {
    flexDirection: "row",
  },
});
