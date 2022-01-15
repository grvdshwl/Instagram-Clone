import { Button, TextInput } from "react-native-paper";
import styled from "styled-components";
export const RegisterContainer = styled.View``;

export const RegisterButton = styled(Button).attrs({
  mode: "contained",
})`
  margin: 10px 0;
`;

export const RegisterTextInput = styled(TextInput).attrs({ isFocused: true })``;
