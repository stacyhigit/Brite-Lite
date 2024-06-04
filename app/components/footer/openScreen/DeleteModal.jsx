import ModalComponent from "../../ui/ModalComponent";
import PropTypes from "prop-types";

import { buttonColors } from "../../../constants/colors";

export default function DeleteModal({
  showModal,
  setShowModal,
  checkedList,
  isDeleting,
  handleDeleteRequest,
}) {
  const getDeleteModalTitle = () => {
    if (isDeleting || checkedList.size === 0) {
      return "Deleting...";
    }
    if (checkedList.size === 1) {
      return `Delete ${checkedList.size} board?`;
    }
    return `Delete ${checkedList.size} boards?`;
  };

  return (
    <ModalComponent
      isVisible={showModal}
      showActivityIndicator={isDeleting}
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
    ></ModalComponent>
  );
}

DeleteModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  checkedList: PropTypes.object,
  isDeleting: PropTypes.bool,
  handleDeleteRequest: PropTypes.func,
};
