import React from "react";
import { TakeImage } from "../../components/TakeImage/takeImage";
import { saveProfilePic } from "./editProfile.services";

export const EditProfileCamera = ({ navigation }) => {
  const saveImage = (image) => {
    saveProfilePic(image.uri);
    navigation.navigate("ProfileScreen");
  };

  return <TakeImage handleImage={saveImage} />;
};
