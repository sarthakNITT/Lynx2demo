import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

import {
  Platform,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView
} from "react-native";
import { Button, Divider } from "react-native-paper";
import {
  scale,
  ScaledSheet,
  verticalScale,
  moderateScale,
} from "react-native-size-matters";
import ErrorScreen from "../../components/ErrorScreen";
import Header from "../../components/Header";
import LoaderPage from "../../components/LoadingScreen";
import Text from "../../components/TextComponent";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { CLUB_DESCRIPTION_STORE } from "../../mobx/CLUB_DESCRIPTION_STORE";
import { EVENT_DESCRIPTION_STORE } from "../../mobx/EVENT_DESCRIPTION_STORE";
import * as colors from "../../utils/colors";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import {
  FONT_SIZE_USERPAGE_TITLE,
  HorizontalPadding,
} from "../../utils/UI_CONSTANTS";
import { clubDescriptionAPI } from "./clubDescriptionAPI";
import ClubDescriptionHeader from "./clubDescriptionHeader";
import EventsView from "./EventsView";
import CircularView from "./circularView";

const renderTopLayout = (data, navigation, route) => (
  console.log(data.url),
  (
    <View>
      <ClubDescriptionHeader
        name={data.name}
        email={data.email}
        followers={data.followers_count}
        url={data.profile_pic}
        description={data.description}
        navigation={navigation}
        route={route}
      />
    </View>
  )
);

