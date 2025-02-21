import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  Share,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import ErrorScreen from "../../components/ErrorScreen";
import LoaderPage from "../../components/LoadingScreen";
import Text from "../../components/TextComponent";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { DEEP_LINKING_STORE } from "../../mobx/DEEP_LINKING_STORE";
import { EVENT_DESCRIPTION_STORE } from "../../mobx/EVENT_DESCRIPTION_STORE";
import { DEEP_LINK_BASE_URL } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors";
import { getFormattedDate } from "../../utils/helperFunction/getFormattedDate";
import { getFormattedTime } from "../../utils/helperFunction/getFormattedTime";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import About from "./About";
import ClubCard from "./ClubCard";
import { eventDescriptionAPI } from "./eventDescriptionAPI";
import EventDescriptionHeader, { isAuthorized } from "./eventDescriptionHeader";
import EventStatusTag from "./EventStatusTag";
import Images from "./Images";
import Links from "./Links";
import Tags from "./Tags";

const EventDescriptionScreen = observer(({ route, navigation }) => {
  route.params = route.params || {}; // sample eventid for verification
 // route.params.eventId = "622705558011b4363cd4f38e";
  route.params = route.params || {};
  route.params.eventId = route.params.eventId || "";

  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }
  //
  useEffect(() => {
    // Check if route.params exists and if the app property exists
    if (route.params && route.params.app !== true) {
      DEEP_LINKING_STORE.setAllow(true);
    }
    //console.log(EVENT_DESCRIPTION_STORE.getData.student_interest);

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (EVENT_DESCRIPTION_STORE.getInterestedApi === true) {
          return true;
        }

        navigation.goBack();
        return true;
      }
    );

    if (
      EVENT_DESCRIPTION_STORE.getData === "" ||
      (EVENT_DESCRIPTION_STORE.getData.urlId !== route.params.eventId &&
        EVENT_DESCRIPTION_STORE.getData.eventId !== route.params.eventId)
    ) {
      console.log("Doing API EVENT BY ID");
     // console.log(EVENT_DESCRIPTION_STORE.getData.student_interest);
      //console.log('eventId:', route.params.eventId);
      EVENT_DESCRIPTION_STORE.reset();
      EVENT_DESCRIPTION_STORE.setLoading(true);
      EVENT_DESCRIPTION_STORE.setID(route.params.eventId);
      eventDescriptionAPI();
    } else {
      EVENT_DESCRIPTION_STORE.setLoading(false);
    }

    return () => backHandler.remove();
  }, [isFocused]);

  const toast = useToast();

  const showToast = (msg) => {
    toast.show(msg, { type: "warning" });
  };

  return (
    console.log("event is ",EVENT_DESCRIPTION_STORE.getData.photos),
    <View
      style={{
        backgroundColor: colors.EventDescriptionScreen_Back,
        flex: 1,
      }}
    >
      <SafeAreaView>
        {EVENT_DESCRIPTION_STORE.getError ? (
          <ErrorScreen
            buttonText={"GO BACK"}
            errorMessage={
              EVENT_DESCRIPTION_STORE.getErrorText === ""
                ? "Could not load event"
                : EVENT_DESCRIPTION_STORE.getErrorText
            }
            fn={() => {
              EVENT_DESCRIPTION_STORE.reset();
              // navigation.popToTop(); leave this
              navigation.pop();
            }}
          />
        ) : EVENT_DESCRIPTION_STORE.getLoading ||
          EVENT_DESCRIPTION_STORE.getData === "" ? (
          <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
        ) : (
          <>
            <EventDescriptionHeader navigation={navigation} route={route} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {
              EVENT_DESCRIPTION_STORE.getData.photos.length > 0 && (
              <Images
                  images={EVENT_DESCRIPTION_STORE.getData.photos}
                  navigation={navigation}
              />
              )}
              <EventStatusTag
                startTime={EVENT_DESCRIPTION_STORE.getData.startDate}
                endTime={EVENT_DESCRIPTION_STORE.getData.endDate}
              />
              <View
                style={{
                  paddingTop: verticalScale(27),
                  elevation: 1,
                  borderTopRightRadius: scale(16),
                  borderTopLeftRadius: scale(16),
                  paddingHorizontal: scale(HorizontalPadding * 1.45),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: verticalScale(10),
                  }}
              >
                  <Text style={styles.eventName}>
                    {EVENT_DESCRIPTION_STORE.getData.Title}
                  </Text>
                  <IconButton
                    onPress={async () => {
                      try {
                        const result = await Share.share({
                          message:
                            DEEP_LINK_BASE_URL +
                            `/e/${EVENT_DESCRIPTION_STORE.getData.urlId}`,
                          url:
                            DEEP_LINK_BASE_URL +
                            `/e/${EVENT_DESCRIPTION_STORE.getData.urlId}`,
                          title: `${EVENT_DESCRIPTION_STORE.getData.Title} by ${EVENT_DESCRIPTION_STORE.getData.club.name}`,
                        });
                      } catch (error) {
                        showToast(error.message);
                      }
                    }}
                    icon={"share-variant"}
                    color={colors.EventCard_ShareIcon}
                  />
                </View>
                
                {isAuthorized() ? (
                  <>
                    <Text
                      style={{
                        marginTop: verticalScale(-10),
                        marginBottom: verticalScale(10),
                        color: '#000000',
                        //color: colors.Accent,
                        fontWeight: "300",
                        fontStyle: "italic",
                        fontSize: scale(14),
                      }}
                    >
                      Number of Students Interested:{" "}
                      <Text
                        style={{
                          color: '#000000',
                          //color: colors.Accent,
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {EVENT_DESCRIPTION_STORE.getData.student_interest}
                      </Text>
                    </Text>
                  </>
                ) : (
                  <></>
                )}
                {EVENT_DESCRIPTION_STORE.getData.tags.length > 0 ? (
                  <>
                    <Tags
                      tags={EVENT_DESCRIPTION_STORE.getData.tags}
                      navigation={navigation}
                      route={route}
                    />
                  </>
                ) : null}

                 <Text style={styles.headings}>About
                  </Text>
                   
                <About
                  about={EVENT_DESCRIPTION_STORE.getData.Description}
                  startDate={getFormattedDate(
                    EVENT_DESCRIPTION_STORE.getData.startDate
                  )}
                  startTime={getFormattedTime(
                    EVENT_DESCRIPTION_STORE.getData.startDate
                  )}
                  endDate={getFormattedDate(
                    EVENT_DESCRIPTION_STORE.getData.endDate
                  )}
                  endTime={getFormattedTime(
                    EVENT_DESCRIPTION_STORE.getData.endDate
                  )}
                />

                {EVENT_DESCRIPTION_STORE.getData.links.length > 0 ? (
                  <>
                    <Links links={EVENT_DESCRIPTION_STORE.getData.links} />
                  </>
                ) : (
                  <></>
                )}
                <ClubCard
                  name={EVENT_DESCRIPTION_STORE.getData.club.name}
                  imgID={EVENT_DESCRIPTION_STORE.getData.club.profilePic}
                  navigation={navigation}
                  clubID={EVENT_DESCRIPTION_STORE.getData.club.id}
                  route={route}
                />
                <View style={{ height: verticalScale(80) }} />
              </View>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </View>
  );
});

export default EventDescriptionScreen;
const styles = ScaledSheet.create({
  eventName: {
    fontSize: "21@s",
    paddingTop: "0@vs",
    fontWeight: "bold",
    backgroundColor: colors.WHITE,
    marginTop: verticalScale(0),
    maxWidth: "90%",
    color: colors.EventDescriptionScreen_Title,
  },
  divider: {
    // marginTop: '10@vs',
    height: "0.5@vs",
    backgroundColor: colors.GRAY_LIGHT,
  },
  headings: {
    fontSize: "20@s",
    paddingTop: "0@vs",
    fontWeight: "bold",
    backgroundColor: colors.WHITE,
    marginVertical: verticalScale(10),
    color: colors.BLACK,
  },
});
