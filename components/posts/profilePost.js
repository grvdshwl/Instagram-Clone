import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import styled from "styled-components";

const ProfileImageContainer = styled.ScrollView.attrs({
  contentContainerStyle: { flexDirection: "row", flexWrap: "wrap" },
})``;

export const ProfilePost = ({ posts }) => {
  return (
    <ProfileImageContainer>
      {posts.map((item) => {
        const { downloadURL, caption, id } = item;
        return (
          <Image
            key={id}
            style={{ width: 120, height: 120, margin: 5 }}
            source={{ uri: `${downloadURL}` }}
          />
        );
      })}
    </ProfileImageContainer>
  );
};
