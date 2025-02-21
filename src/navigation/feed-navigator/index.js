import { createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Header from "../../components/Header";
import ClubDescriptionScreen from "../../screens/ClubDescriptionScreen";
import EventDescriptionScreen from "../../screens/EventDescriptionScreen";
import EventEditScreen from "../../screens/EventEditScreen";
import FeedScreen from "../../screens/FeedScreen";
import ImageZoomScreen from "../../screens/ImageZoomScreen";
import * as color from "../../utils/colors";
import CircularListScreen from "../../screens/ClubDescriptionScreen/CircularList";
import AnnouncementDetailScreen from "../../screens/AnnouncementDetailScreen";
// import LynxChatBot from '../../screens/LynxChatBot';
// import BotRequest from "../../screens/LynxChatBot/BotRequest";
// import ChatScreen from "../../screens/LynxChatBot/ChatScreen";
// import Waitlist from "../../screens/LynxChatBot/Waitlist";
const FeedStack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export function navigateApp(name, params) {
  if (navigationRef.isReady()) {
    console.log("Navigated to: " + name);
    navigationRef.navigate(name, params);
  }
}

function FeedNavigator() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feeds"
        component={FeedScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <FeedStack.Screen
        name="EventDescriptionScreen"
        component={EventDescriptionScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <FeedStack.Screen
        name="EventDescriptionScreen2"
        component={EventDescriptionScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <FeedStack.Screen
        name="EventEditScreen"
        component={EventEditScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <FeedStack.Screen
        name="ImageScreen"
        children={ImageZoomScreen}
        options={{
          headerShown: true,
          animation: "fade_from_bottom",
          headerTransparent: true,
          headerShadowVisible: false,
          title: "",
          headerTintColor: color.WHITE,
          gestureEnabled: false,
        }}
      />
      <FeedStack.Screen
        name="ClubDescription"
        component={ClubDescriptionScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <FeedStack.Screen
        name="CircularList"
        component={CircularListScreen}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <FeedStack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      {/* <FeedStack.Screen
        name="LynxChatBot"
        component={LynxChatBot}
        options={{
          // animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      /> */}
      {/* <FeedStack.Screen
        name="BotRequest"
        component={BotRequest}
        options={{
          // animation: 'slide_from_right',
          headerShown: false,
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      /> */}
      {/* <FeedStack.Screen
        name="Waitlist"
        component={Waitlist}
        options={{
          // animation: 'slide_from_right',
          headerShown: false,
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      /> */}
      {/* <FeedStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      /> */}
    </FeedStack.Navigator>
  );
}

export default FeedNavigator;
