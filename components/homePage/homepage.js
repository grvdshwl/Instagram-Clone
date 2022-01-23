import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import AnimatedLottieView from "lottie-react-native";

import { fetchFeed } from "../../redux/feed/feed.action";
import {
  LoadingComponent,
  LoadingContainer,
} from "../common/Loading/Loading.component";
import { FeedCard } from "../feedCard/feedCard.component";
import styled from "styled-components";
import { Divider } from "react-native-paper";
import {
  AnimationCover,
  NoPostContainer,
  NoPostText,
} from "../common/styles/styles";

const HomePage = ({ fetchUserFeed, results, navigation, feedUsers }) => {
  const fetchCall = () => {
    return firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapShot) => {
        let data = snapShot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });

        fetchUserFeed(data);
      });
  };

  useLayoutEffect(() => {
    let unsubscribe = fetchCall();

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("allPosts")
      .onSnapshot((snapShot) => {
        fetchCall();
      });

    return () => {
      unsubscribe;
    };
  }, []);

  if (!results) {
    return (
      <LoadingContainer>
        <LoadingComponent />
      </LoadingContainer>
    );
  }

  if (!results.length) {
    return (
      <AnimationCover>
        <AnimatedLottieView
          key="animation"
          autoPlay
          loop
          source={require("../../assets/empty-search.json")}
        />
        <NoPostContainer>
          <NoPostText>No Posts Found....</NoPostText>
        </NoPostContainer>
      </AnimationCover>
    );
  }

  return (
    <>
      <ScrollView>
        {results.map((item) => (
          <View key={item.id}>
            <FeedCard
              item={item}
              navigation={navigation}
              fetchCall={fetchCall}
            />
            <Divider />
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const mapStateToProps = ({ feed: { feedData, feedUsers } }) => ({
  results: feedData,
  feedUsers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserFeed: (data) => dispatch(fetchFeed(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
