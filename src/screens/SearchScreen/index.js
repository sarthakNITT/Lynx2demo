// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import React, {useState} from 'react';
// import {PixelRatio, View} from 'react-native';
// import {DefaultTheme, Searchbar} from 'react-native-paper';
// import {scale} from 'react-native-size-matters';
// import * as color from '../../utils/colors';
// import CircularSearchResult from './CircularSearchResult';
// import ClubSearchResult from './ClubSearchResult.js';
// import EventSearchResult from './EventSearchResult';
// import TagSearchResult from './TagSearchResult';

// const Tab = createMaterialTopTabNavigator();

// const SearchScreen = ({route, navigation}) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [Screen, setScreen] = useState('accounts');

//   if (route.params != undefined) {
//     if (route.params.params.searchText != '') {
//       setSearchQuery(route.params.params.searchText);
//       route.params.params.searchText = '';
//     }
//   }
//   const onChangeSearch = query => {
//     setSearchQuery(query);
//   };

//   const themeSearchBar = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: color.Tertiary,
//       accent: color.Tertiary,
//     },
//   };

//   return (
//     <View style={{flex: 1}}>
//       <View style={{flex: 1, backgroundColor: 'white'}}>
//         <Searchbar
//           style={{elevation: 0, margin: 0, padding: 0, color: 'red'}}
//           placeholder={'Search ' + Screen}
//           onChangeText={onChangeSearch}
//           autoFocus={true}
//           value={searchQuery}
//           autoCapitalize="none"
//           theme={themeSearchBar}
//         />

//         <View style={{backgroundColor: 'white'}} />
//         <Tab.Navigator
//           // keyboardDismissMode="none"
//           // screenOptions={{
//           //   tabBarLabelStyle: {
//           //     fontSize: Math.floor(
//           //       scale(11) / PixelRatio.getFontScale().toFixed(1),
//           //     ),
//           //     fontWeight: 'bold',
//           //     width: 'auto',
//           //     margin: 0,
//           //     padding: 0,
//           //     textTransform: 'none',
//           //     color: '#000000',
//           //   },
//           //   lazy: true,
//           //   tabBarStyle: {textTransform: 'none', width: 'auto'},
//           //   //tabBarPressColor: color.tabBarPressColor,
//           //   tabBarPressColor: '#e6e6e6',
//           //  // tabBarIndicatorStyle: {backgroundColor: color.sliderColor},
//           //   tabBarIndicatorStyle:{backgroundColor: '#000000'},
//           //   //tabBarActiveTintColor: color.tabBarActiveTintColor,
//           //   tabBarActiveTintColor: '#000000',
//           //   //tabBarInactiveTintColor: color.tabBarInactiveTintColor,
//           //   tabBarInactiveTintColor: '#8a8a8a',
//           keyboardDismissMode="none"
//   screenOptions={{
//     tabBarLabelStyle: {
//       fontSize: Math.floor(
//         scale(11) / PixelRatio.getFontScale().toFixed(1),
//       ),
//       fontWeight: 'bold',
//       width: 'auto',
//       margin: 0,
//       padding: 0,
//       textTransform: 'none',
//       color: '#000000'
//     },
//     lazy: true,
//     tabBarStyle: {textTransform: 'none', width: 'auto'},
//     tabBarPressColor: color.tabBarPressColor,
//     tabBarIndicatorStyle: {backgroundColor: color.sliderColor},
//     tabBarActiveTintColor: '#000000', // Active tab text color in hex
//     tabBarInactiveTintColor: '#000000', // Inactive tab text color in hex
//           }}>
//           <Tab.Screen
//             name="Accounts"
//             children={() => (
//               <ClubSearchResult
//                 searchQuery={searchQuery}
//                 setScreen={setScreen}
//                 navigation={navigation}
//               />
//             )}
//           />
//           <Tab.Screen
//             name="Events"
//             children={() => (
//               <EventSearchResult
//                 searchQuery={searchQuery}
//                 setScreen={setScreen}
//                 navigation={navigation}
//               />
//             )}
//           />
//           <Tab.Screen
//             name="Tags"
//             children={route => (
//               <TagSearchResult
//                 searchQuery={searchQuery}
//                 setScreen={setScreen}
//                 navigation={navigation}
//               />
//             )}
//           />
//           <Tab.Screen
//             name="Circulars"
//             children={() => (
//               <CircularSearchResult
//                 searchQuery={searchQuery}
//                 setScreen={setScreen}
//                 navigation={navigation}
//               />
//             )}
//           />
//         </Tab.Navigator>
//       </View>
//     </View>
//   );
// };

