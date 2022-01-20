import React, { useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { saveLike, saveUnlike } from "./feedCard.services";
import firebase from "../../firebase/index";

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

export const LikeButton = styled(TouchableOpacity)`
  margin: 10px;
`;

export const CommentButton = styled(TouchableOpacity)`
  margin: 10px;
`;

export const ButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

export const LikedText = styled.Text`
  margin: 0 10px;
  font-weight: bold;
`;

export const FeedCard = ({ item }) => {
  const {
    userId,
    id,
    name,
    downloadURL,
    profile_pic = "https://deadline.com/wp-content/uploads/2021/04/David-Beckham1-e1618304293407.jpg",
  } = item;

  const [likes, setLikes] = useState([]);

  const currentUserId = firebase.auth().currentUser.uid;

  useLayoutEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(id)
      .collection("likes")
      .onSnapshot((snapshot) => {
        const likeArray = snapshot.docs.map((doc) => {
          return doc.id;
        });

        setLikes(likeArray);
      });
  }, []);

  const handleLike = () => {
    saveLike(item);
  };

  const handleUnlike = () => {
    saveUnlike(item);
  };

  let isLiked = likes.includes(currentUserId);

  return (
    <FeedCardContainer>
      <FeedDescription>
        <FeedProfileAvatar
          source={{
            uri: `${profile_pic}`,
          }}
        />
        <FeedDescriptionBox>
          <Text>{name}</Text>
        </FeedDescriptionBox>
      </FeedDescription>
      <FeedImage source={{ uri: `${downloadURL}` }} />
      <ButtonWrapper>
        <LikeButton onPress={isLiked ? handleUnlike : handleLike}>
          <FontAwesome
            name={isLiked ? "heart" : "heart-o"}
            size={32}
            color={isLiked ? "red" : "black"}
          />
        </LikeButton>

        <CommentButton>
          <FontAwesome name="comment-o" size={32} color={"black"} />
        </CommentButton>
      </ButtonWrapper>
      {!!likes.length && (
        <LikedText>{`${likes.length} ${
          likes.length > 1 ? "Likes" : "Like"
        }`}</LikedText>
      )}
    </FeedCardContainer>
  );
};
