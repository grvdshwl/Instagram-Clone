import { createStackNavigator } from "@react-navigation/stack";
import { LandingScreen } from "../../components/auth/Landing/LandingScreen";
import LoginScreen from "../../components/auth/Login/Login";
import RegisterScreen from "../../components/auth/Register/Register";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
