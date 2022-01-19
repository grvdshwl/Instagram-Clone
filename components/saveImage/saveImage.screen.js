import firebase from "../../firebase/index";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Colors, ProgressBar, TextInput } from "react-native-paper";
import styled from "styled-components";
import { CommonButton } from "../common/styles/styles";

const DisplayImage = styled.Image`
  width: 100%;
  height: 75%;
  ${({ front }) => front && "transform: scaleX(-1);"}
  ${({ transfer }) => transfer && "opacity:0.4"}
`;
const CaptionBox = styled(TextInput).attrs({
  multiline: true,
  numberOfLines: 3,
  placeholder: "Write a caption.....",
})`
  margin: 10px 15px;
`;

const CaptionTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
  margin-left: 15px;
`;

const ProgressBarContainer = styled.View`
  top: 35%;
  position: absolute;
  width: 100%;
`;

const ProgressBarText = styled.Text`
  text-align: center;
  font-size: 20px;
  margin: 10px 0;
  color: blue;
`;

export const SaveImageScreen = ({ route, navigation }) => {
  const [caption, setCaption] = useState("");
  const { uri, front } = route.params.image;
  const [transferPercentage, setTransferPercentage] = useState(0);

  const uploadImage = async () => {
    const response = await fetch(uri);
    const blob = await response.blob();
    let childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString()}`;

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      setTransferPercentage(+snapshot.bytesTransferred / +blob.size);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
      });
    };

    const taskError = (error) => console.log(error);

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        navigation.popToTop();
        navigation.navigate("Profile");
      });
  };

  return (
    <View>
      <DisplayImage
        source={{ uri: uri }}
        front={front}
        transfer={transferPercentage}
      />
      {!!transferPercentage && (
        <ProgressBarContainer>
          <ProgressBar progress={transferPercentage} />
          <ProgressBarText>
            {(transferPercentage * 100).toFixed(2)}%
          </ProgressBarText>
        </ProgressBarContainer>
      )}
      <CaptionTitle>#Caption</CaptionTitle>
      <CaptionBox
        onChangeText={(text) => {
          setCaption(text);
        }}
        value={caption}
      />
      <CommonButton onPress={uploadImage} disabled={transferPercentage}>
        Post
      </CommonButton>
    </View>
  );
};
