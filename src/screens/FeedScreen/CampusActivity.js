// import React, {useEffect, useState} from 'react';
// import NetInfo from '@react-native-community/netinfo';
// import axios from 'axios';
// import {API_STORE} from '../../mobx/API_STORE';
// import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
// import {USER_STORE} from '../../mobx/USER_STORE';
// import {useToast} from 'react-native-toast-notifications';
// import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
// import * as colors from '../../utils/colors';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {renderEmptyComponent} from '../../components/HomeActivityCard';
// import {Item} from '../../components/HomeActivityCard/index';
// import {API_FEED_SCREEN_MESSAGES} from '../../utils/API_CONSTANTS';

// const DATA = [
//   {
//     id: '1',
//     avatar_imageSource: require('../../res/images/postSplash.png'),
//     title: 'First Item',
//     roll: '@108119011',
//     details:
//       'TEXT SAMPLE :: fenevnevleveflkv cdscvvndfvjfvfj cdvj kdfkvdfnvdfjvef dsvdfdjvdfvjhjcvkhjvnm,bh,k bkhjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh ggggggggggggggggggggggggggg',
//     event_imageSource: require('../../res/images/spiderLogo.png'),
//     event_status: true,
//   },
// ];

// const CampusActivityScreen = () => {
//   const [messageData, setMessageData] = useState([]);
//   const [reload, setReload] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     NetInfo.fetch().then(state => {
//       if (state.isConnected == true) {
//         axios
//           .get(API_STORE.getBaseUrl + API_FEED_SCREEN_MESSAGES, {
//             headers: {
//               token: USER_STORE.getUserToken,
//             },
//             params: {
//               limit: 2,
//               pageNumber: 1,
//             },
//           })
//           .then(response => {
//             if (response.status === 200) {
//               setMessageData(response.data.data);
//             }
//           })
//           .catch(() => {
//             toast.show('Unexpected Error has occurred', {type: 'warning'});
//           });
//       } else {
//         toast.show(NO_NETWORK, {type: 'warning'});
//       }
//     });
//     setReload(true);
//   }, [reload]);

//   var hours = new Date().getHours();
//   var min = new Date().getMinutes();

//   const renderItem = ({item}) => (
//     <Item
//       title={<Text>{item.title}</Text>}
//       roll={<Text>{item.roll}</Text>}
//       hours={hours}
//       min={min}
//       details={<Text>{item.details}</Text>}
//       avatar_imageSource={item.avatar_imageSource}
//       event_imageSource={item.event_imageSource ? item.event_imageSource : null}
//       event_status={item.event_status}
//     />
//   );

//   const isAllEventsInactive = !DATA.some(item => item.event_status);

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <SafeAreaView style={{flex: 1}}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Previous Events</Text>
//         </View>
//         <View style={styles.scrollViewContainer}>
//           <FlatList
//             data={DATA}
//             renderItem={renderItem}
//             keyExtractor={item => item.id}
//             ListEmptyComponent={renderEmptyComponent}
//           />
//         </View>
//         {!isAllEventsInactive && (
//           <View style={styles.header}>
//             <Text style={styles.headerText}>Live Updates</Text>
//           </View>
//         )}
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     color: colors.WHITE,
//     flex: 1,
//   },
//   header: {
//     backgroundColor: colors.WHITE,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: colors.BLACK,
//   },
// });

// export default CampusActivityScreen;

import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import ErrorScreen from "../../components/ErrorScreen";
import EventsCard from "../../components/EventsCard";
import LoaderPage from "../../components/LoadingScreen";
import NoEventScreen from "../../components/NoEventScreen";
import SuggestedEventCard from "../../components/SuggestedEventCard";
import Text from "../../components/TextComponent";
import { PreventDoubleClickWithOpacity as TouchableOpacity } from "../../components/TouchableOpacity";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { FEEDS_STORE } from "../../mobx/FEEDS_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import * as colors from "../../utils/colors";
import { NO_EVENTS } from "../../utils/ERROR_MESSAGES";
import { getFormattedDate } from "../../utils/helperFunction/getFormattedDate";
import { getFormattedTime } from "../../utils/helperFunction/getFormattedTime";
import { isLive } from "../../utils/helperFunction/isLive";
import { ACCENT_EVENT_SCREEN } from "../../utils/LOADING_TYPES";
import { HeaderHeight, HorizontalPadding } from "../../utils/UI_CONSTANTS";
import { STUDENT } from "../../utils/USER_TYPE";
import { feedsAPI } from "./feedsAPI";

