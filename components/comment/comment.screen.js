import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import AddComment from "./addComment";
import { Comment } from "./comment.component";
import styled from "styled-components";
import firebase, { getUserById } from "../../firebase/index";

const commentHeight = Dimensions.get("window").height - 110;

const CommentBox = styled.View`
  height: 600px;
  ${({ height }) => height && `height:${height}px;`}
`;

const CommentScreen = ({ currentUser, route }) => {
  const { post, addComment } = route.params;
  const { userId, id } = post;
  const [comments, setComments] = useState([]);

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
  return (
    <ScrollView>
      <CommentBox height={commentHeight}>
        <ScrollView>
          {comments.map((comment) => (
            <Comment key={comment.id} data={comment} profileSize={70} />
          ))}
        </ScrollView>
      </CommentBox>
      {addComment && (
        <ScrollView>
          <AddComment currentUser={currentUser} post={post} />
        </ScrollView>
      )}
    </ScrollView>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(CommentScreen);
