import Toast from "react-native-toast-message";

export const showToast = (type, text1) => {
  Toast.show({
    type: type,
    text1: text1,
    visibilityTime: 5000,
    position: "bottom",
    onPress: () => Toast.hide(),
  });
};
