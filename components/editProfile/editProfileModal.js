import React from "react";
import { EditProfileBackground } from "./editProfileBackground";
import { EditProfileForm } from "./editProfileForm";

export const EditProfileModal = ({ navigation, hideModal }) => {
  return (
    <>
      <EditProfileForm navigation={navigation} hideModal={hideModal} />
      <EditProfileBackground hideModal={hideModal} />
    </>
  );
};
