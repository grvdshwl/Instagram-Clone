import React, { useLayoutEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";

import { fetchFeed } from "../../redux/feed/feed.action";
import {
  LoadingComponent,
  LoadingContainer,
} from "../common/Loading/Loading.component";
import { FeedCard } from "../feedCard/feedCard.component";

const HomePage = ({ fetchUserFeed, loading, results }) => {
  useLayoutEffect(() => {
    let unsubscribe = firebase
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

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingComponent />
      </LoadingContainer>
    );
  }

  return (
    <>
      {results.length ? (
        <ScrollView>
          {results.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </ScrollView>
      ) : (
        <Text>No Post...</Text>
      )}
    </>
  );
};

const mapStateToProps = ({ feed: { feedLoading, feedData } }) => ({
  loading: feedLoading,
  results: feedData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserFeed: (data) => dispatch(fetchFeed(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
