import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components";

export const LoadingComponent = styled(ActivityIndicator).attrs({
  animating: true,
  size: 50,
})`
  margin: 10px;
`;

export const LoadingContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
