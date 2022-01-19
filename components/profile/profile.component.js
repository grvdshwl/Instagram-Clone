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
import { Button } from "react-native-paper";
import { EditProfileModal } from "../editProfile/editProfileModal.js";

export const Profile = ({ posts, userData, logOut, navigation }) => {
  const {
    name,
    profile_pic = "https://deadline.com/wp-content/uploads/2021/04/David-Beckham1-e1618304293407.jpg",
  } = userData;
  const followCondition = userData.id !== firebase.auth().currentUser.uid;
  const [following, setFollowing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const checkIsFollowing = async () => {
    const isFollowing = await fetchUserFollowingData(userData.id);
    setFollowing(isFollowing);
  };

  useLayoutEffect(() => {
    if (followCondition) {
      checkIsFollowing();
    }
  }, [unfollowRequest]);

  const handleFollow = () => {
    followRequest(userData.id);
    checkIsFollowing();
  };

  const handleUnfollow = () => {
    unfollowRequest(userData.id);
    checkIsFollowing();
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
      {posts.length ? (
        <ProfilePost posts={posts} />
      ) : (
        <NoPostText>No Posts To Display.....</NoPostText>
      )}
    </ProfileContainer>
  );
};
