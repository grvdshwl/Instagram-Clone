import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar, Button } from "react-native-paper";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { saveLike, saveUnlike } from "./feedCard.services";
import firebase, { getUserById } from "../../firebase/index";
import { Comment } from "../comment/comment.component";

export const FeedCardContainer = styled.View`
  height: 530px;
`;

export const FeedDescription = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FeedProfileAvatar = styled(Avatar.Image).attrs({
  size: 60,
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

export const CommentsBox = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const CaptionText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  margin: 5px 10px;
`;

export const FeedCard = ({ item, navigation, fetchCall }) => {
  const {
    userId,
    id,
    name,
    downloadURL,
    profile_pic = "https://deadline.com/wp-content/uploads/2021/04/David-Beckham1-e1618304293407.jpg",
  } = item;

  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

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

  useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(id)
      .collection("comment")
      .onSnapshot(async (snapShot) => {
        const commentData = snapShot.docs
          .map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
          .sort(function (a, b) {
            return b.creation - a.creation;
          });

        const newCommentData = commentData.map(async (data) => {
          const userData = await getUserById(data.commenterId);

          return {
            ...userData,
            ...data,
          };
        });

        const data = await Promise.all(newCommentData);
        setComments(data);
      });

    return () => {
      unsubscribe();
    };
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

        <CommentButton
          onPress={() => {
            navigation.navigate("Comments", {
              post: {
                userId: userId,
                id: id,
              },
              addComment: true,
            });
          }}
        >
          <FontAwesome name="comment-o" size={32} color={"black"} />
        </CommentButton>
      </ButtonWrapper>
      {!!likes.length && (
        <LikedText>{`${likes.length} ${
          likes.length > 1 ? "Likes" : "Like"
        }`}</LikedText>
      )}

      {!!item?.caption && <CaptionText>{item.caption}</CaptionText>}

      {!!comments.length && (
        <CommentsBox>
          {comments.slice(0, 1).map((comment) => (
            <Comment key={comment.id} data={comment} profileSize={40} />
          ))}
        </CommentsBox>
      )}
    </FeedCardContainer>
  );
};