// export default SearchScreen;
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Searchbar, DefaultTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import * as color from '../../utils/colors';
import CircularSearchResult from './CircularSearchResult';
import ClubSearchResult from './ClubSearchResult.js';
import EventSearchResult from './EventSearchResult';
import TagSearchResult from './TagSearchResult';
import { SafeAreaView } from 'react-native-safe-area-context';


const SearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [screen, setScreen] = useState('accounts'); // Track selected screen/tab

  useEffect(() => {
    if (route.params && route.params.params && route.params.params.searchText !== '') {
      setSearchQuery(route.params.params.searchText);
      route.params.params.searchText = '';
    }
  }, [route.params]);
  

  const onChangeSearch = (query) => {
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

  // Function to render content based on selected tab
  const renderContent = () => {
    switch (screen) {
      case 'accounts':
        return <ClubSearchResult searchQuery={searchQuery} setScreen={setScreen} navigation={navigation} />;
      case 'events':
        return <EventSearchResult searchQuery={searchQuery} setScreen={setScreen} navigation={navigation} />;
      case 'tags':
        return <TagSearchResult searchQuery={searchQuery} setScreen={setScreen} navigation={navigation} />;
      case 'circulars':
        return <CircularSearchResult searchQuery={searchQuery} setScreen={setScreen} navigation={navigation} />;
      default:
        return <TagSearchResult searchQuery={searchQuery} setScreen={setScreen} navigation={navigation} />;
    }
  };

  // Inside SearchScreen component, near the top or before the return:
  console.log("SearchScreen - searchQuery:", searchQuery);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Searchbar
          style={{ elevation: 0, margin: 0, padding: 0 }}
          placeholder={'Search ' + screen}
          onChangeText={onChangeSearch}
          autoFocus={true}
          value={searchQuery}
          autoCapitalize="none"
          theme={themeSearchBar}
        />

        <View style={styles.tabContainer}>
          {['accounts', 'events', 'tags', 'circulars'].map((tab) => (
            <View key={tab} style={styles.tabWithIndicator}>
              <TouchableOpacity
                onPress={() => setScreen(tab)} // Change active tab on button press
                style={[
                  styles.tabButton,
                  screen === tab && styles.activeTabButton, // Highlight active tab
                ]}
              >
                <Text style={[styles.tabText, screen === tab && styles.activeTabText]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
              <View
                style={[
                  styles.toggleContainer,
                  screen === tab ? styles.blackBackground : styles.whiteBackground,
                ]}
              />
            </View>
          ))}
        </View>

        <View style={styles.contentContainer}>{renderContent()}</View>

        {/* Gradient container */}
        {/* <LinearGradient
          colors={['#000000', '#FFFFFF']} // Gradient color from black to white
          style={styles.gradientContainer} // Apply styles to the gradient container
        > */}
          {/* You can add anything inside the gradient container if needed */}
        {/* </LinearGradient> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    //flex: 1, // This might be causing the extra space issue
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  
  tabWithIndicator: {
    flex: 1, // Added flex: 1 to take equal space in the row
    alignItems: 'center',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeTabButton: {
    // Active tab button color
    //backgroundColor: color.Tertiary, // Change this to your desired active tab background color
  },
  tabText: {
    fontSize: scale(11),
    fontWeight: '500',
    color: '#808080', // Default color for inactive text
  },
  activeTabText: {
    color: color.BLACK, // Active text color (change this to your desired active text color)
  },
  toggleContainer: {
    height: 3,
    width: '90%',

  },
  blackBackground: {
    backgroundColor: 'black',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1, // Ensure content container takes all available space
  },
  gradientContainer: {
    height: 30, // Adjust the height of the gradient bar (you can change this value as needed)
    width: '100%',
  },
});

export default SearchScreen;