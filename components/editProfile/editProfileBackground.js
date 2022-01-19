import React from "react";
import styled from "styled-components";

const ProfileBackground = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
`;

export const EditProfileBackground = ({ hideModal }) => {
  return (
    <ProfileBackground
      onPress={() => {
        hideModal();
      }}
    />
  );
};
