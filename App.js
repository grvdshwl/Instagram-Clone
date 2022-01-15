import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { SafeArea } from "./components/common/SafeArea/SafeArea.component";
import { LogBox } from "react-native";

import Navigation from "./Navigation";
import { store } from "./redux/store";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function App() {
  return (
    <>
      <SafeArea>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeArea>
      <ExpoStatusBar style="auto" />
    </>
  );
}
