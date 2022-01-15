import { Button, TextInput } from "react-native-paper";
import styled from "styled-components/native";

export const CommonButton = styled(Button).attrs({
  mode: "contained",
})``;

export const CommonInputContainer = styled(TextInput)``;

export const ErrorText = styled.Text`
  display: flex;
  flex-direction: column;
  align-self: center;
  color: red;
  margin: 10px;
  font-size: 16px;
  font-weight: 700;
`;
