import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePageScreen from "../../components/homePage/homepage";
import { Text, View } from "react-native";
import { AddImageScreen } from "../../components/addImage/addImage.screen";
import { AddImageNavigator } from "../addImage/addImage.navigator";
import ProfileScreen from "../../components/profile/profile.screen";
import { SearchScreen } from "../../components/search/search.screen";
import { SearchNavigator } from "../search/search.navigator";
import { ProfileNavigator } from "../profile/profile.navigator";

const TAB_ICON = {
  Home: "home-sharp",
  AddImage: "add-circle-sharp",
  Profile: "person-sharp",
  Search: "search-sharp",
};

const Tab = createMaterialBottomTabNavigator();

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ color }) => (
      <Ionicons name={iconName} size={25} color={color} />
    ),
    headerShown: false,
  };
};

export const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} labeled={false}>
      <Tab.Screen name="Home" component={HomePageScreen} />
      <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen name="AddImage" component={AddImageNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};
