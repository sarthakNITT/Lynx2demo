import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import {PixelRatio, View} from 'react-native';
import {DefaultTheme, Searchbar} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import * as color from '../../utils/colors';
import CircularSearchResult from './CircularSearchResult';
import ClubSearchResult from './ClubSearchResult.js';
import EventSearchResult from './EventSearchResult';
import TagSearchResult from './TagSearchResult';

const Tab = createMaterialTopTabNavigator();

const SearchScreen = ({route, navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [Screen, setScreen] = useState('accounts');

  if (route.params != undefined) {
    if (route.params.params.searchText != '') {
      setSearchQuery(route.params.params.searchText);
      route.params.params.searchText = '';
    }
  }
  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const themeSearchBar = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color.Tertiary,
      accent: color.Tertiary,
    },
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Searchbar
          style={{elevation: 0, margin: 0, padding: 0, color: 'red'}}
          placeholder={'Search ' + Screen}
          onChangeText={onChangeSearch}
          autoFocus={true}
          value={searchQuery}
          autoCapitalize="none"
          theme={themeSearchBar}
        />

        <View style={{backgroundColor: 'white'}} />
        <Tab.Navigator
          // keyboardDismissMode="none"
          // screenOptions={{
          //   tabBarLabelStyle: {
          //     fontSize: Math.floor(
          //       scale(11) / PixelRatio.getFontScale().toFixed(1),
          //     ),
          //     fontWeight: 'bold',
          //     width: 'auto',
          //     margin: 0,
          //     padding: 0,
          //     textTransform: 'none',
          //     color: '#000000',
          //   },
          //   lazy: true,
          //   tabBarStyle: {textTransform: 'none', width: 'auto'},
          //   //tabBarPressColor: color.tabBarPressColor,
          //   tabBarPressColor: '#e6e6e6',
          //  // tabBarIndicatorStyle: {backgroundColor: color.sliderColor},
          //   tabBarIndicatorStyle:{backgroundColor: '#000000'},
          //   //tabBarActiveTintColor: color.tabBarActiveTintColor,
          //   tabBarActiveTintColor: '#000000',
          //   //tabBarInactiveTintColor: color.tabBarInactiveTintColor,
          //   tabBarInactiveTintColor: '#8a8a8a',
          keyboardDismissMode="none"
  screenOptions={{
    tabBarLabelStyle: {
      fontSize: Math.floor(
        scale(11) / PixelRatio.getFontScale().toFixed(1),
      ),
      fontWeight: 'bold',
      width: 'auto',
      margin: 0,
      padding: 0,
      textTransform: 'none',
      color: '#000000'
    },
    lazy: true,
    tabBarStyle: {textTransform: 'none', width: 'auto'},
    tabBarPressColor: color.tabBarPressColor,
    tabBarIndicatorStyle: {backgroundColor: color.sliderColor},
    tabBarActiveTintColor: '#000000', // Active tab text color in hex
    tabBarInactiveTintColor: '#000000', // Inactive tab text color in hex
          }}>
          <Tab.Screen
            name="Accounts"
            children={() => (
              <ClubSearchResult
                searchQuery={searchQuery}
                setScreen={setScreen}
                navigation={navigation}
              />
            )}
          />
          <Tab.Screen
            name="Events"
            children={() => (
              <EventSearchResult
                searchQuery={searchQuery}
                setScreen={setScreen}
                navigation={navigation}
              />
            )}
          />
          <Tab.Screen
            name="Tags"
            children={route => (
              <TagSearchResult
                searchQuery={searchQuery}
                setScreen={setScreen}
                navigation={navigation}
              />
            )}
          />
          <Tab.Screen
            name="Circulars"
            children={() => (
              <CircularSearchResult
                searchQuery={searchQuery}
                setScreen={setScreen}
                navigation={navigation}
              />
            )}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default SearchScreen;
