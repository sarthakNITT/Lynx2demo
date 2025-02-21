// import NetInfo from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, Keyboard, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import {searchApi} from '../../apis/searchApi';
import ClubSearchCard from '../../components/ClubSearchCard';
import LoaderPage from '../../components/LoadingScreen';
import Text from '../../components/TextComponent';
import {API_STORE} from '../../mobx/API_STORE';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {API_CLUB_LIST} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {ACCENT_SEARCH_SCREEN} from '../../utils/LOADING_TYPES';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const ClubSearchResult = ({searchQuery, setScreen, navigation}) => {
  const footer = () => {
    return <View style={{height: verticalScale(6)}} />;
  };
  const [DATA, setDATA] = useState([]);
  const toast = useToast();

  // useEffect(() => {
  //   console.log(855);
  //   if (DATA.length === 0)
  //     NetInfo.fetch().then(state => {
  //       if (state.isConnected == true) {
  //         axios
  //           .get(API_STORE.getBaseUrl + API_CLUB_LIST, {timeout: 2500})
  //           .then(response => {
  //             if (response.status === 200)
  //               if (DATA.length === 0) setDATA(response.data.data);
  //           })
  //           .catch(() => {
  //             toast.show('Unexpected Error has occurred', {type: 'warning'});
  //           });
  //       } else {
  //         toast.show(NO_NETWORK, {type: 'warning'});
  //       }
  //     });
  // }, []);

  const [API, setAPI] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [Error, setError] = useState(false);
  const [ErrorText, setErrorText] = useState('');
  const isFocused = useIsFocused();

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

  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
    setScreen('accounts');
    if (searchQuery.trim() != '') {
      if (searchQuery.trim() != API) {
        setAPI(searchQuery.trim());
        setLoading(true);
        console.log('Doing API CALL IN CLUB SEARCH: ' + searchQuery.trim());
        searchApi(
          searchQuery.trim(),
          'club',
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
                  data={Data}
                  onScroll={() => {
                    Keyboard.dismiss();
                  }}
                  ListFooterComponent={footer()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        handleClick(() => {
                          navigation.navigate(
                            'ClubDescription',
                            {ClubId: item._id},
                            {initial: false},
                          );
                        });
                      }}>
                      <ClubSearchCard
                        clubIconUrl={item.profilePic}
                        clubName={item.name}
                        clubDescription={item.description}
                        navigation={navigation}
                        id={item._id}
                      />
                    </TouchableOpacity>
                  )}
                  numColumns={1}
                />
              ) : (
                <View>
                  <FlatList
                    data={DATA}
                    showsVerticalScrollIndicator={false}
                    vertical={true}
                    ListEmptyComponent={
                      <LoaderPage LoadingAccent={ACCENT_SEARCH_SCREEN} />
                    }
                    onScroll={() => {
                      Keyboard.dismiss();
                    }}
                    ListFooterComponent={footer()}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          handleClick(() => {
                            navigation.navigate(
                              'ClubDescription',
                              {ClubId: item._id},
                              {initial: false},
                            );
                          });
                        }}>
                        <ClubSearchCard
                          clubIconUrl={item.profilePic}
                          clubName={item.name}
                          clubDescription={item.description}
                          navigation={navigation}
                          id={item._id}
                        />
                      </TouchableOpacity>
                    )}
                    numColumns={1}
                  />
                </View>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ClubSearchResult;
