import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./app/components/Main";
import OpenScreen from "./app/components/footer/OpenScreen";
import BoardContextProvider from "./app/store/board-context";

const Stack = createNativeStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
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
      </NavigationContainer>
    </BoardContextProvider>
  );
}
