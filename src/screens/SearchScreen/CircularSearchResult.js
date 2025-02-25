import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Keyboard, Switch, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import {searchApi} from '../../apis/searchApi';
import AcademicSearchCard from '../../components/AcademicSearchCard';
import Text from '../../components/TextComponent';
import {PreventDoubleClickWithOpacity as TouchableOpacity} from '../../components/TouchableOpacity';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {API_STORE} from '../../mobx/API_STORE';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {API_CIRCULAR_LIST} from '../../utils/API_CONSTANTS';
import {useToast} from 'react-native-toast-notifications';
import LoaderPage from '../../components/LoadingScreen';
import {ACCENT_SEARCH_SCREEN} from '../../utils/LOADING_TYPES';

const CircularSearchResult = ({searchQuery, setScreen, navigation}) => {
  const footer = () => {
    return <View />;
  };
  const Separator = () => {
    return (
      <View
        style={{
          height: verticalScale(1),
          backgroundColor: colors.GRAY_LIGHT,
        }}
      />
    );
  };
  const toast = useToast();
  const [API, setAPI] = useState('');
  const [onlyAdmin, setOnlyAdmin] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [Error, setError] = useState(false);
  const [ErrorText, setErrorText] = useState('');
  const isFocused = useIsFocused();
  const [DATA, setDATA] = useState([]);
  const [timeout, setTimeouts] = useState();
  const [clicked, setClicked] = useState(true);
  const [LoadingList, setLoadingList] = useState(true);
  const delay = 1000;

  useEffect(() => {
    setLoadingList(true);
    if (DATA.length === 0)
      NetInfo.fetch().then(state => {
        if (state.isConnected == true) {
          axios
            .get(API_STORE.getBaseUrl + API_CIRCULAR_LIST, {timeout: 2500})
            .then(response => {
              setLoadingList(false);
              if (response.status === 200)
                if (DATA.length === 0) {
                  setLoadingList(false);
                  setDATA(response.data.circulars);
                }
            })
            .catch(() => {
              setLoadingList(false);
              toast.show('Unexpected Error has occurred', {type: 'warning'});
            });
        } else {
          setLoadingList(false);
          toast.show(NO_NETWORK, {type: 'warning'});
        }
      });
  }, []);

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
  useEffect(()=>{
    if (isFocused) {
      setScreen('circulars');
      BOTTOM_NAV_STORE.setTabVisibility(true);
      if (searchQuery.trim() != '') {
        if (searchQuery.trim() != API) {
          setAPI(searchQuery.trim());
          setLoading(true);
          console.log('Doing API CALL IN ACADEMIC SEARCH: ' + searchQuery.trim());
  
          searchApi(
            searchQuery.trim(),
            'admin',
            res => {
              setError(false);
              setData(res.data);
              setLoading(false);
            },
            err => {
              setErrorText(err);
              setError(true);
  
              setData([]);
              setLoading(false);
            },
          );
        }
      } else if (searchQuery.trim() === '' && API != '') {
        setAPI('');
      }
    }
  }, [isFocused, searchQuery, API, setScreen]);
  
  const toggleSwitch = () => {
    setOnlyAdmin(!onlyAdmin);
  };

  return (
    <View style={{flex: 1}}>
      {Loading ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: scale(HorizontalPadding),
              marginVertical: verticalScale(HorizontalPadding),
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              animating={true}
              size={'small'}
              color={colors.Contrary}
              style={{margin: scale(10)}}
            />

            <Text
              style={{
                textAlign: 'center',
                fontSize: scale(14),
                paddingVertical: verticalScale(6),
              }}>
              Searching for{' '}
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: scale(14),
                  paddingVertical: verticalScale(6),
                  color: colors.GRAY_DARK,
                }}>
                "{searchQuery.trim()}"...
              </Text>
            </Text>
          </View>
        </>
      ) : (
        <>
          {Error && API != '' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: scale(HorizontalPadding),
                  marginVertical: verticalScale(HorizontalPadding + 5),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: scale(14),
                    paddingVertical: verticalScale(6),
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: scale(14),
                      paddingVertical: verticalScale(9),
                      color: colors.GRAY_DARK,
                    }}>
                    {ErrorText}
                  </Text>
                </Text>
              </View>
            </>
          ) : (
            <>
              {API != '' ? (
                <FlatList
                  data={onlyAdmin ? Data.filter(item => item.isOfficial) : Data}
                  showsVerticalScrollIndicator={false}
                  onScroll={() => {
                    Keyboard.dismiss();
                  }}
                  ListHeaderComponent={
                    <View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          marginTop: verticalScale(),
                          marginBottom: verticalScale(8),
                          alignItems: 'center',
                          borderRadius: scale(8),
                        }}>
                        <Switch
                          trackColor={{
                            false: colors.GRAY_DARK,
                            true: colors.Accent,
                          }}
                          style={{marginLeft: scale(12)}}
                          thumbColor={onlyAdmin ? colors.WHITE : colors.WHITE}
                          ios_backgroundColor={colors.iosBackgroundColor}
                          onValueChange={toggleSwitch}
                          value={onlyAdmin}
                        />
                        <Text
                          style={{
                            fontSize: scale(12),
                            fontWeight: 'bold',
                            marginLeft: scale(5),
                            color: onlyAdmin ? colors.Accent : colors.GRAY_DARK,
                            textTransform: 'uppercase',
                          }}>
                          Official Only
                        </Text>
                      </View>
                      <Separator />
                    </View>
                  }
                  ListFooterComponent={footer()}
                  ListEmptyComponent={
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: scale(HorizontalPadding),
                        marginVertical: verticalScale(HorizontalPadding + 5),
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: scale(14),
                          paddingVertical: verticalScale(6),
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: scale(14),
                            paddingVertical: verticalScale(9),
                            color: colors.GRAY_DARK,
                          }}>
                          No Official circulars found for "{searchQuery.trim()}"
                        </Text>
                      </Text>
                    </View>
                  }
                  renderItem={({item}) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        handleClick(() => {
                          navigation.push('AnnouncementDetail', {
                            circularId: item._id,
                          });
                        });
                      }}>
                      <AcademicSearchCard
                        title={item.title}
                        name={item.club.name}
                        desc={item.description}
                        url={item.club.profilePic}
                        date={item.createdAt}
                        isOfficial={item.isOfficial}
                      />
                      <Separator />
                    </TouchableOpacity>
                  )}
                  numColumns={1}
                />
              ) : (
                <>
                  <FlatList
                    data={
                      onlyAdmin ? DATA.filter(item => item.isOfficial) : DATA
                    }
                    showsVerticalScrollIndicator={false}
                    onScroll={() => {
                      Keyboard.dismiss();
                    }}
                    ListHeaderComponent={
                      <View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            marginTop: verticalScale(0),
                            marginBottom: verticalScale(8),
                            alignItems: 'center',
                            borderRadius: scale(8),
                          }}>
                          <Switch
                            trackColor={{
                              false: colors.GRAY_DARK,
                              true: colors.Accent,
                            }}
                            style={{marginLeft: scale(12)}}
                            thumbColor={onlyAdmin ? colors.WHITE : colors.WHITE}
                            ios_backgroundColor={colors.iosBackgroundColor}
                            onValueChange={toggleSwitch}
                            value={onlyAdmin}
                          />
                          <Text
                            style={{
                              fontSize: scale(12),
                              fontWeight: 'bold',
                              marginLeft: scale(5),
                              color: onlyAdmin
                                ? colors.Accent
                                : colors.GRAY_DARK,
                              textTransform: 'uppercase',
                              marginTop:  scale(0)
                            }}>
                            Official Only
                          </Text>
                        </View>
                        <Separator />
                      </View>
                    }
                    ListFooterComponent={footer()}
                    ListEmptyComponent={
                      LoadingList ? (
                        <LoaderPage LoadingAccent={ACCENT_SEARCH_SCREEN} />
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: scale(HorizontalPadding),
                            marginVertical: verticalScale(
                              HorizontalPadding + 5,
                            ),
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: scale(14),
                              paddingVertical: verticalScale(6),
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: scale(14),
                                paddingVertical: verticalScale(9),
                                color: colors.GRAY_DARK,
                              }}>
                              No recent circulars
                            </Text>
                          </Text>
                        </View>
                      )
                    }
                    renderItem={({item}) => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          handleClick(() => {
                            navigation.push('AnnouncementDetail', {
                              circularId: item._id,
                            });
                          });
                        }}>
                        <AcademicSearchCard
                          title={item.title}
                          name={item.club.name}
                          desc={item.description}
                          url={item.club.profilePic}
                          date={item.createdAt}
                          isOfficial={item.isOfficial}
                        />
                        <Separator />
                      </TouchableOpacity>
                    )}
                    numColumns={1}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default CircularSearchResult;
