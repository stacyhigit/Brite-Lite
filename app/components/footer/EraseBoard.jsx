import { useState } from "react";
import PropTypes from "prop-types";

import ModalComponent from "../ui/ModalComponent";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";
import { buttonColors } from "../../constants/colors";
import { containerFooter } from "../../constants/styles";

export default function EraseBoard({ eraseAllBoxes }) {
  const [showModal, setShowModal] = useState(false);

  const handleEraseAllBoxes = () => {
    eraseAllBoxes();
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

EraseBoard.propTypes = {
  eraseAllBoxes: PropTypes.func,
};
