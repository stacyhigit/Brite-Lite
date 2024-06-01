import { StyleSheet, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Main from "./app/components/Main";
import OpenScreen from "./app/components/footer/OpenScreen";
import BoardContextProvider from "./app/store/board-context";
import { buttonColors } from "./app/constants/colors";

const Stack = createNativeStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      contentContainerStyle={styles.toastContainer}
      style={styles.success}
      text1Style={styles.text1Style}
      renderLeadingIcon={() => (
        <View style={styles.icon}>
          <MaterialCommunityIcons name="check-circle" size={28} color="white" />
        </View>
      )}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      contentContainerStyle={styles.toastContainer}
      style={styles.error}
      text1Style={styles.text1Style}
      renderLeadingIcon={() => (
        <View style={styles.icon}>
          <MaterialCommunityIcons name="alert-circle" size={28} color="white" />
        </View>
      )}
    />
  ),
};

export default function App() {
  return (
    <BoardContextProvider>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OpenScreen"
            component={OpenScreen}
            options={{ title: "Open" }}
          />
        </Stack.Navigator>
        <Toast config={toastConfig} />
      </NavigationContainer>
    </BoardContextProvider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    paddingHorizontal: 12,
  },
  text1Style: {
    color: "white",
    fontSize: 16,
  },
  success: {
    backgroundColor: buttonColors.green,
    borderLeftColor: buttonColors.green,
  },
  error: {
    backgroundColor: buttonColors.red,
    borderLeftColor: buttonColors.red,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
});
