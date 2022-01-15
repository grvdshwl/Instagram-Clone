import { AuthButton, LandingPageContainer } from "./Landing.styles";

export const LandingScreen = ({ navigation }) => {
  return (
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
  );
};
