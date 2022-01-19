import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 80%;
`;

const CameraIconContainer = styled(View)`
  display: flex;
  flex: 0.8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CameraIcon = styled(Avatar.Icon).attrs({
  size: 80,
  icon: "camera",
  backgroundColor: "black",
})`
  margin: 5px 0;
`;

const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

const SwitchCameraIcon = styled(Avatar.Icon).attrs({
  size: 50,
  icon: "camera-party-mode",
  backgroundColor: "black",
})`
  margin-right: 5px;
`;

export const TakeImage = ({ handleImage }) => {
  const cameraRef = useRef(null);

  const [hasPermission, setHasPermission] = useState("");
  const [frontCam, setFrontCam] = useState(true);
  const isFocused = useIsFocused();

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();

      let image = {
        uri: photo.uri,
        front: false,
      };
      if (frontCam) {
        image = {
          uri: photo.uri,
          front: true,
        };
      }
      handleImage(image);
    }
  };

  const toggleCamera = () => {
    setFrontCam(!frontCam);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {isFocused && (
        <>
          <ProfileCamera
            type={
              frontCam
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            }
            ref={cameraRef}
            ratio={"4:3"}
          />

          <IconContainer>
            <CameraIconContainer>
              <TouchableOpacity onPress={snap}>
                <CameraIcon />
              </TouchableOpacity>
            </CameraIconContainer>
            <TouchableOpacity onPress={toggleCamera}>
              <SwitchCameraIcon />
            </TouchableOpacity>
          </IconContainer>
        </>
      )}
    </>
  );
};
