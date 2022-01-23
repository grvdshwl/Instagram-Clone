import React, { useLayoutEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import styled from "styled-components";
import AnimatedLottieView from "lottie-react-native";

const AnimationCover = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 10px;
`;

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
