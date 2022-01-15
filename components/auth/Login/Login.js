import React, { useState } from "react";

import { connect } from "react-redux";
import { signIn } from "../../../redux/users/users.action";
import { LoadingComponent } from "../../common/Loading/Loading.component";
import { ErrorText } from "../../common/styles/styles";
import { LoginButton, LoginContainer, LoginTextInput } from "./Login.styles";

const LoginScreen = ({ signInWithEmail, errorMessage, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    signInWithEmail({ email, password });
  };

  const isDisabled = !email || !password || isLoading;
  return (
    <LoginContainer>
      <LoginTextInput
        label="Email"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <LoginTextInput
        label="Password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />

      {!isLoading ? (
        <LoginButton disabled={isDisabled} onPress={handleSubmit}>
          Login
        </LoginButton>
      ) : (
        <LoadingComponent />
      )}
      {errorMessage && <ErrorText>Incorrect Email or Password</ErrorText>}
    </LoginContainer>
  );
};

const mapStateToProps = ({ user: { errorMessage, authLoading } }) => ({
  errorMessage,
  isLoading: authLoading,
});

const mapDispatchToProps = (dispatch) => ({
  signInWithEmail: (data) => {
    dispatch(signIn(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
