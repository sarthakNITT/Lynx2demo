import React, { useEffect, useState } from "react";
import { Observer, observer } from "mobx-react";
import {
  Animated,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { PreventDoubleClickWithOpacity as TouchableOpacity } from "../../components/TouchableOpacity";
import * as colors from "../../utils/colors";
import { HeaderHeight, HorizontalPadding } from "../../utils/UI_CONSTANTS";

import ClassActivityScreen from "./classactivity";
// import CampusActivityScreen from './CampusActivity';
import FeedScreen from "./CampusActivity";
import NewMessageScreen from "../MessageScreen/index.js";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

export default observer(({ navigation }) => {
  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontSize: scale(16),
            color: "black",
            paddingTop: "4%",
            paddingBottom: "3%",
            fontWeight: "900",
          }}
        >
          Home
        </Text>
      </View>
      <Tab.Navigator
        tabBarScrollEnabled={true}
        screenOptions={{
          tabBarActiveTintColor: colors.tabBarActiveTintColor,
          tabBarInactiveTintColor: colors.tabBarInactiveTintColor,
          tabBarIndicatorStyle: {
            backgroundColor: colors.tabBarActiveTintColor,
          },
          tabBarPressColor: "white",
          tabBarStyle: { backgroundColor: "#ffffff" },
          swipeEnabled: false,
        }}
      >
        <Tab.Screen
          name="Class"
          component={ClassActivityScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: scale(16),
                  fontWeight: "700",
                  color: "#000000",
                }}
              >
                Class Activity
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Campus"
          component={FeedScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: scale(16),
                  fontWeight: "700",
                  color: "#000000",
                }}
              >
                Campus Activity
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
      <View>
        <TouchableOpacity
          // style={{
          //   position: "absolute",
          //   backgroundColor: colors.tabBarActiveTintColor,
          //   height: 60,
          //   width: 60,
          //   borderRadius: 100,
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   bottom: scale(HorizontalPadding),
          //   right: scale(HorizontalPadding),
          //   marginBottom: moderateScale(65),
          // }}
          // onPress={() => {
          //   navigation.push("NewMessageScreen");
          // }}
        >
          {/* <MaterialCommunityIcons
            name="plus-circle"
            color={colors.WHITE}
            size={scale(34)}
            style={{
              textAlign: "center",
            }}
          /> */}
          {/* <Botnav.Navigator>
            <Botnav.Screen
              name="LynxBot"
              children={() => (
                <LynxBot navigation={navigation} />
              )}
            />
          </Botnav.Navigator> */}
        </TouchableOpacity>
        <TouchableOpacity
          // style={{
          //   position: "absolute",
          //   backgroundColor: colors.Blue,
          //   height: 60,
          //   width: 60,
          //   borderWidth: 1,
          //   borderRadius: 100,
          //   borderColor: colors.Blue,
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   bottom: scale(HorizontalPadding),
          //   right: scale(HorizontalPadding),
          // }}
          // onPress={() => {
          //   navigation.push("LynxChatBot");
          // }}
        >
          {/* <MaterialCommunityIcons
            name="robot"
            color={colors.WHITE}
            size={scale(34)}
            style={{
              textAlign: "center",
            }}
          /> */}
          {/* <Botnav.Navigator>
            <Botnav.Screen
              name="LynxBot"
              children={() => (
                <LynxBot navigation={navigation} />
              )}
            />
          </Botnav.Navigator> */}
        </TouchableOpacity>
      </View>
    </>
  );
});

// import {useIsFocused} from '@react-navigation/native';
// import {observer} from 'mobx-react';
// import React, {useEffect, useState} from 'react';
// import {
//   Animated,
//   FlatList,
//   Platform,
//   RefreshControl,
//   SafeAreaView,
//   StyleSheet,
//   View,
// } from 'react-native';
// import {scale, verticalScale} from 'react-native-size-matters';
// import ErrorScreen from '../../components/ErrorScreen';
// import EventsCard from '../../components/EventsCard';
// import LoaderPage from '../../components/LoadingScreen';
// import NoEventScreen from '../../components/NoEventScreen';
// import SuggestedEventCard from '../../components/SuggestedEventCard';
// import Text from '../../components/TextComponent';
// import {PreventDoubleClickWithOpacity as TouchableOpacity} from '../../components/TouchableOpacity';
// import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
// import {FEEDS_STORE} from '../../mobx/FEEDS_STORE';
// import {USER_STORE} from '../../mobx/USER_STORE';
// import * as colors from '../../utils/colors';
// import {NO_EVENTS} from '../../utils/ERROR_MESSAGES';
// import {getFormattedDate} from '../../utils/helperFunction/getFormattedDate';
// import {getFormattedTime} from '../../utils/helperFunction/getFormattedTime';
// import {isLive} from '../../utils/helperFunction/isLive';
// import {ACCENT_EVENT_SCREEN} from '../../utils/LOADING_TYPES';
// import {HeaderHeight, HorizontalPadding} from '../../utils/UI_CONSTANTS';
// import {STUDENT} from '../../utils/USER_TYPE';
// import {feedsAPI} from './feedsAPI';

