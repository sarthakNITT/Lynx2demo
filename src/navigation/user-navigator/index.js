import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Header from "../../components/Header";
import { USER_STORE } from "../../mobx/USER_STORE";
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
import EditProfileScreen from "../../screens/EditProfileScreen";
import EditClubProfileScreen from '../../screens/EditProfileScreen_Club';
import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import EventEditScreen from '../../screens/EventEditScreen';
import FeedBackScreen from "../../screens/FeedbackScreen";
import ImageZoomScreen from '../../screens/ImageZoomScreen';
import SettingsSceen from "../../screens/SettingsScreen";
import StudentUserScreen from "../../screens/StudentUserScreen";
import UserScreen from "../../screens/UserScreen";
import * as color from "../../utils/colors";
import { STUDENT } from "../../utils/USER_TYPE";
import CircularListScreen from '../../screens/ClubDescriptionScreen/CircularList';
import AnnouncementDetailScreen from '../../screens/AnnouncementDetailScreen';
//import QRScreen from '../../screens/QRScreen';
import SecurityScreen from "../../screens/SpiderSecurityScreen";
import ManageNotificationsSettings from "../../screens/SettingsScreen/ManageNotificationScreen";
import { Keyboard } from 'react-native';

if (typeof Keyboard.removeListener !== 'function' && Keyboard.remove) {
  Keyboard.removeListener = Keyboard.remove;
}


const UserStack = createNativeStackNavigator();

function UserNavigator() {
  let isStudent;
  if(USER_STORE.getUserType=='CLUB'){
    isStudent=0;
  }else{
    isStudent=1;
  }
  // const isStudent = USER_STORE.getUserType;
  console.log("The user type is ",USER_STORE.getUserType);
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Users"
        component={isStudent ? StudentUserScreen : UserScreen}
        //component={StudentUserScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <UserStack.Screen
        name="EditProfile"
        component={isStudent ? EditProfileScreen : EditClubProfileScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: false,
        }}
      />
      <UserStack.Screen
        name="Settings"
        component={SettingsSceen}
        options={{
          headerShown: true,
          header: (props) => <Header title="Settings" props={props} />,
          animation: "slide_from_right",
          gestureEnabled: false,
        }}
      />
      <UserStack.Screen
        name="ManageNotificationsSettings"
        component={ManageNotificationsSettings}
        options={{
          headerShown: true,
          header: (props) => <Header title="Settings" props={props} />,
          animation: "slide_from_right",
          gestureEnabled: false,
        }}
      />
      <UserStack.Screen
        name="ClubDescription"
        component={ClubDescriptionScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <UserStack.Screen
        name="EventDescriptionScreen"
        component={EventDescriptionScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <UserStack.Screen
        name="EventEditScreen"
        component={EventEditScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <UserStack.Screen
        name="ImageScreen"
        children={ImageZoomScreen}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerTransparent: true,
          headerShadowVisible: false,
          title: '',
          headerTintColor: color.WHITE,
          gestureEnabled: false,
        }}
      />
      <UserStack.Screen
        name="FeedBackScreen"
        component={FeedBackScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
          header: (props) => <Header props={props} title="Feedback" />,
          gestureEnabled: false,
        }}
      />
      {/* <UserStack.Screen
        name="QRScreen"
        component={QRScreen}
        options={{
          headerShown: true,
          animation: 'simple_push',
          header: props => <Header props={props} title="Lynx ID" />,
          gestureEnabled: false,
        }}
      /> */}
      <UserStack.Screen
        name="SecurityScreen"
        component={SecurityScreen}
        options={{
          headerShown: true,
          animation: "slide_from_right",
          header: (props) => <Header props={props} title="Security Codes" />,
          gestureEnabled: false,
        }}
      />
      <UserStack.Screen
        name="CircularList"
        component={CircularListScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <UserStack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
    </UserStack.Navigator>
  );
}

export default UserNavigator;
