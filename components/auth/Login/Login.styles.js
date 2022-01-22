import { Button, TextInput } from "react-native-paper";
import styled from "styled-components";
export const LoginContainer = styled.View``;

export const LoginButton = styled(Button).attrs({
  mode: "contained",
})`
  margin: 15px 150px;
  margin-bottom: 15px;
  padding: 6px;
`;

export const LoginTextInput = styled(TextInput).attrs({ isFocused: true })`
  margin: 5px 5px 0 5px;
`;
