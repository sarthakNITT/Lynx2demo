import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Header from '../../components/Header';
import AnnouncementDetailScreen from '../../screens/AnnouncementDetailScreen';
import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
import EventDescriptionScreen from '../../screens/EventDescriptionScreen';
import EventEditScreen from '../../screens/EventEditScreen';
import ImageZoomScreen from '../../screens/ImageZoomScreen';
import SearchScreen from '../../screens/SearchScreen';
import * as color from '../../utils/colors';
import CircularListScreen from '../../screens/ClubDescriptionScreen/CircularList';

const CalendarStack = createNativeStackNavigator();

function SearchNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="SearchScreen"
        component={SearchScreen}
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
          animation: 'slide_from_right',
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
      <CalendarStack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetailScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
    </CalendarStack.Navigator>
  );
}

export default SearchNavigator;
