import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePageScreen from "../../components/homePage/homepage";
import { Text, View } from "react-native";
import { AddImageScreen } from "../../components/addImage/addImage.screen";

const TAB_ICON = {
  Home: "home-sharp",
  AddImage: "add-circle-sharp",
  Profile: "person-sharp",
};

const Tab = createMaterialBottomTabNavigator();

const ProfileScreen = () => (
  <View>
    <Text>Profile</Text>
  </View>
);

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
      <Tab.Screen name="AddImage" component={AddImageScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
