import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../../components/profile/profile.screen";
import { EditProfileCamera } from "../../components/editProfile/editProfileCamera";

const Stack = createStackNavigator();

export const ProfileNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TakeProfileImage"
        component={EditProfileCamera}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};