// const FeedScreen = observer(({navigation}) => {
//   //this is for handling notifications

//   if (!USER_STORE.getAppLoaded) {
//     USER_STORE.setAppLoaded(true);
//   }
//   const onRefresh = React.useCallback(() => {
//     FEEDS_STORE.setRefreshing(true);
//     FEEDS_STORE.setError(false);
//     FEEDS_STORE.setErrorText('');
//     //FEEDS_STORE.setLoading(true);
//     FEEDS_STORE.setSuccess(false);

//     feedsAPI(true);
//   }, []);

//   const isFocused = useIsFocused();
//   if (isFocused) {
//     BOTTOM_NAV_STORE.setTabVisibility(true);
//   }

//   useEffect(() => {
//     FEEDS_STORE.setLoading(true);
//     feedsAPI(false);
//   }, [USER_STORE.getRefreshToken]);

//   const scrollY = new Animated.Value(0);

//   const diffClamp = Animated.diffClamp(scrollY, 0, verticalScale(HeaderHeight));

//   const interpolateY = diffClamp.interpolate({
//     inputRange: [0, verticalScale(HeaderHeight)],
//     outputRange: [0, verticalScale(-1 * HeaderHeight)],
//   });

//   const [timeout, setTimeouts] = useState();
//   const [clicked, setClicked] = useState(true);
//   const delay = 1000;

//   const handleClick = onPress => {
//     if (clicked) {
//       onPress();
//       setClicked(false);
//     }
//     clearTimeout(timeout);
//     setTimeouts(
//       setTimeout(function () {
//         setClicked(true);
//       }, delay),
//     );
//   };

//   const SuggestedEvents = () => {
//     const Separator = () => <View style={{width: scale(HorizontalPadding)}} />;
//     return (
//       <>
//         {FEEDS_STORE.getData.suggestedEvents != null &&
//         FEEDS_STORE.getData.suggestedEvents.length > 0 ? (
//           <View>
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 fontSize: scale(18),
//                 marginHorizontal: scale(HorizontalPadding),
//                 marginVertical: verticalScale(9),
//               }}>
//               Suggested Events
//             </Text>

//             <FlatList
//               data={FEEDS_STORE.getData.suggestedEvents}
//               // horizontal={true}
//               showsHorizontalScrollIndicator={false}
//               showsVerticalScrollIndicator={false}
//               ListHeaderComponent={<Separator />}
//               ListFooterComponent={<Separator />}
//               ItemSeparatorComponent={() => (
//                 <View style={{width: scale(HorizontalPadding)}} />
//               )}
//               renderItem={({item}) => (
//                 <View>
//                   <TouchableOpacity
//                     onPress={() => {
//                       handleClick(() => {
//                         navigation.push('EventDescriptionScreen', {
//                           eventId: item.EventId,
//                           app: true,
//                         });
//                       });
//                     }}>
//                     <SuggestedEventCard
//                       eventImage={item.poster}
//                       organizer={item.club.name}
//                       eventName={item.Title}
//                       isLive={isLive(item.startDate, item.endDate)}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               )}
//             />
//           </View>
//         ) : (
//           <></>
//         )}
//       </>
//     );
//   };

//   return (
//     <View style={{flex: 1}}>
//       {FEEDS_STORE.getLoading ? (
//         <LoaderPage LoadingAccent={ACCENT_EVENT_SCREEN} />
//       ) : FEEDS_STORE.getError ? (
//         <ErrorScreen
//           showIconInButton={false}
//           errorMessage={FEEDS_STORE.getErrorText}
//           fn={() => {
//             FEEDS_STORE.setErrorText('');
//             FEEDS_STORE.setError(false);
//             feedsAPI();
//           }}
//         />
//       ) : (
//         <SafeAreaView>
//           {Platform.OS === 'android' ? (
//             <Animated.View
//               style={{
//                 elevation: 1,
//                 zIndex: 1,
//                 transform: [
//                   {
//                     translateY: interpolateY,
//                   },
//                 ],
//               }}>
//               <View
//                 style={{
//                   left: 0,
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   right: 0,
//                   height: verticalScale(HeaderHeight),
//                   backgroundColor: colors.EventScreen_headerBackground,

