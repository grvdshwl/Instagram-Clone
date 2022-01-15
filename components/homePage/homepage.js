import React from "react";
import { Button } from "react-native-paper";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { logOut } from "../../redux/users/users.action";

const HomePage = ({ logOut, currentUser }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> Hi {currentUser.name}</Text>
      <Button mode="outlined" onPress={logOut}>
        LogOut
      </Button>
    </View>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
