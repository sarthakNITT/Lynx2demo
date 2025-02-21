// import NetInfo from "@react-native-community/netinfo";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { observer } from "mobx-react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Platform,
  RefreshControl,
  View,
} from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import CustomAlert from "../../components/customAlert";
import ErrorScreen from "../../components/ErrorScreen";
import LoaderPage from "../../components/LoadingScreen";
import Text from "../../components/TextComponent";
import { PreventDoubleClickWithOpacity as TouchableOpacity } from "../../components/TouchableOpacity";
import { API_STORE } from "../../mobx/API_STORE";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { CALENDAR_STORE } from "../../mobx/CALENDAR_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import { API_DELETE_CALENDAR_NOTICE } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors";
import { NO_NETWORK, UNEXPECTED_ERROR } from "../../utils/ERROR_MESSAGES";
import { getFormattedDate } from "../../utils/helperFunction/getFormattedDate";
import { RefreshJwtHandler } from "../../utils/helperFunction/refreshJwtHandler";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import { HeaderHeight, HorizontalPadding } from "../../utils/UI_CONSTANTS";
import * as USER_TYPE from "../../utils/USER_TYPE";
import AdminNoticeCard from "./AdminNoticeCard";
import EventCard from "./EventCard";
import { eventList } from "./eventListAPI";
import FabGroup from "./FabGroup";
import NoEventCard from "./NoEventCard";
import TopLayout from "./TopLayout";

