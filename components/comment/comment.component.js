import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { Avatar } from "react-native-paper";

const CommentContainer = styled.View`
  margin: 10px;
  flex-direction: row;
`;

const UserProfile = styled(Avatar.Image)`
  margin: 0 5px;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const CommenterName = styled.Text`
  font-weight: bold;
  font-size: 12px;
  margin: 5px;
`;

const CommentText = styled.Text`
  margin: 5px;
`;
export const Comment = ({ data, profileSize }) => {
  return (
    <CommentContainer>
      {profileSize && (
        <UserProfile size={profileSize} source={{ uri: data.profile_pic }} />
      )}
      <TextContainer>
        <CommenterName>{data.name}</CommenterName>
        <CommentText>{data.content}</CommentText>
      </TextContainer>
    </CommentContainer>
  );
};
