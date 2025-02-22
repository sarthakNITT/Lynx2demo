import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { observer } from 'mobx-react';
import { Linking } from 'react-native';
import { scale } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BOTTOM_NAV_STORE } from '../../mobx/BOTTOM_NAV_STORE';
import { USER_STORE } from "../../mobx/USER_STORE";
import ActivityNavigator from '../activity-navigator';
import CalendarNavigator from '../calendar-navigator';
import FeedNavigator from '../feed-navigator';
import SearchNavigator from '../search-navigator';
import UserNavigator from '../user-navigator';
import MessageNavigator from '../message-navigator';
import * as color from '../../utils/colors';

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = observer(() => {
  console.log("the value of isCR is ", USER_STORE.getisCR);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor={color.iconActiveColor}
      inactiveColor={color.iconInActiveColor}
      labeled={false}
      barStyle={{
        backgroundColor: color.BottomNav,
        display: BOTTOM_NAV_STORE.getTabVisibility ? null : 'none',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarLabel: 'Feeds',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={scale(24)} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={scale(24)} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarNavigator}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-range" color={color} size={scale(24)} />
          ),
        }}
      />
      <Tab.Screen
        name="ActivityNavigator"
        component={ActivityNavigator}
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={scale(24)} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={scale(24)} />
          ),
        }}
      />
      {USER_STORE.getisCR.isCR && (
        <Tab.Screen
          name="Message"
          component={MessageNavigator}
          options={{
            tabBarLabel: 'Message',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="message" color={color} size={scale(24)} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
});

export default AppNavigator;
