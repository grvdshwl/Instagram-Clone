import firebase, { fetchUserFollowingData } from "../../firebase/index.js";
import React, { useLayoutEffect, useState } from "react";

import { ProfilePost } from "../posts/profilePost";

import {
  DescriptionBox,
  DescriptionName,
  FollowButton,
  FollowingButton,
  NoPostText,
  ProfileAvatar,
  ProfileButton,
  ProfileContainer,
  ProfileDescription,
} from "./profile.styles";
import { followRequest, unfollowRequest } from "./profile.services.js";
import { EditProfileModal } from "../editProfile/editProfileModal.js";

export const Profile = ({ posts, userData, logOut, navigation }) => {
  const {
    name,
    profile_pic = "https://deadline.com/wp-content/uploads/2021/04/David-Beckham1-e1618304293407.jpg",
  } = userData;
  const followCondition = userData.id !== firebase.auth().currentUser.uid;
  const [following, setFollowing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    if (followCondition) {
      let unsubscribe = firebase
        .firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .onSnapshot((snapShot) => {
          const followingData = snapShot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          const isFollowing = followingData.some(
            (data) => data.id === userData.id
          );

          setFollowing(isFollowing);
        });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  const handleFollow = () => {
    followRequest(userData.id);
  };

  const handleUnfollow = () => {
    unfollowRequest(userData.id);
  };

  const handleEdit = () => {
    setShowModal(!showModal);
  };

  return (
    <ProfileContainer>
      <ProfileDescription>
        <ProfileAvatar
          source={{
            uri: profile_pic,
          }}
        />
        <DescriptionBox>
          <DescriptionName>{name}</DescriptionName>
          {followCondition &&
            following !== null &&
            (!following ? (
              <FollowButton onPress={handleFollow}>follow</FollowButton>
            ) : (
              <FollowingButton onPress={handleUnfollow}>
                following
              </FollowingButton>
            ))}
          {!followCondition && (
            <>
              <ProfileButton onPress={handleEdit}>Edit</ProfileButton>

              <ProfileButton onPress={logOut}>LogOut</ProfileButton>
            </>
          )}
        </DescriptionBox>
      </ProfileDescription>

      {showModal && (
        <EditProfileModal navigation={navigation} hideModal={handleEdit} />
      )}
      {!posts.length ? (
        <NoPostText>No Posts To Display.....</NoPostText>
      ) : (
        <ProfilePost posts={posts} />
      )}
    </ProfileContainer>
  );
};
