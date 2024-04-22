import { registerRootComponent } from "expo";

import App from "./app/App";
import ReactNativeFeatureFlags from "react-native/Libraries/ReactNative/ReactNativeFeatureFlags";

ReactNativeFeatureFlags.shouldEmitW3CPointerEvents = () => true;
ReactNativeFeatureFlags.shouldPressibilityUseW3CPointerEventsForHover = () =>
  true;
registerRootComponent(App);
