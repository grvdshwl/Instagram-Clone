import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import { Text } from "react-native";
import { LoadingComponent, LoadingContainer } from "./Loading.component";

const LoadingPage = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingComponent />
      </LoadingContainer>
    );
  }

  return <>{children}</>;
};

const mapStateToProps = ({ user: { isLoading } }) => ({
  isLoading,
});

export default connect(mapStateToProps)(LoadingPage);
