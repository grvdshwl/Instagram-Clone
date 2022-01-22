import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { SearchScreen } from "../../components/search/search.screen";
import { UserProfile } from "../../components/userProfile/userProfile.component";

const Stack = createStackNavigator();

export const SearchNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
};
