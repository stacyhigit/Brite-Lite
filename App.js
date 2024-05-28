import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./app/components/Main";
import OpenScreen from "./app/components/footer/OpenScreen";
import BoardContextProvider from "./app/store/board-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <BoardContextProvider>
      <NavigationContainer>
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
