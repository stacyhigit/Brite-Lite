import ModalComponent from "../ui/ModalComponent";
import { buttonColors } from "../../constants/colors";
import { useState } from "react";
import MaterialIconsComponent from "../ui/MaterialIconsComponent";
import { containerFooter } from "../../constants/styles";

export default function EraseBoard({ eraseAllBoxes }) {
  const [showModal, setShowModal] = useState(false);

  const handleEraseAllBoxes = () => {
    eraseAllBoxes();
    setShowModal(false);
  };

  return (
    <>
      <MaterialIconsComponent
        onPress={() => setShowModal(true)}
        containerStyle={containerFooter}
        icon={{ name: "note-add", size: 28, color: "white" }}
      />
      <ModalComponent
        isVisible={showModal}
        title={"Create New Board?"}
        body={"This will permanently erase your current board"}
        closeModal={() => setShowModal(false)}
        button1={{
          text: "Cancel",
          color: buttonColors.gray,
          onPress: () => setShowModal(false),
        }}
        button2={{
          text: "NEW BOARD",
          color: buttonColors.red,
          onPress: handleEraseAllBoxes,
        }}
      />
    </>
  );
}