const ClubDescriptionScreen = observer(({ route, navigation }) => {
  //route.params = route.params || {}; // Ensure route.params exists
  //route.params.ClubId = route.params.ClubId || "";
  //console.log(route.params.ClubId);

  const goToCircularList = () => {
    navigation.push("CircularList");
  };
  const goToDetail = (Id, type) => {
    if (type == "Circular")
      navigation.push("AnnouncementDetail", {
        circularId: Id,
      });
    else {
      EVENT_DESCRIPTION_STORE.setLoading(true);
      navigation.push("EventDescriptionScreen", {
        eventId: Id,
        app: true,
        fromClubDescription: true,
      });
    }
  };

  const [tabSelected, settabSelected] = useState("Circular");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      BOTTOM_NAV_STORE.setTabVisibility(false);
    }
  }, [isFocused]);


  const [offset, setOffset] = useState(0);
  const { width } = Dimensions.get("screen");
  const scrollView = React.useRef(null);
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

  const goToCircular = () => {
    if (scrollView.current != null) {
      scrollView.current.scrollTo({ x: width, animated: true });
      settabSelected("Events");
    }
  };

  const goToEvent = () => {
    if (scrollView.current != null) {
      scrollView.current.scrollTo({ x: 0, animated: true });
      settabSelected("Circular");
    }
  };

  const onRefresh = React.useCallback(() => {
    PAGE_NUMBER = 0;
    CLUB_DESCRIPTION_STORE.setRefreshing(true);
    CLUB_DESCRIPTION_STORE.setError(false);
    CLUB_DESCRIPTION_STORE.setErrorText("");
    CLUB_DESCRIPTION_STORE.setLoading(false);
    CLUB_DESCRIPTION_STORE.setSuccess(false);
    clubDescriptionAPI(true);
  }, []);

  useEffect(() => {
    CLUB_DESCRIPTION_STORE.setLoading(true);
    BOTTOM_NAV_STORE.setTabVisibility(false);
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.pop();
        return true;
      }
    );
    CLUB_DESCRIPTION_STORE.setID(route.params.ClubId);

    if (route.params.fromEventDescription) {
      CLUB_DESCRIPTION_STORE.setFromEventScreen(
        route.params.fromEventDescription
      );
    } else {
      CLUB_DESCRIPTION_STORE.setFromEventScreen(false);
    }
    BOTTOM_NAV_STORE.setTabVisibility(false);
    clubDescriptionAPI(false);

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {CLUB_DESCRIPTION_STORE.getError ? (
        <ErrorScreen
          showIconInButton={false}
          errorMessage={CLUB_DESCRIPTION_STORE.getErrorText}
          fn={() => {
            CLUB_DESCRIPTION_STORE.setErrorText("");
            CLUB_DESCRIPTION_STORE.setError(false);
            clubDescriptionAPI(false);
          }}
        />
      ) : CLUB_DESCRIPTION_STORE.getLoading ||
        CLUB_DESCRIPTION_STORE.getData === "" ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : (
        <View style={styles.container}>
          <Header
            props={{ navigation: navigation }}
            title={
              CLUB_DESCRIPTION_STORE.getLoading
                ? ""
                : CLUB_DESCRIPTION_STORE.getData.name
            }
            func={() => {
              navigation.pop();
            }}
          />

          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ flexGrow: 0 }}
          >
            {renderTopLayout(CLUB_DESCRIPTION_STORE.getData, navigation, route)}
            <View
              style={{
                flexDirection: "row",
                paddingTop: verticalScale(0),
                paddingHorizontal: scale(HorizontalPadding),
                backgroundColor: colors.WHITE,
              }}
            >
              <Button
                onPress={() => goToEvent()}
                color={colors.Accent}
                style={{
                  opacity: tabSelected == "Circular" ? 1 : 0.35,
                  flex: 1,
                  color: '#1d2d44',
                }}
                labelStyle={{
                  fontWeight: tabSelected == "Circular" ? "800" : "normal",
                  fontSize: moderateScale(FONT_SIZE_USERPAGE_TITLE),
                  textTransform: "none",
                  color: '#1d2d44',
                }}
              >
                Events
              </Button>
              <Button
                onPress={() => goToCircular()}
                color={colors.Accent}
                style={{
                  opacity: tabSelected == "Circular" ? 0.35 : 1,
                  flex: 1,
                }}
                labelStyle={{
                  fontWeight: tabSelected == "Circular" ? "normal" : "800",
                  fontSize: moderateScale(FONT_SIZE_USERPAGE_TITLE),
                  textTransform: "none",
                  color: '#1d2d44',
                }}
              >
                Circulars
              </Button>
            </View>
            <Divider
              style={{
                left: offset,
                backgroundColor: colors.Accent,
                height: verticalScale(2),
                width: width / 2,
              }}
            />

            <View style={styles.container}>
              <ScrollView
                ref={scrollView}
                style={{
                  width: width,
                  backgroundColor: colors.USER_PAGE_BG,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                pagingEnabled={true}
                onScroll={(event) => {
                  const offsetX = event.nativeEvent.contentOffset.x;
                  setOffset(offsetX / 2);
                }}
                contentContainerStyle={{ flexGrow: 1 }}
                onScrollEndDrag={(event) => {
                  const offsetX = event.nativeEvent.contentOffset.x;

                  if (tabSelected == "Circular") {
                    if (offsetX <= width / 15) goToEvent();
                    else goToCircular();
                  } else {
                    if (offsetX <= (14 * width) / 15) goToEvent();
                    else goToCircular();
                  }
                }}
              >
                <EventsView
                  liveEventArray={CLUB_DESCRIPTION_STORE.getLiveEvents}
                  upcomingEventArray={CLUB_DESCRIPTION_STORE.getUpcomingEvents}
                  goToDetail={goToDetail}
                  navigation={navigation}
                  numberOfCirculars={CLUB_DESCRIPTION_STORE.getCirculars.length}
                />
                <View style={{ marginBottom: verticalScale(5) }}>
                  <CircularView onRefresh={onRefresh} goToDetail={goToDetail} />
                  {CLUB_DESCRIPTION_STORE.getCirculars.length > 3 ? (
                    <TouchableOpacity
                      activeOpacity={0.75}
                      onPress={() =>
                        handleClick(() => {
                          goToCircularList(navigation);
                        })
                      }
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          justifyContent: "center",
                          fontSize: scale(16),
                          padding: scale(5),
                          fontWeight: "600",
                        //  color: colors.Tertiary,
                          color:'#3e5c76',
                          marginHorizontal: scale(HorizontalPadding),
                          marginBottom: verticalScale(15),
                        }}
                      >
                        Show More
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
});

export default ClubDescriptionScreen;

const styles = ScaledSheet.create({
  head: {
    color: colors.BLACK,
    fontWeight: "bold",
    fontSize: "14@s",
    paddingTop: "10@vs",

    paddingHorizontal: scale(HorizontalPadding),
  },

  divider: {
    height: "2@vs",
    backgroundColor: colors.GRAY_LIGHT,
  },
  container: {
    flex: 1,
  },
});
