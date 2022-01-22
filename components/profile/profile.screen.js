import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";

import { connect } from "react-redux";
import {
  fetchUserPost,
  logOut,
  setCurrentUser,
} from "../../redux/users/users.action";
import {
  LoadingComponent,
  LoadingContainer,
} from "../common/Loading/Loading.component";
import { Profile } from "./profile.component";
import firebase from "../../firebase/index";

const ProfileScreen = ({
  fetchPost,
  posts,
  currentUser,
  logOut,
  navigation,
  setUser,
}) => {
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        const data = {
          ...doc.data(),
          id: doc.id,
        };

        setUser(data);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchPost();
  }, [isFocused]);
  return (
    <>
      {!isFocused || !posts ? (
        <LoadingContainer>
          <LoadingComponent />
        </LoadingContainer>
      ) : (
        <Profile
          posts={posts}
          userData={currentUser}
          logOut={logOut}
          navigation={navigation}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ user: { posts, currentUser } }) => ({
  posts,

  currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  fetchPost: () => dispatch(fetchUserPost()),
  logOut: () => dispatch(logOut()),
  setUser: (data) => dispatch(setCurrentUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
