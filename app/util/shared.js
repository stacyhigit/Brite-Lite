import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";

export const showToast = (type, text1) => {
  Toast.show({
    type: type,
    text1: text1,
    visibilityTime: 5000,
    position: "bottom",
    onPress: () => Toast.hide(),
  });
};

export const deleteImage = async (fileName) => {
  if (fileName.length) {
    const res = await FileSystem.deleteAsync(fileName, {
      idempotent: true,
    });
    return res;
  }
  return;
};

export const moveImage = async (from, to) => {
  const res = await FileSystem.moveAsync({
    from: from,
    to: to,
  });
  return res;
};
