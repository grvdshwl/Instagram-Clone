import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { SafeArea } from "./components/common/SafeArea/SafeArea.component";
import { LogBox } from "react-native";

import Navigation from "./Navigation";
import { store } from "./redux/store";
import { ConnectionPage } from "./components/connection/connection.page";
import ErrorBoundary from "./components/errorBoundry/error-boundry";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

export default function App() {
  return (
    <>
      <SafeArea>
        <Provider store={store}>
          <ErrorBoundary>
            <ConnectionPage>
              <Navigation />
            </ConnectionPage>
          </ErrorBoundary>
        </Provider>
      </SafeArea>
      <ExpoStatusBar style="auto" />
    </>
  );
}
