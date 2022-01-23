import React from "react";
import { Button, Card } from "react-native-paper";
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import { saveProfilePic } from "./editProfile.services";

const EditProfileCard = styled(Card)`
  top: 30%;
  left: 12.5%;
  width: 320px;
  height: 150px;
  position: absolute;
  z-index: 100;
`;

const EditProfileButton = styled(Button)`
  margin: 12px 40px;
`;

export const EditProfileForm = ({ navigation, hideModal }) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
    });

    if (!result.cancelled) {
      hideModal();
      saveProfilePic(result.uri);
    }
  };

  const clickImage = () => {
    navigation.navigate("TakeProfileImage");
  };

  return (
    <EditProfileCard>
      <EditProfileButton mode="outlined" onPress={pickImage}>
        Choose From Gallery
      </EditProfileButton>
      <EditProfileButton mode="outlined" onPress={clickImage}>
        Take Image
      </EditProfileButton>
    </EditProfileCard>
  );
};
