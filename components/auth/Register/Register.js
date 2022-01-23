import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { connect } from "react-redux";
import { signUp } from "../../../redux/users/users.action";
import { LoadingComponent } from "../../common/Loading/Loading.component";
import { ErrorText } from "../../common/styles/styles";
import {
  RegisterAnimationCover,
  RegisterButton,
  RegisterContainer,
  RegisterTextInput,
} from "./Register.styles";
import AnimatedLottieView from "lottie-react-native";

const RegisterScreen = ({ signUpWithEmail, isLoading, errorMessage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");

  const handleSubmit = () => {
    const data = { name, email, password, confirmPassword };
    signUpWithEmail(data);
  };

  const isDisabled =
    !email || !password || !name || !confirmPassword || isLoading;
  return (
    <>
      <RegisterAnimationCover>
        <AnimatedLottieView
          key="animation"
          autoPlay
          loop
          source={require("../../../assets/register.json")}
        />
      </RegisterAnimationCover>
      <RegisterContainer>
        <RegisterTextInput
          label="Name"
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <RegisterTextInput
          label="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <RegisterTextInput
          label="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <RegisterTextInput
          label="Confirm Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setConfirmpassword(text);
          }}
        />

        {!isLoading ? (
          <RegisterButton disabled={isDisabled} onPress={handleSubmit}>
            Register
          </RegisterButton>
        ) : (
          <LoadingComponent />
        )}
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </RegisterContainer>
    </>
  );
};

const mapStateToProps = ({ user: { errorMessage, authLoading } }) => ({
  errorMessage,
  isLoading: authLoading,
});

const mapDispatchToProps = (dispatch) => ({
  signUpWithEmail: (data) => {
    dispatch(signUp(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
