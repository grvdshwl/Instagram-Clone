import React from "react";
import { TakeImage } from "../TakeImage/takeImage";

export const AddImageScreen = ({ navigation }) => {
  const saveImage = (image) => {
    navigation.navigate("SaveImage", { image });
  };

  return <TakeImage handleImage={saveImage} />;
};
