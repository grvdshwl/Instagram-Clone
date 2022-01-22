import { AuthButton, LandingPageContainer } from "./Landing.styles";
import styled from "styled-components";
import AnimatedLottieView from "lottie-react-native";

const AnimationCover = styled.View`
  width: 100%;
  height: 40%;
  top: 30px;
  position: absolute;
  padding: 16px;
`;

export const LandingScreen = ({ navigation }) => {
  return (
    <>
      <AnimationCover>
        <AnimatedLottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../assets/login.json")}
        />
      </AnimationCover>
      <LandingPageContainer>
        <AuthButton
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login
        </AuthButton>
        <AuthButton
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Register
        </AuthButton>
      </LandingPageContainer>
    </>
  );
};
