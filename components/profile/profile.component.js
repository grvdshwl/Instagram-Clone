import firebase, { fetchUserFollowingData } from "../../firebase/index.js";
import React, { useLayoutEffect, useState } from "react";
import AnimatedLottieView from "lottie-react-native";

import { ProfilePost } from "../posts/profilePost";

import {
  DescriptionBox,
  DescriptionInfo,
  DescriptionName,
  DetailsBox,
  FollowBox,
  FollowButton,
  FollowingButton,
  InfoBold,
  InfoBox,
  InfoLight,
  ProfileAvatar,
  ProfileButton,
  ProfileButtonWrapper,
  ProfileContainer,
  ProfileDescription,
} from "./profile.styles";
import { followRequest, unfollowRequest } from "./profile.services.js";
import { EditProfileModal } from "../editProfile/editProfileModal.js";
import { AnimationCover } from "../common/styles/styles.js";

export const Profile = ({ posts, userData, logOut, navigation }) => {
  const {
    name,
    profile_pic = "https://deadline.com/wp-content/uploads/2021/04/David-Beckham1-e1618304293407.jpg",
  } = userData;
  const followCondition = userData.id !== firebase.auth().currentUser.uid;
  const [following, setFollowing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [followingCount, setFollowingCount] = useState("");
  const [followersCount, setFollowersCount] = useState("");

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

  useLayoutEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("following")
      .doc(userData.id)
      .collection("userFollowing")
      .onSnapshot((snapShot) => {
        const followingData = snapShot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        setFollowingCount(followingData.length);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("followers")
      .doc(userData.id)
      .collection("userFollowers")
      .onSnapshot((snapShot) => {
        const followersData = snapShot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        setFollowersCount(followersData.length);
      });

    return () => {
      unsubscribe();
    };
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
          <DescriptionInfo>
            <InfoBox>
              <InfoBold>{posts.length}</InfoBold>
              <InfoLight>posts</InfoLight>
            </InfoBox>
            <InfoBox>
              <InfoBold>{followersCount}</InfoBold>
              <InfoLight>followers</InfoLight>
            </InfoBox>
            <InfoBox>
              <InfoBold>{followingCount}</InfoBold>
              <InfoLight>following</InfoLight>
            </InfoBox>
          </DescriptionInfo>

          {followCondition &&
            following !== null &&
            (!following ? (
              <FollowBox>
                <FollowButton onPress={handleFollow}>follow</FollowButton>
              </FollowBox>
            ) : (
              <FollowBox>
                <FollowingButton onPress={handleUnfollow}>
                  following
                </FollowingButton>
              </FollowBox>
            ))}

          {!followCondition && (
            <ProfileButtonWrapper>
              <ProfileButton onPress={handleEdit}>Edit</ProfileButton>

              <ProfileButton onPress={logOut}>LogOut</ProfileButton>
            </ProfileButtonWrapper>
          )}
        </DescriptionBox>
      </ProfileDescription>
      <DetailsBox>
        <DescriptionName>{name}</DescriptionName>
      </DetailsBox>

      {showModal && (
        <EditProfileModal navigation={navigation} hideModal={handleEdit} />
      )}
      {!posts.length ? (
        <AnimationCover>
          <AnimatedLottieView
            key="animation"
            autoPlay
            loop
            source={require("../../assets/tumbleweed-rolling.json")}
          />
        </AnimationCover>
      ) : (
        <ProfilePost posts={posts} />
      )}
    </ProfileContainer>
  );
};
