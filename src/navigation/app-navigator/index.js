import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Linking } from 'react-native';
import { scale } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BOTTOM_NAV_STORE } from '../../mobx/BOTTOM_NAV_STORE';
import { DEEP_LINK_BASE_URL } from '../../utils/API_CONSTANTS';
import * as color from '../../utils/colors';
import ActivityNavigator from '../activity-navigator';
import CalendarNavigator from '../calendar-navigator';
import FeedNavigator from '../feed-navigator';
import SearchNavigator from '../search-navigator';
import UserNavigator from '../user-navigator';
import MessageNavigator from '../message-navigator';

const Tab = createMaterialBottomTabNavigator();
const navigationRef = createNavigationContainerRef();

export function navigateApp(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const AppNavigator = observer(() => {
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={{
        prefixes: [DEEP_LINK_BASE_URL],
        config: {
          screens: {
            // Define your deep linking configuration here
          },
        },
        async getInitialURL() {
          const url = await Linking.getInitialURL();
          console.log("HOME TAB Incoming URL: " + url);
          if (url != null) {
            return url;
          }
        },
      }}
    >
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
        {STUDENT_REGISTRATION_STORE.getIscr && (
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
    </NavigationContainer>
  );
});

export default AppNavigator;