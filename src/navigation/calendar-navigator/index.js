import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import NetInfo from "@react-native-community/netinfo";
import Header from "../../components/Header";
import AnnouncementCreationScreen from "../../screens/AnnouncementCreationScreen";
import CalendarNoticeCreationScreen from "../../screens/CalendarNoticeCreationScreen";
import CalendarScreen from "../../screens/CalendarScreen";
import ClubDescriptionScreen from "../../screens/ClubDescriptionScreen";
import EventDescriptionScreen from "../../screens/EventDescriptionScreen";
import EventEditScreen from "../../screens/EventEditScreen";
import EventsCreationScreen from "../../screens/EventsCreationScreen";
import ImageZoomScreen from "../../screens/ImageZoomScreen";
import * as color from "../../utils/colors";
import CircularListScreen from "../../screens/ClubDescriptionScreen/CircularList";
import AnnouncementDetailScreen from "../../screens/AnnouncementDetailScreen";
import { API_STORE } from "../../mobx/API_STORE";
import {
  GET_BASE_CDN,
  GET_BASE_URL,
  isUpdateNeeded,
} from "../../utils/API_CONSTANTS";

const CalendarStack = createNativeStackNavigator();

function CalendarNavigator() {
  // const [apiStatus, setAPI] = useState(0);
  // const [updateVisible, setUpdateVisible] = useState(false);

  // const API_CALL = async () => {
  //   console.log('API_CALL invoked');

  //   // Check network connectivity
  //   const netInfo = await NetInfo.fetch();
  //   console.log('Network Info:', netInfo);

  //   if (!netInfo.isConnected) {
  //     console.log('Not connected to the internet');
  //     setAPI(3);
  //     return;
  //   }

  //   try {
  //     console.log('Connected to the internet');

  //     // Fetch base URL
  //     console.log('Fetching base URL...');
  //     const baseUrlResponse = await axios.get(GET_BASE_URL, {}, { timeout: 5000 });
  //     console.log('Base URL response:', baseUrlResponse);

  //     // Fetch CDN URL
  //     console.log('Fetching CDN URL...');
  //     const cdnResponse = await axios.get(GET_BASE_CDN, {}, { timeout: 5000 });
  //     console.log('CDN response:', cdnResponse);

  //     // Check if update is needed
  //     console.log('Checking if update is needed...');
  //     // const updateNeeded = await isUpdateNeeded();
  //     // console.log('Update needed:', updateNeeded);

  //     // if (updateNeeded) {
  //     //   console.log('Update required. Displaying update modal.');
  //     //   setUpdateVisible(true);
  //     // }

  //     const baseUrl = baseUrlResponse.data.trim();
  //     const cdnUrl = cdnResponse.data.trim();

  //     console.log('Base URL:', baseUrl);
  //     console.log('CDN URL:', cdnUrl);

  //     // Handle maintenance mode
  //     if (baseUrl === 'maintain') {
  //       console.log('Maintenance mode detected');
  //       setAPI(2);
  //       return;
  //     }

  //     // Set API store values
  //     console.log('Setting API store values...');
  //     API_STORE.setBaseUrl(baseUrl);
  //     API_STORE.setCDN(cdnUrl);

  //     // Success
  //     console.log('API setup completed successfully');
  //     setAPI(200);
  //   } catch (error) {
  //     console.error('Error during API call:', error);
  //     setAPI(1);
  //   }
  // };
  // useEffect(() => {
  //   console.log('Calling API_CALL in useEffect');
  //   API_CALL();
  //   // this is for checking the prod server
  // }, []);

  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <CalendarStack.Screen
        name="EventDescriptionScreen"
        component={EventDescriptionScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <CalendarStack.Screen
        name="EventEditScreen"
        component={EventEditScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <CalendarStack.Screen
        name="CreateEventScreen"
        component={EventsCreationScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          gestureEnabled: false,
        }}
      />
      <CalendarStack.Screen
        name="CreateCalendarNoticeScreen"
        component={CalendarNoticeCreationScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          gestureEnabled: false,
        }}
      />
      <CalendarStack.Screen
        name="CreateAnnouncementScreen"
        component={AnnouncementCreationScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          gestureEnabled: false,
        }}
      />
      <CalendarStack.Screen
        name="ImageScreen"
        children={ImageZoomScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          animation: 'fade_from_bottom',
          headerShadowVisible: false,
          title: '',
          headerTintColor: color.WHITE,
          gestureEnabled: false,
        }}
      />
      <CalendarStack.Screen
        name="ClubDescription"
        component={ClubDescriptionScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <CalendarStack.Screen
        name="CircularList"
        component={CircularListScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <CalendarStack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          header: (props) => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
    </CalendarStack.Navigator>
  );
}

export default CalendarNavigator;
