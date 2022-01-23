import { Button, TextInput } from "react-native-paper";
import styled from "styled-components";
export const RegisterContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 220px;
`;

export const RegisterButton = styled(Button).attrs({
  mode: "contained",
})`
  margin: 15px 130px;
  margin-bottom: 15px;
  padding: 6px;
`;

export const RegisterTextInput = styled(TextInput).attrs({ isFocused: true })`
  margin: 5px 10px 0 10px;
`;

export const RegisterAnimationCover = styled.View`
  width: 100%;
  height: 35%;
  position: absolute;
  z-index: -1;
  top: 10px;
`;
