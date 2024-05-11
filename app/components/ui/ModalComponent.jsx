import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import ButtonComponent from "./ButtonComponent";

export default function ModalComponent({
  isVisible,
  title,
  body,
  closeModal,
  button1,
  button2,
  children,
}) {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <Pressable style={styles.container} onPress={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>{title}</Text>
              {body && <Text style={styles.textBody}>{body}</Text>}
              {children}
            </View>
            <View style={styles.buttonContainer}>
              <ButtonComponent onPress={button1.onPress} color={button1.color}>
                {button1.text}
              </ButtonComponent>
              {button2 && (
                <ButtonComponent
                  onPress={button2.onPress}
                  color={button2.color}
                >
                  {button2.text}
                </ButtonComponent>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

ModalComponent.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  closeModal: PropTypes.func,
  button1: PropTypes.object,
  button2: PropTypes.object,
  children: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000080",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "white",
    width: "90%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#25292e",
    borderRadius: 12,
    elevation: 10,
  },
  innerContainer: {
    width: "85%",
    maxWidth: 360,
    marginVertical: 20,
  },
  textContainer: {
    marginBottom: 20,
    marginHorizontal: 2,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  textBody: {
    fontSize: 16,
    marginTop: 8,
    color: "#484848",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
