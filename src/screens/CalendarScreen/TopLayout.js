import { observer } from "mobx-react";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Animated, Platform, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { IconButton } from "react-native-paper";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { CALENDAR_STORE } from "../../mobx/CALENDAR_STORE";
import * as colors from "../../utils/colors";
import { FONT, FONT_iOS, HorizontalPadding } from "../../utils/UI_CONSTANTS";

const TopLayout = observer(() => {
  const [expanded, setexpanded] = useState(true);
  const maxHeight = verticalScale(400);
  const animation = useRef(new Animated.Value(maxHeight)).current;
  const [icon, setIcon] = useState("arrow-up-drop-circle");
  const [calendarVisibilityText, setCalendarVisibilityText] =
    useState("Close Calendar");
  const [animatedViewBackgroundColor, setAnimatedViewBackgroundColor] =
    useState(colors.CalenderScreen_backgroundColor);
  const [animatedViewMarginTop, setAnimatedViewMarginTop] = useState(
    1.5 * HorizontalPadding
  );
  const [b, setb] = useState(true);
  var height;
  var MarkedDates = {};

  const [selectedDate, setSelectedDate] = useState(
    moment(CALENDAR_STORE.getSelectedDate, "DD-MM-YYYY").format("YYYY-MM-DD")
  );
  const minDate = moment(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  ).format("YYYY-MM-DD");
  const maxDate = moment(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  ).format("YYYY-MM-DD");
  //console.log(maxDate);
  const [dateHeader, setDateHeader] = useState(
    moment(CALENDAR_STORE.getSelectedDate, "DD-MM-YYYY").format("Do MMM YYYY")
    //getFormattedDate(moment(CALENDAR_STORE.getSelectedDate, 'DD-MM-YYYY')),
  );

  const onSelectedChange = (day) => {
    CALENDAR_STORE.setSelectedDate(moment(day.dateString).format("DD-MM-YYYY"));
    setSelectedDate(
      moment(CALENDAR_STORE.getSelectedDate, "DD-MM-YYYY").format("YYYY-MM-DD")
    );
    setDateHeader(
      moment(CALENDAR_STORE.getSelectedDate, "DD-MM-YYYY").format("Do MMM YYYY")
      //getFormattedDate(moment(CALENDAR_STORE.getSelectedDate, 'DD-MM-YYYY')),
    );
  };

  const toggle = () => {
    height = 0;
    setb(false);
    setIcon("arrow-down-drop-circle");
    setCalendarVisibilityText("Open Calendar");
    setAnimatedViewBackgroundColor(colors.WHITE);
    setAnimatedViewMarginTop(0);
    if (!expanded) {
      height = maxHeight;
      setb(true);
      setIcon("arrow-up-drop-circle");
      setCalendarVisibilityText("Close Calendar");
      setAnimatedViewBackgroundColor(colors.CalenderScreen_backgroundColor);
      setAnimatedViewMarginTop(2 * HorizontalPadding);
    }

    Animated.spring(animation, {
      toValue: height,
      useNativeDriver: false,
    }).start();
    setexpanded(!expanded);
  };

  function undefinedCheck(MarkedDates, startDate) {
    try {
      //console.log('TRIED' + temp);
      return MarkedDates[startDate].periods;
    } catch {
      //DONT REMOVE THIS
      //console.log('SUCCESSFULY SKIPPED');
      return [];
    }
  }

  //Marking Events and Notices in Calendar
  var eventDATA = CALENDAR_STORE.getEventData.events;
  var adminEventDATA = CALENDAR_STORE.getAdminEventData.events;

  const markDates = () => {
    if (CALENDAR_STORE.getSuccess) {
      //Marking Notice Lines
      for (var i = 0; i < adminEventDATA.length; i++) {
        var notices = adminEventDATA[i].data;
        for (var j = 0; j < notices.length; j++) {
          var noticeStartDate = moment(new Date(notices[j].startDate)).format(
            "YYYY-MM-DD"
          );
          //Limiting Maximum No.of Lines per day to 2 and if more than 2, adding a different coloured line to indicate more notices.
          if (undefinedCheck(MarkedDates, noticeStartDate).length < 2) {
            MarkedDates[noticeStartDate] = {
              ...MarkedDates[noticeStartDate],
              periods: [
                ...undefinedCheck(MarkedDates, noticeStartDate),
                {
                  startingDay: true,
                  endingDay: true,
                  color: colors.CalendarScreen_CalendarNoticeMarking,
                },
              ],
            };
          } else if (undefinedCheck(MarkedDates, noticeStartDate).length == 2) {
            MarkedDates[noticeStartDate] = {
              ...MarkedDates[noticeStartDate],
              periods: [
                ...undefinedCheck(MarkedDates, noticeStartDate),
                {
                  startingDay: true,
                  endingDay: true,
                  color: colors.CalendarScreen_CalendarExcessMarking,
                },
              ],
            };
          }
        }
      }
      //Marking Event Lines
      for (var i = 0; i < eventDATA.length; i++) {
        var events = eventDATA[i].data;
        for (var j = 0; j < events.length; j++) {
          var eventStartDate = moment(new Date(events[j].startDate)).format(
            "YYYY-MM-DD"
          );
          //Limiting Maximum No.of Lines per day to 2 and if more than 2, adding a different line line to indicate more events.
          if (undefinedCheck(MarkedDates, eventStartDate).length < 2) {
            MarkedDates[eventStartDate] = {
              ...MarkedDates[eventStartDate],
              periods: [
                ...undefinedCheck(MarkedDates, eventStartDate),
                {
                  startingDay: true,
                  endingDay: true,
                  color: colors.CalendarScreen_CalendarEventMarking,
                },
              ],
            };
          } else if (undefinedCheck(MarkedDates, eventStartDate).length == 2) {
            MarkedDates[eventStartDate] = {
              ...MarkedDates[eventStartDate],
              periods: [
                ...undefinedCheck(MarkedDates, eventStartDate),
                {
                  startingDay: true,
                  endingDay: true,
                  color: colors.CalendarScreen_CalendarExcessMarking,
                },
              ],
            };
          }
        }
      }
      return MarkedDates;
    }
  };

  return (
    <View>
      <Animated.View
        style={[
          {
            height: animation,
            backgroundColor: animatedViewBackgroundColor,
            marginHorizontal: scale(2 * HorizontalPadding),
            marginTop: verticalScale(animatedViewMarginTop),
            borderRadius: scale(40),
          },
        ]}
      >
        <View
          onLayout={(event) => {
            //console.log(event.nativeEvent.layout.height);
            height = event.nativeEvent.layout.height;
            Animated.spring(animation, {
              toValue: height,
              useNativeDriver: false,
            }).start();
          }}
        >
          {b && (
            <Calendar
              style={styles.calendar}
              current={selectedDate}
              minDate={minDate}
              maxDate={maxDate}
              onDayPress={(day) => {
                onSelectedChange(day);
              }}
              hideExtraDays={true}
              disableAllTouchEventsForDisabledDays={true}
              firstDay={1}
              showWeekNumbers={false}
              enableSwipeMonths={true}
              markingType="multi-period"
              markedDates={{
                ...markDates(),
                [selectedDate]: {
                  ...MarkedDates[selectedDate],
                  selected: true,
                  selectedColor: colors.CalenderScreen_selectedBackgroundColor,
                },
              }}
              theme={{
                arrowColor: colors.CalenderScreen_arrowColor,
                //The Dates
                textDayFontFamily: FONT,
                textDayFontSize: scale(14),

                dayTextColor: colors.CalenderScreen_dayTextColor,
                //The Day Names (Sunday,Monday...)
                textSectionTitleColor: colors.CalendarScreen_dayHeaderTextColor,
                textDayHeaderFontSize: scale(13),
                textDayHeaderFontWeight: "300",
                //Month on Header
                textDayFontFamily: FONT,
                textMonthFontSize: scale(17),
                textMonthFontWeight: "bold",
                monthTextColor: colors.CalendarScreen_monthColor,

                todayTextColor: colors.CalenderScreen_todayTextColor,
                //Week Number Colour and also Disabled Dates Colour
                textDisabledColor: "#adadad",

                selectedDayBackgroundColor:
                  colors.CalenderScreen_selectedBackgroundColor,
                selectedDayTextColor: colors.CalenderScreen_selectedTextColor,

                calendarBackground: colors.CalenderScreen_backgroundColor,

                "stylesheet.calendar.header": {
                  dayTextAtIndex5: {
                    color: colors.CalendarScreen_satSunHeaderTextColor,
                  },
                  dayTextAtIndex6: {
                    color: colors.CalendarScreen_satSunHeaderTextColor,
                  },
                },
                "stylesheet.calendar.main": {
                  week: {
                    marginVertical: verticalScale(2),
                    flexDirection: "row",
                    justifyContent: "center",
                  },
                },
              }}
            />
          )}
        </View>
      </Animated.View>
      <View style={styles.currentDayAndToggleContainer}>
        <View style={styles.currentDayContainer}>
          <IconButton
            icon="calendar"
            size={scale(16)}
            color={colors.CalendarScreen_CalendarIcon}
          />
          <Text style={styles.currentDayText}>{dateHeader}</Text>
        </View>
      </View>
    </View>
  );
});

const styles = ScaledSheet.create({
  calendar: {
    backgroundColor: colors.CalenderScreen_backgroundColor,
    borderRadius: scale(20),
    borderTopWidth: verticalScale(5),
    borderBottomWidth: verticalScale(10),
    borderLeftWidth: scale(10),
    borderRightWidth: scale(10),
    borderColor: colors.CalenderScreen_borderColor,
  },
  currentDayAndToggleContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(HorizontalPadding),
    marginBottom: verticalScale(-4),
  },
  currentDayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  currentDayText: {
    fontWeight: "bold",
    fontSize: scale(14),
    alignItems: "center",
    fontFamily: FONT,
    color: "black",
  },
  calendarVisibilityText: {
    fontSize: scale(14),
    marginLeft: scale(HorizontalPadding),
    fontFamily: FONT,
  },
});

export default TopLayout;
