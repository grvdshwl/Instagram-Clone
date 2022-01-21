import React, { useState } from "react";
import styled from "styled-components";
import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { addComment } from "./addComment.service";

const height = Dimensions.get("window").height - 120;

const AddCommentContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

const TextInputView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const CommentBox = styled.TextInput`
  height: 40px;
  color: black;
  flex: 1;
  margin: 0 10px;
`;
const UserProfile = styled(Avatar.Image)`
  margin: 0 5px;
`;

const CommentButton = styled(Button)`
  margin-right: 5px;
  margin-bottom: 10px;
`;

const AddComment = ({ currentUser, post }) => {
  const [comment, setComment] = useState("");

  const { profile_pic } = currentUser;

  const handleComment = () => {
    addComment(post, comment);
    setComment("");
  };

  return (
    <AddCommentContainer
      behavior={Platform.OS === "ios" ? "padding" : ""}
      enabled={true}
      windowHeight={height}
      keyboardVerticalOffset={50}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TextInputView>
          <UserProfile size={40} source={{ uri: profile_pic }} />
          <CommentBox
            autofocus={true}
            placeholder="Enter a comment"
            onChangeText={(text) => setComment(text)}
            value={comment}
          />
          <CommentButton mode="outlined" onPress={handleComment}>
            comment
          </CommentButton>
        </TextInputView>
      </TouchableWithoutFeedback>
    </AddCommentContainer>
  );
};

export default AddComment;
