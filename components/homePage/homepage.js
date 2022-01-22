import React, { useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";

import { fetchFeed } from "../../redux/feed/feed.action";
import {
  LoadingComponent,
  LoadingContainer,
} from "../common/Loading/Loading.component";
import { FeedCard } from "../feedCard/feedCard.component";
import styled from "styled-components";
import { Divider } from "react-native-paper";

const NoPostText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin: 20px 0px;
  text-align: center;
`;

const HomePage = ({ fetchUserFeed, results, navigation }) => {
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

  if (!results) {
    return (
      <LoadingContainer>
        <LoadingComponent />
      </LoadingContainer>
    );
  }

  if (!results.length) {
    return <NoPostText>No Post to display....</NoPostText>;
  }

  return (
    <>
      <ScrollView>
        {results.map((item) => (
          <View key={item.id}>
            <FeedCard item={item} navigation={navigation} />
            <Divider />
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const mapStateToProps = ({ feed: { feedData } }) => ({
  results: feedData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserFeed: (data) => dispatch(fetchFeed(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
