import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 88%;
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

const BackIcon = styled(Avatar.Icon).attrs({
  size: 60,
  icon: "backup-restore",
  backgroundColor: "black",
})`
  display: flex;
  margin: 15px 5px;
`;

const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const SwitchCameraIcon = styled(Avatar.Icon).attrs({
  size: 50,
  icon: "camera-party-mode",
  backgroundColor: "black",
})`
  margin-right: 5px;
`;

const DisplayImage = styled.Image`
  width: 100%;
  height: 88%;
`;

export const AddImageScreen = ({ navigation }) => {
  const cameraRef = useRef(null);

  const [hasPermission, setHasPermission] = useState("");
  const [frontCam, setFrontCam] = useState(true);
  const [image, setImage] = useState("");
  const isFocused = useIsFocused();

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
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
          {!image ? (
            <ProfileCamera
              type={
                frontCam
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              }
              ref={cameraRef}
              ratio={"16:9"}
            />
          ) : (
            <DisplayImage source={{ uri: image }} />
          )}

          <IconContainer>
            {!image ? (
              <>
                <CameraIconContainer>
                  <TouchableOpacity onPress={snap}>
                    <CameraIcon />
                  </TouchableOpacity>
                </CameraIconContainer>
                <TouchableOpacity onPress={toggleCamera}>
                  <SwitchCameraIcon />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setImage("");
                }}
              >
                <BackIcon />
              </TouchableOpacity>
            )}
          </IconContainer>
        </>
      )}
    </>
  );
};
