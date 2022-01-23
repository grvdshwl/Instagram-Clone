import styled from "styled-components";
import { Avatar, Button, Colors } from "react-native-paper";

export const ProfileContainer = styled.View`
  flex: 1;
  z-index: 1;
`;

export const ProfileDescription = styled.View`
  flex-direction: row;
`;

export const ProfileAvatar = styled(Avatar.Image).attrs({
  size: 120,
})`
  margin: 10px;
`;

export const DescriptionName = styled.Text`
  font-size: 18px;
  padding: 0px 20px;
  font-weight: bold;
`;

export const DescriptionBox = styled.View`
  margin: 10px;
  flex: 1;
`;

export const NoPostText = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;

export const FollowBox = styled.View`
  flex: 1;
  margin: 10px 5px;
`;

export const FollowButton = styled(Button).attrs({
  mode: "contained",
  color: Colors.blue500,
  contentStyle: {
    width: "100%",
  },
})``;

export const FollowingButton = styled(Button).attrs({
  mode: "contained",
  color: Colors.white,
  contentStyle: {
    width: "100%",
  },
})``;
export const ProfileButton = styled(Button).attrs({
  mode: "outlined",
  contentStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
})`
  margin: 0 5px;
  flex: 1;
  justify-content: center;
`;

export const DetailsBox = styled.View`
  margin: 0px 5px;
  margin-bottom: 10px;
`;

export const DescriptionInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
  flex: 1;
`;

export const InfoBox = styled.View`
  align-items: center;
`;

export const InfoBold = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const InfoLight = styled.Text`
  color: grey;
`;

export const ProfileButtonWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
