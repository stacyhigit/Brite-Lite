import { useContext, useState } from "react";

import ModalComponent from "../ui/ModalComponent";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";
import { buttonColors } from "../../constants/colors";
import { containerFooter } from "../../constants/styles";
import { BoardContext } from "../../store/board-context";

export default function EraseBoard() {
  const [showModal, setShowModal] = useState(false);

  const boardCtx = useContext(BoardContext);

  const handleEraseAllBoxes = () => {
    boardCtx.setNewBoxes();
    boardCtx.setNewBoard();
    setShowModal(false);
  };

  return (
    <>
      <MaterialCommunityIconsComponent
        onPress={() => setShowModal(true)}
        containerStyle={containerFooter}
        icon={{ name: "delete-forever", size: 28, color: "white" }}
      />
      <ModalComponent
        isVisible={showModal}
        title={"Erase Board?"}
        body={"This will permanently erase your board"}
        closeModal={() => setShowModal(false)}
        button1={{
          text: "Cancel",
          color: buttonColors.gray,
          onPress: () => setShowModal(false),
        }}
        button2={{
          text: "ERASE",
          color: buttonColors.red,
          onPress: handleEraseAllBoxes,
        }}
      />
    </>
  );
}
