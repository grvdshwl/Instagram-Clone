import React from "react";
import AnimatedLottieView from "lottie-react-native";
import styled from "styled-components";
const AnimationCover = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 10px;
`;

const ErrorView = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin: 100px 0;
  align-items: center;
`;

const ErrorText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasErrored: true,
    };
  }

  componentDidCatch(error, info) {
    this.setState(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <AnimationCover>
          <AnimatedLottieView
            key="animation"
            autoPlay
            loop
            source={require("../../assets/error.json")}
          />
          <ErrorView>
            <ErrorText>Please Restart The Application!</ErrorText>
          </ErrorView>
        </AnimationCover>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