const CalendarScreen = observer(({ navigation }) => {
  const toast = useToast();
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
  }

  const agendaList = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalStartDate, setModalStartDate] = useState("");
  const [modalEndDate, setModalEndDate] = useState("");

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

  const [CalendarNoticeID, setCalendarNoticeID] = useState("");

  var eventDATA,
    filteredEventData = [],
    finalEventData = [];
  var adminEventDATA,
    filteredAdminEventData = [],
    finalAdminEventData = [];
  var filteredData = [];
  var selectedDate = CALENDAR_STORE.getSelectedDate;

  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, verticalScale(HeaderHeight));

  const interpolateY = diffClamp.interpolate({
    inputRange: [0, verticalScale(HeaderHeight)],
    outputRange: [0, verticalScale(-1 * HeaderHeight)],
  });

  const onRefresh = React.useCallback(async () => {
    CALENDAR_STORE.setRefreshing(true);
    CALENDAR_STORE.setError(false);
    CALENDAR_STORE.setErrorText("");
    CALENDAR_STORE.setLoading(false);
    CALENDAR_STORE.setSuccess(false);
    eventList(true);
  }, []);

  //API Call for getting event list
  useEffect(() => {
    eventList();
  }, []);

  if (CALENDAR_STORE.getSuccess) {
    eventDATA = CALENDAR_STORE.getEventData.events;
    adminEventDATA = CALENDAR_STORE.getAdminEventData.events;

    for (var i = 0; i < eventDATA.length; i++) {
      filteredEventData = eventDATA[i].data.filter(function (event) {
        return (
          moment(new Date(event.startDate)).format("DD-MM-YYYY") == selectedDate
        );
      });

      finalEventData = [...finalEventData, ...filteredEventData];
    }

    for (var i = 0; i < adminEventDATA.length; i++) {
      filteredAdminEventData = adminEventDATA[i].data.filter(function (notice) {
        return (
          moment(new Date(notice.startDate)).format("DD-MM-YYYY") ==
          selectedDate
        );
      });
      filteredAdminEventData.forEach((element) => {
        element["admin_event"] = true;
      });

      finalAdminEventData = [...finalAdminEventData, ...filteredAdminEventData];
    }

    console.log(
      "Final Admin Event Data:" + JSON.stringify(finalAdminEventData)
    );
    filteredData = [...finalAdminEventData, ...finalEventData];
  }

  const onNoticePress = (notice) => {
    const startDate = getFormattedDate(notice.startDate);
    const endDate = getFormattedDate(notice.endDate);
    const noticeDescription = notice.Description;
    const noticeTitle = notice.Title;

    setModalTitle(noticeTitle);
    setModalMessage(noticeDescription);
    setModalStartDate(startDate);
    setModalEndDate(endDate);
    setModalVisible(true);
    setCalendarNoticeID(notice.EventId);
  };

  const Item = ({ item }) =>
    item.admin_event ? (
      <TouchableOpacity
        onPress={() =>
          handleClick(() => {
            onNoticePress(item);
          })
        }
        activeOpacity={0.5}
      >
        <AdminNoticeCard data={item} />
      </TouchableOpacity>
    ) : (
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
        <EventCard data={item} />
      </TouchableOpacity>
    );

  const renderEmptyItem = () => <NoEventCard />;

  return (
    <View style={{ flex: 1 }}>
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
              backgroundColor: colors.CalendarScreen_headerBackground,

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
              CALENDAR
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
            backgroundColor: colors.CalendarScreen_headerBackground,

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
            CALENDAR
          </Text>
        </View>
      )}
      <CustomAlert
        title={modalTitle}
        message={modalMessage}
        startDate={modalStartDate}
        endDate={modalEndDate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        buttons={[
          USER_STORE.getUserType === USER_TYPE.ADMIN
            ? {
                text: "Delete",
                styles: {
                  color: "red",
                },
                func: async () => {
                  // const netInfo = await NetInfo.fetch();
                  // if (!netInfo.isConnected) {
                  //   toast.show(NO_NETWORK, {
                  //     type: "danger",
                  //   });
                  //   return;
                  // }

                  try {
                    const resp = await axios.delete(
                      API_STORE.getBaseUrl +
                        API_DELETE_CALENDAR_NOTICE +
                        CalendarNoticeID,
                      { headers: { token: USER_STORE.getUserToken } }
                    );
                    //console.log('date iss ',resp.data);
                    if (resp.status === 200) {
                      toast.show("Successfully deleted calendar notice", {
                        type: "success",
                      });
                    }
                    CALENDAR_STORE.setRefreshing(true);
                    eventList(true);
                  } catch (error) {
                    if (error.response) {
                      if (error.response.status === 403) {
                        RefreshJwtHandler()
                          .then(async () => {
                            try {
                              const resp = await axios.delete(
                                API_STORE.getBaseUrl +
                                  API_DELETE_CALENDAR_NOTICE +
                                  CalendarNoticeID,
                                { headers: { token: USER_STORE.getUserToken } }
                              );
                              //console.log(resp.data);
                              if (resp.status === 200) {
                                toast.show(
                                  "Successfully deleted calendar notice",
                                  {
                                    type: "success",
                                  }
                                );
                              }
                              CALENDAR_STORE.setRefreshing(true);
                              eventList(true);
                            } catch {}
                          })
                          .catch(() => {
                            toast.show(UNEXPECTED_ERROR, {
                              type: "danger",
                            });
                          });
                        return;
                      }
                    }
                    toast.show(UNEXPECTED_ERROR, {
                      type: "danger",
                    });
                  }
                },
              }
            : {
                text: "NA",
                styles: {
                  color: "white",
                },
                disabled: true,
              },
          { text: "CLOSE" },
        ]}
      />
      {CALENDAR_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : CALENDAR_STORE.getError ? (
        <ErrorScreen
          showIconInButton={false}
          errorMessage={CALENDAR_STORE.getErrorText}
          fn={() => {
            CALENDAR_STORE.setErrorText("");
            CALENDAR_STORE.setError(false);
            eventList();
          }}
        />
      ) : (
        <View style={styles.calContainer}>
          <FlatList
            renderItem={Item}
            showsVerticalScrollIndicator={false}
            ref={agendaList}
            data={filteredData}
            alwaysBounceVertical={true}
            ListHeaderComponent={
              <>
                <View style={{ height: verticalScale(HeaderHeight) }} />
                <TopLayout />
              </>
            }
            ListEmptyComponent={renderEmptyItem}
            ListFooterComponent={<View style={{ height: verticalScale(15) }} />}
            ItemSeparatorComponent={() => (
              <View style={{ height: verticalScale(1.5) }} />
            )}
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            refreshControl={
              <RefreshControl
                refreshing={CALENDAR_STORE.getRefreshing}
                colors={[colors.Accent]}
                tintColor={colors.Accent}
                onRefresh={onRefresh}
                progressViewOffset={verticalScale(50)}
              />
            }
          />
          {USER_STORE.getUserType === USER_TYPE.CLUB ||
          USER_STORE.getUserType === USER_TYPE.ADMIN ? (
            <FabGroup navigation={navigation} />
          ) : null}
        </View>
      )}
    </View>
  );
});

const styles = ScaledSheet.create({
  calContainer: { flex: 1, backgroundColor: colors.CalBack },
  fab: {
    position: "absolute",
    marginVertical: "16@vs",
    right: "16@s",
    bottom: 0,
  },
});

export default CalendarScreen;
