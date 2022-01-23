import { Camera } from "expo-camera";
import React, { useLayoutEffect, useRef, useState } from "react";
import { View, Text, AppState } from "react-native";
import styled from "styled-components";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 85%;
`;

const CameraIcon = styled(Avatar.Icon).attrs({
  size: 80,
  icon: "camera",
  backgroundColor: "black",
})``;

const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin: 0 25px;
`;

const SwitchCameraIcon = styled(Avatar.Icon).attrs({
  size: 60,
  icon: "camera-party-mode",
  backgroundColor: "black",
})``;

const GalleryIcon = styled(Avatar.Icon).attrs({
  size: 60,
  icon: "image-area",
  backgroundColor: "black",
})``;

export const TakeImage = ({ handleImage }) => {
  const cameraRef = useRef();
  const appState = useRef(AppState.currentState);

  const [hasPermission, setHasPermission] = useState("");
  const [isActive, setIsActive] = useState(appState.current);
  const [frontCam, setFrontCam] = useState(true);
  const isFocused = useIsFocused();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    });

    if (!result?.cancelled) {
      let image = {
        uri: result.uri,
        front: false,
      };
      handleImage(image);
    }
  };

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
      });

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

  useLayoutEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useLayoutEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;

      setIsActive(appState.current === "active");
    });

    return () => {
      if (subscription?.remove) {
        subscription?.remove();
      }
    };
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {isActive && isFocused ? (
        <>
          <ProfileCamera
            type={
              frontCam
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            }
            ref={cameraRef}
          />

          <IconContainer>
            <TouchableOpacity onPress={pickImage}>
              <GalleryIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={snap}>
              <CameraIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleCamera}>
              <SwitchCameraIcon />
            </TouchableOpacity>
          </IconContainer>
        </>
      ) : (
        <View />
      )}
    </>
  );
};
