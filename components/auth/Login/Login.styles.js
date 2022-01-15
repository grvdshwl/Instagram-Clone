import { Button, TextInput } from "react-native-paper";
import styled from "styled-components";
export const LoginContainer = styled.View``;

export const LoginButton = styled(Button).attrs({
  mode: "contained",
})`
  margin-top: 5px;
`;

export const LoginTextInput = styled(TextInput).attrs({ isFocused: true })``;
