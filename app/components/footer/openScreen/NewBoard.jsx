import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { buttonColors } from "../../../constants/colors";
import MaterialCommunityIconsComponent from "../../ui/MaterialCommunityIconsComponent";
import { useContext, useState } from "react";
import ModalComponent from "../../ui/ModalComponent";
import { BoardContext } from "../../../store/board-context";
import { globalStyles } from "../../../constants/styles";

export default function NewBoard() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const boardCtx = useContext(BoardContext);

  const handleNewRequest = () => {
    boardCtx.setNewBoxes();
    boardCtx.setNewBoard();
    setShowModal(false);
    navigation.navigate("Main");
  };

  return (
    <>
      <Pressable
        onPress={() => setShowModal(true)}
        style={({ pressed }) => [
          styles.container,
          pressed && globalStyles.pressedStyle,
        ]}
      >
        <MaterialCommunityIconsComponent
          icon={{ name: "plus", size: 32, color: "white" }}
        />
      </Pressable>
      <ModalComponent
        isVisible={showModal}
        title={"Create New Board?"}
        closeModal={() => setShowModal(false)}
        button1={{
          text: "Cancel",
          color: buttonColors.gray,
          onPress: () => setShowModal(false),
        }}
        button2={{
          text: "NEW BOARD",
          color: buttonColors.red,
          onPress: handleNewRequest,
        }}
      >
        <View style={styles.textContainer}>
          <MaterialCommunityIconsComponent
            icon={{ name: "alert", size: 36, color: "red" }}
          />
          <Text style={styles.text}>
            This will permanently erase your current board
          </Text>
        </View>
      </ModalComponent>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 40,
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: buttonColors.blue,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 14,
    marginVertical: 15,
  },
  text: {
    fontSize: 16,
  },
});