//                   elevation: 5,
//                   zIndex: 100, //for IOS
//                   alignContent: 'center',
//                   justifyContent: 'center',
//                   shadowColor: colors.GRAY_DARK,
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: verticalScale(18),
//                     paddingLeft: scale(HorizontalPadding),
//                     color: 'white',
//                     fontWeight: 'bold',
//                     color: colors.HeaderText,
//                   }}>
//                   EVENTS
//                 </Text>
//               </View>
//             </Animated.View>
//           ) : (
//             <View
//               style={{
//                 left: 0,
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 right: 0,
//                 height: verticalScale(HeaderHeight),
//                 backgroundColor: colors.EventScreen_headerBackground,

//                 elevation: 5,
//                 zIndex: 100, //for IOS
//                 alignContent: 'center',
//                 justifyContent: 'center',
//                 shadowColor: colors.GRAY_DARK,
//               }}>
//               <Text
//                 style={{
//                   fontSize: verticalScale(18),
//                   paddingLeft: scale(HorizontalPadding),
//                   color: 'white',
//                   fontWeight: 'bold',
//                   color: colors.HeaderText,
//                 }}>
//                 EVENTS
//               </Text>
//             </View>
//           )}
//           <FlatList
//             data={[
//               ...FEEDS_STORE.getData.liveEvents,
//               ...FEEDS_STORE.getData.upcomingEvents,
//             ]}
//             showsVerticalScrollIndicator={false}
//             style={{height: '100%'}}
//             showsHorizontalScrollIndicator={false}
//             ListEmptyComponent={
//               <NoEventScreen
//                 errorMessage={NO_EVENTS}
//                 fullscreen={
//                   FEEDS_STORE.getData.suggestedEvents == null ||
//                   FEEDS_STORE.getData.suggestedEvents.length == 0
//                 }
//               />
//             }
//             ListHeaderComponent={
//               <View style={{height: verticalScale(HeaderHeight)}}></View>
//             }
//             ListFooterComponent={<SuggestedEvents />}
//             onScroll={e => {
//               scrollY.setValue(e.nativeEvent.contentOffset.y);
//             }}
//             refreshControl={
//               <RefreshControl
//                 refreshing={FEEDS_STORE.getRefreshing}
//                 colors={[colors.Accent]}
//                 tintColor={colors.Accent}
//                 onRefresh={onRefresh}
//                 progressViewOffset={verticalScale(50)}
//               />
//             }
//             bouncesZoom={false}
//             renderItem={({item}) => (
//               <View>
//                 <TouchableOpacity
//                   onPress={() => {
//                     handleClick(() => {
//                       navigation.push('EventDescriptionScreen', {
//                         eventId: item.EventId,
//                         app: true,
//                       });
//                     });
//                   }}>
//                   {USER_STORE.getUserType === STUDENT ? (
//                     <EventsCard
//                       date={getFormattedDate(item.startDate)}
//                       time={getFormattedTime(item.startDate)}
//                       name={item.Title}
//                       desc={item.Description}
//                       eventImage={item.poster}
//                       organizer={
//                         item.club.name != undefined ? item.club.name : 'NA'
//                       }
//                       isLive={item.isLive}
//                       wasInterested={item.isInterested}
//                       eventId={item.EventId}
//                       urlId={item.urlId}
//                     />
//                   ) : (
//                     <EventsCard
//                       date={getFormattedDate(item.startDate)}
//                       time={getFormattedTime(item.startDate)}
//                       name={item.Title}
//                       desc={item.Description}
//                       eventImage={item.poster}
//                       organizer={FEEDS_STORE.getData.clubName}
//                       isLive={item.isLive}
//                       wasInterested={false}
//                       eventId={item.EventId}
//                       urlId={item.urlId}
//                     />
//                   )}
//                 </TouchableOpacity>
//               </View>
//             )}
//             numColumns={1}
//             keyExtractor={(item, index) => index}
//           />
//         </SafeAreaView>
//       )}
//     </View>
//   );
// });

// export default FeedScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
