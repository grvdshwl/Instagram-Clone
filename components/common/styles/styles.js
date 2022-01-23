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

export const AnimationCover = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 10px;
`;

export const NoPostContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin: 100px 0;
  align-items: center;
`;

export const NoPostText = styled.Text`
  font-weight: bold;
  font-size: 22px;
  text-align: center;
`;
