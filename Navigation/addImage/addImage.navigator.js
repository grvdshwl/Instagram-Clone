import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { AddImageScreen } from "../../components/addImage/addImage.screen";
import { SaveImageScreen } from "../../components/saveImage/saveImage.screen";

const Stack = createStackNavigator();

export const AddImageNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="AddImageScreen">
      <Stack.Screen
        name="AddImageScreen"
        component={AddImageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SaveImage"
        component={SaveImageScreen}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};
