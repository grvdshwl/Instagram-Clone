import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "../../components/homePage/homepage";

const HomeStack = createStackNavigator();

export const HomePageNavigator = ({ navigation }) => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen" na>
      <HomeStack.Screen
        name="HomeScreen"
        component={Homepage}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
