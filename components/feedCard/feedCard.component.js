import React from "react";
import { Text } from "react-native";
import { Avatar } from "react-native-paper";
import styled from "styled-components";

export const FeedCardContainer = styled.View``;

export const FeedDescription = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FeedProfileAvatar = styled(Avatar.Image).attrs({
  size: 50,
})`
  margin: 20px;
`;
export const FeedDescriptionBox = styled.View``;

export const FeedImage = styled.Image`
  width: 100%;
  height: 250px;
`;

export const FeedCard = ({ item }) => {
  const { name, downloadURL } = item;
  return (
    <FeedCardContainer>
      <FeedDescription>
        <FeedProfileAvatar
          source={{
            uri: "https://deadline.com/wp-content/uploads/2021/04/David-Beckham1-e1618304293407.jpg",
          }}
        />
        <FeedDescriptionBox>
          <Text>{name}</Text>
        </FeedDescriptionBox>
      </FeedDescription>
      <FeedImage source={{ uri: `${downloadURL}` }} />
    </FeedCardContainer>
  );
};
