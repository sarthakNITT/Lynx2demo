import {useIsFocused} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import ActivityCard from '../../components/ActivityCard';
import ErrorScreen from '../../components/ErrorScreen';
import LoaderPage from '../../components/LoadingScreen';
import Text from '../../components/TextComponent';
import {ACTIVITY_STORE} from '../../mobx/ACITIVITY_STORE';
import {API_STORE} from '../../mobx/API_STORE';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import * as colors from '../../utils/colors';
import {ACCENT_ACTIVITY_SCREEN} from '../../utils/LOADING_TYPES';
import {HeaderHeight, HorizontalPadding} from '../../utils/UI_CONSTANTS';
import ActivityAPI from './ActivityAPI';

let PAGE_NUMBER = 0;
const ActivityScreen = observer(({route, navigation}) => {
  const [LoadedBefore, setLoadedBefore] = useState(false);
  const flatList = useRef();

  if (route.params != undefined && route.params.notification === true) {
    route.params.notification = false;
    if (LoadedBefore) {
      PAGE_NUMBER = 0;
      flatList.current.scrollToOffset({animated: true, offset: 0});
      ACTIVITY_STORE.setRefreshing(true);
      ACTIVITY_STORE.setError(false);
      ACTIVITY_STORE.setErrorText('');
      ACTIVITY_STORE.setLoading(false);
      ACTIVITY_STORE.setSuccess(false);
      ActivityAPI(true);
    }
  }

  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
  }
  const onRefresh = React.useCallback(() => {
    PAGE_NUMBER = 0;
    ACTIVITY_STORE.setRefreshing(true);
    ACTIVITY_STORE.setError(false);
    ACTIVITY_STORE.setErrorText('');
    ACTIVITY_STORE.setLoading(false);
    ACTIVITY_STORE.setSuccess(false);

    ActivityAPI(true);
  }, []);

  useEffect(() => {
    setLoadedBefore(true);
    ActivityAPI(false);
  }, []);

  const [timeout, setTimeouts] = useState();
  const [clicked, setClicked] = useState(true);
  const delay = 1000;

  const handleClick = onPress => {
    if (clicked) {
      onPress();
      setClicked(false);
    }
    clearTimeout(timeout);
    setTimeouts(
      setTimeout(function () {
        setClicked(true);
      }, delay),
    );
  };
  const navigationHandler = (type, id) => {
    if (type === 'event') {
      navigation.push('EventDescriptionScreen', {
        eventId: id.event_id,
        app: true,
      });
    } else {
      navigation.push('AnnouncementDetail', {
        circularId: id.circular_id,
      });
    }
  };

  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, verticalScale(HeaderHeight));

  const interpolateY = diffClamp.interpolate({
    inputRange: [0, verticalScale(HeaderHeight)],
    outputRange: [0, verticalScale(-1 * HeaderHeight)],
  });
  return (
    <View style={{flex: 1}}>
      {ACTIVITY_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_ACTIVITY_SCREEN} />
      ) : ACTIVITY_STORE.getError ? (
        <ErrorScreen
          showIconInButton={false}
          errorMessage={ACTIVITY_STORE.getErrorText}
          fn={() => {
            ACTIVITY_STORE.setErrorText('');
            ACTIVITY_STORE.setError(false);
            ActivityAPI();
          }}
        />
      ) : (
        <View>
          {Platform.OS === 'android' ? (
            <Animated.View
              style={{
                elevation: 1,
                zIndex: 1,
                transform: [
                  {
                    translateY: interpolateY,
                  },
                ],
              }}>
              <View
                style={{
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  right: 0,
                  height: verticalScale(HeaderHeight),
                  backgroundColor: colors.EventScreen_headerBackground,
                  // borderBottomLeftRadius: scale(10),
                  // borderBottomRightRadius: scale(10),
                  elevation: 5,
                  zIndex: 100, //for IOS
                  alignContent: 'center',
                  justifyContent: 'center',
                  shadowColor: colors.GRAY_DARK,
                }}>
                <Text
                  style={{
                    fontSize: verticalScale(18),
                    paddingLeft: scale(HorizontalPadding),
                    color: 'white',
                    fontWeight: 'bold',
                    color: colors.HeaderText,
                  }}>
                  NOTIFICATIONS
                </Text>
              </View>
            </Animated.View>
          ) : (
            <View
              style={{
                left: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                right: 0,
                height: verticalScale(HeaderHeight),
                backgroundColor: colors.EventScreen_headerBackground,
                // borderBottomLeftRadius: scale(10),
                // borderBottomRightRadius: scale(10),
                elevation: 5,
                zIndex: 100, //for IOS
                alignContent: 'center',
                justifyContent: 'center',
                shadowColor: colors.GRAY_DARK,
              }}>
              <Text
                style={{
                  fontSize: verticalScale(18),
                  paddingLeft: scale(HorizontalPadding),
                  color: 'white',
                  fontWeight: 'bold',
                  color: colors.HeaderText,
                }}>
                NOTIFICATIONS
              </Text>
            </View>
          )}
          <FlatList
            ref={flatList}
            data={ACTIVITY_STORE.getDisplayData}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              PAGE_NUMBER = PAGE_NUMBER + 1;

              ACTIVITY_STORE.loadDisplayData(PAGE_NUMBER);
            }}
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            showsVerticalScrollIndicator={false}
            style={{height: '100%', color:''}}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={ACTIVITY_STORE.getRefreshing}
                colors={[colors.Accent]}
                tintColor={colors.Accent}
                onRefresh={onRefresh}
                progressViewOffset={verticalScale(50)}
              />
            }
            ListFooterComponent={
              <>
                {ACTIVITY_STORE.getDisplayData.length ===
                ACTIVITY_STORE.getData.length ? null : (
                  <ActivityIndicator
                    animating={true}
                    size={'large'}
                    color={colors.Contrary}
                    style={{margin: scale(10)}}
                  />
                )}
              </>
            }
            ListEmptyComponent={
              <Text
                style={{
                  marginTop: '75%',
                  fontSize: scale(16),
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                There are no notifications for you yet
              </Text>
            }
            ListHeaderComponent={
              <View style={{height: verticalScale(HeaderHeight)}}></View>
            }
            bouncesZoom={false}
            renderItem={({item, index}) => {
              return (
                <>
                  <TouchableOpacity
                    disabled={item.type === 'event'}
                    onPress={() => {
                      handleClick(() => {
                        navigationHandler(item.type, item);
                      });
                    }}>
                    <ActivityCard
                      isOfficial={item.isOfficial}
                      isReminder={item.isReminder}
                      date={item.createdAt}
                      title={item.title}
                      desc={item.body}
                      imageUrl={
                        item.type === 'event'
                          ? API_STORE.getCDN + item.imageUrl
                          : API_STORE.getCDN + item.sender_id.profilePic
                      }
                      type={item.type}
                      sender={item.sender_id.name}
                      navigation={navigation}
                      id={item}
                      touch={() => {
                        handleClick(() => {
                          navigationHandler(item.type, item);
                        });
                      }}
                    />
                    <Divider style={{height: verticalScale(1.5)}} />
                  </TouchableOpacity>
                </>
              );
            }}
            numColumns={1}
            keyExtractor={(item, index) => item._id}
          />
        </View>
      )}
    </View>
  );
});

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
