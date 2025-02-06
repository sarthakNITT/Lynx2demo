import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Header from '../../components/Header';
import ActivityScreen from '../../screens/ActivityScreen';
import AnnouncementDetailScreen from '../../screens/AnnouncementDetailScreen';
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import EventEditScreen from '../../screens/EventEditScreen';
import ImageZoomScreen from '../../screens/ImageZoomScreen';
import * as color from '../../utils/colors';
import CircularListScreen from '../../screens/ClubDescriptionScreen/CircularList';

const AnnouncementStack = createNativeStackNavigator();

function ActivityNavigator() {
  return (
    <AnnouncementStack.Navigator>
      <AnnouncementStack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <AnnouncementStack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <AnnouncementStack.Screen
        name="AnnouncementDetail2"
        component={AnnouncementDetailScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <AnnouncementStack.Screen
        name="EventDescriptionScreen"
        component={EventDescriptionScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <AnnouncementStack.Screen
        name="EventEditScreen"
        component={EventEditScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <AnnouncementStack.Screen
        name="ImageScreen"
        children={ImageZoomScreen}
        options={{
          animation: 'fade_from_bottom',
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
          title: '',
          headerTintColor: color.WHITE,
          gestureEnabled: false,
        }}
      />
      <AnnouncementStack.Screen
        name="ClubDescription"
        component={ClubDescriptionScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <AnnouncementStack.Screen
        name="CircularList"
        component={CircularListScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
    </AnnouncementStack.Navigator>
  );
}

export default ActivityNavigator;
