import {
  AnimationCover,
  AuthButton,
  LandingPageContainer,
} from "./Landing.styles";
import AnimatedLottieView from "lottie-react-native";

export const LandingScreen = ({ navigation }) => {
  return (
    <>
      <AnimationCover>
        <AnimatedLottieView
          key="animation"
          autoPlay
          loop
          source={require("../../../assets/landing.json")}
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
