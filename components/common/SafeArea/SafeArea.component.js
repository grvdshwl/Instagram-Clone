import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import styled from "styled-components";

export const SafeArea = styled(SafeAreaProvider)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top:${StatusBar.currentHeight}px`}
`;
