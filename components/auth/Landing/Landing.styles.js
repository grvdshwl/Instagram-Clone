import styled from "styled-components/native";
import { Button } from "react-native-paper";
export const LandingPageContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 100px;
`;

export const AuthButton = styled(Button).attrs({
  mode: "contained",
})`
  margin: 0 125px;
  margin-bottom: 15px;
  padding: 6px;
`;

export const AnimationCover = styled.View`
  width: 100%;
  height: 45%;
  position: absolute;
  top: 10px;
  z-index: -1;
`;
