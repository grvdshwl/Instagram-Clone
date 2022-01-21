import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import CommentScreen from "../../components/comment/comment.screen";
import { AppNavigator } from "../app/app.navigator";

const Stack = createStackNavigator();

export const MainNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="App">
      <Stack.Screen
        name="App"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentScreen}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};
