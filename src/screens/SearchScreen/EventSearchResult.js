import {useIsFocused} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Keyboard, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import {searchApi} from '../../apis/searchApi';
import EventSearchCard from '../../components/EventSearchCard';
import Text from '../../components/TextComponent';
import {PreventDoubleClickWithOpacity as TouchableOpacity} from '../../components/TouchableOpacity';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const EventSearchResult = ({searchQuery, setScreen, navigation}) => {
  const footer = () => {
    return <View />;
  };

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
    setScreen('events');
    BOTTOM_NAV_STORE.setTabVisibility(true);
    if (searchQuery.trim() != '') {
      if (searchQuery.trim() != API) {
        setAPI(searchQuery.trim());
        setLoading(true);
        console.log('Doing API CALL IN EVENT SEARCH: ' + searchQuery.trim());

        searchApi(
          searchQuery.trim(),
          'event',
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
                  showsVerticalScrollIndicator={false}
                  onScroll={() => {
                    Keyboard.dismiss();
                  }}
                  ListFooterComponent={footer()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        handleClick(() => {
                          navigation.push('EventDescriptionScreen', {
                            eventId: item.id,
                            app: true,
                          });
                        });
                      }}>
                      <EventSearchCard
                        name={item.title}
                        desc={item.description}
                        organizer={item.clubName}
                        eventImage={item.image}
                        date={item.startDate}
                        startTime={item.startDate}
                        endTime={item.endDate}
                      />
                    </TouchableOpacity>
                  )}
                  numColumns={1}
                />
              ) : (
                <View></View>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default EventSearchResult;
