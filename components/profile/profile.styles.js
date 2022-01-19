import styled from "styled-components";
import { Text, View } from "react-native";
import { Avatar, Button, Colors } from "react-native-paper";

export const ProfileContainer = styled.View`
  flex: 1;
  z-index: 1;
`;

export const ProfileDescription = styled.View`
  flex-direction: row;
`;

export const ProfileAvatar = styled(Avatar.Image).attrs({
  size: 180,
})`
  margin: 20px;
`;

export const DescriptionName = styled.Text`
  font-size: 18px;
  padding: 10px 20px;
`;

export const DescriptionBox = styled.View`
  margin-top: 50px;
`;

export const NoPostText = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;

export const FollowBox = styled.View``;

export const FollowButton = styled(Button).attrs({
  mode: "contained",
  color: Colors.blue500,
})`
  margin: 10px 30px;
`;

export const FollowingButton = styled(Button).attrs({
  mode: "contained",
  color: Colors.white,
})`
  margin: 10px 30px;
`;
export const ProfileButton = styled(Button).attrs({
  mode: "outlined",
})`
  margin: 6px 20px;
`;
