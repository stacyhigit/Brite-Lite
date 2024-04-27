import { Modal, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import ButtonComponent from "./ButtonComponent";

export default function ModalComponent({
  isVisible,
  title,
  body,
  button1,
  button2,
}) {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textBody}>{body}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonComponent onPress={button1.onPress} color={button1.color}>
              {button1.text}
            </ButtonComponent>
            <ButtonComponent onPress={button2.onPress} color={button2.color}>
              {button2.text}
            </ButtonComponent>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalComponent.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  button1: PropTypes.object,
  button2: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000080",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 60,
    width: "85%",
    borderWidth: 1,
    borderColor: "#25292e",
    borderRadius: 12,
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textContainer: {
    marginBottom: 20,
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