const FeedScreen = observer(({ navigation }) => {
  //this is for handling notifications

  if (!USER_STORE.getAppLoaded) {
    USER_STORE.setAppLoaded(true);
  }
  const onRefresh = React.useCallback(() => {
    FEEDS_STORE.setRefreshing(true);
    FEEDS_STORE.setError(false);
    FEEDS_STORE.setErrorText("");
    //FEEDS_STORE.setLoading(true);
    FEEDS_STORE.setSuccess(false);

    feedsAPI(true);
  }, []);

  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
  }

  useEffect(() => {
    FEEDS_STORE.setLoading(true);
    feedsAPI(false);
  }, [USER_STORE.getRefreshToken]);

  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, verticalScale(HeaderHeight));

  const interpolateY = diffClamp.interpolate({
    inputRange: [0, verticalScale(HeaderHeight)],
    outputRange: [0, verticalScale(-1 * HeaderHeight)],
  });

  const [timeout, setTimeouts] = useState();
  const [clicked, setClicked] = useState(true);
  const delay = 1000;

  const handleClick = (onPress) => {
    if (clicked) {
      onPress();
      setClicked(false);
    }
    clearTimeout(timeout);
    setTimeouts(
      setTimeout(function () {
        setClicked(true);
      }, delay)
    );
  };

  const SuggestedEvents = () => {
    const Separator = () => (
      <View style={{ width: scale(HorizontalPadding) }} />
    );
    return (
      <>
        {FEEDS_STORE.getData.suggestedEvents != null &&
        FEEDS_STORE.getData.suggestedEvents.length > 0 ? (
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: scale(18),
                marginHorizontal: scale(HorizontalPadding),
                marginVertical: verticalScale(9),
              }}
            >
              Suggested Events
            </Text>

            <FlatList
              data={FEEDS_STORE.getData.suggestedEvents}
              // horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<Separator />}
              ListFooterComponent={<Separator />}
              ItemSeparatorComponent={() => (
                <View style={{ width: scale(HorizontalPadding) }} />
              )}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      handleClick(() => {
                        navigation.push("EventDescriptionScreen", {
                          eventId: item.EventId,
                          app: true,
                        });
                      });
                    }}
                  >
                    <SuggestedEventCard
                      eventImage={item.poster}
                      organizer={item.club.name}
                      eventName={item.Title}
                      isLive={isLive(item.startDate, item.endDate)}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {FEEDS_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_EVENT_SCREEN} />
      ) : FEEDS_STORE.getError ? (
        <ErrorScreen
          showIconInButton={false}
          errorMessage={FEEDS_STORE.getErrorText}
          fn={() => {
            FEEDS_STORE.setErrorText("");
            FEEDS_STORE.setError(false);
            feedsAPI();
          }}
        />
      ) : (
        <SafeAreaView>
          {Platform.OS === "android" ? (
            <Animated.View
              style={{
                elevation: 1,
                zIndex: 1,
                transform: [
                  {
                    translateY: interpolateY,
                  },
                ],
              }}
            >
              <View
                style={{
                  left: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  right: 0,
                  height: verticalScale(HeaderHeight),
                  backgroundColor: colors.EventScreen_headerBackground,

                  elevation: 5,
                  zIndex: 100, //for IOS
                  alignContent: "center",
                  justifyContent: "center",
                  shadowColor: colors.GRAY_DARK,
                }}
              >
                <Text
                  style={{
                    fontSize: verticalScale(18),
                    paddingLeft: scale(HorizontalPadding),
                    color: "white",
                    fontWeight: "bold",
                    color: colors.HeaderText,
                  }}
                >
                  EVENTS
                </Text>
              </View>
            </Animated.View>
          ) : (
            <View
              style={{
                left: 0,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                right: 0,
                height: verticalScale(HeaderHeight),
                backgroundColor: colors.EventScreen_headerBackground,

                elevation: 5,
                zIndex: 100, //for IOS
                alignContent: "center",
                justifyContent: "center",
                shadowColor: colors.GRAY_DARK,
              }}
            >
              <Text
                style={{
                  fontSize: verticalScale(18),
                  paddingLeft: scale(HorizontalPadding),
                  color: "white",
                  fontWeight: "bold",
                  color: colors.HeaderText,
                }}
              >
                EVENTS
              </Text>
            </View>
          )}
          <FlatList
            data={[
              ...FEEDS_STORE.getData.liveEvents,
              ...FEEDS_STORE.getData.upcomingEvents,
            ]}
            showsVerticalScrollIndicator={false}
            style={{ height: "100%" }}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <NoEventScreen
                errorMessage={NO_EVENTS}
                fullscreen={
                  FEEDS_STORE.getData.suggestedEvents == null ||
                  FEEDS_STORE.getData.suggestedEvents.length == 0
                }
              />
            }
            ListHeaderComponent={
              <View style={{ height: verticalScale(HeaderHeight) }}></View>
            }
            ListFooterComponent={<SuggestedEvents />}
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            refreshControl={
              <RefreshControl
                refreshing={FEEDS_STORE.getRefreshing}
                colors={[colors.Accent]}
                tintColor={colors.Accent}
                onRefresh={onRefresh}
                progressViewOffset={verticalScale(50)}
              />
            }
            bouncesZoom={false}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    handleClick(() => {
                      navigation.push("EventDescriptionScreen", {
                        eventId: item.EventId,
                        app: true,
                      });
                    });
                  }}
                >
                  {USER_STORE.getUserType === STUDENT ? (
                    <EventsCard
                      date={getFormattedDate(item.startDate)}
                      time={getFormattedTime(item.startDate)}
                      name={item.Title}
                      desc={item.Description}
                      eventImage={item.poster}
                      organizer={
                        item.club.name != undefined ? item.club.name : "NA"
                      }
                      isLive={item.isLive}
                      wasInterested={item.isInterested}
                      eventId={item.EventId}
                      urlId={item.urlId}
                    />
                  ) : (
                    <EventsCard
                      date={getFormattedDate(item.startDate)}
                      time={getFormattedTime(item.startDate)}
                      name={item.Title}
                      desc={item.Description}
                      eventImage={item.poster}
                      organizer={FEEDS_STORE.getData.clubName}
                      isLive={item.isLive}
                      wasInterested={false}
                      eventId={item.EventId}
                      urlId={item.urlId}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            numColumns={1}
            keyExtractor={(item, index) => index}
          />
        </SafeAreaView>
      )}
    </View>
  );
});

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
