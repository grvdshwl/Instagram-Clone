import React, { useLayoutEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import styled from "styled-components";
import AnimatedLottieView from "lottie-react-native";
import { AnimationCover } from "../common/styles/styles";

export const ConnectionPage = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);
  useLayoutEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      // To unsubscribe to these update, just use:
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <AnimationCover>
        <AnimatedLottieView
          key="animation"
          autoPlay
          loop
          source={require("../../assets/no-internet.json")}
        />
      </AnimationCover>
    );
  }

  return <>{children}</>;
};
