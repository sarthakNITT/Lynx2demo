import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import React from "react";
import { AUTH_NAV_STORE } from '../mobx/AUTH_NAV_STORE';
import { USER_STORE } from "../mobx/USER_STORE";
// import ClubRegistration from '../screens/ClubRegistration';
import LoginScreen from "../screens/LoginScreen";
import Registration from "../screens/Registration";
import ResetPasswordScreen from "../screens/ResetPasswordScreens";
// import SplashScreen from '../screens/SplashScreen';
import AppNavigator from "./app-navigator";

const RootStack = createNativeStackNavigator();

const Navigator = observer(() => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Splash Screen example (uncomment if needed) */}
        {/* {AUTH_NAV_STORE.getSplashLoading ? (
          <RootStack.Screen name="Splash" component={SplashScreen} />
        ) : */}

        {!USER_STORE.getUserToken ? (
          <>
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <RootStack.Screen
              name="Reset"
              component={ResetPasswordScreen}
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <RootStack.Screen
              name="Register"
              component={Registration}
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
          </>
        ) : (
          <>
            {/* Uncomment if ClubRegistration is needed */}
            {/* {USER_STORE.getRedirectUpdate ? (
              <RootStack.Screen
                name="ClubRegister"
                component={ClubRegistration}
                initialParams={{ token: USER_STORE.getUserToken }}
              />
            ) : ( */}
            <RootStack.Screen
              name="Home"
              component={AppNavigator}
              initialParams={{ token: USER_STORE.getUserToken }}
            />
            {/* )} */}
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Navigator;
