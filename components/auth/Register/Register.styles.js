import { Button, TextInput } from "react-native-paper";
import styled from "styled-components";
export const RegisterContainer = styled.View``;

export const RegisterButton = styled(Button).attrs({
  mode: "contained",
})`
  margin: 15px 130px;
  margin-bottom: 15px;
  padding: 6px;
`;

export const RegisterTextInput = styled(TextInput).attrs({ isFocused: true })`
  margin: 5px 5px 0 5px;
`;
