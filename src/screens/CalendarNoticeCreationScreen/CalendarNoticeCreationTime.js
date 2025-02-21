import { observer } from "mobx-react";
import React from "react";
import { Dimensions, Switch, TouchableOpacity, View } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import Error from "../../components/Error";
import Text from "../../components/TextComponent";
import { CALENDAR_NOTICE_STORE } from "../../mobx/CALENDAR_NOTICE_STORE";
import * as colors from "../../utils/colors";
import { getFormattedDate } from "../../utils/helperFunction/getFormattedDate";
import { calendarNoticeCreation_DescriptionTitle } from "../../utils/stringConstants";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import { CalendarNoticeCreation } from "./CalendarNoticeCreationAPI";
import textInputStyles from "./textInputStyles";

const WIDTH = Dimensions.get("window").width;

const CalendarNoticeCreationTime = observer(
  ({ scrollViewRef, callback, navigation }) => {
    const handleAPICALL = () => {
      CalendarNoticeCreation();
    };

    //Handling Notice Creation
    const createNotice = () => {
      if (CALENDAR_NOTICE_STORE.getDateError !== 0) return;
      handleAPICALL();
    };

    const back = () => {
      callback(calendarNoticeCreation_DescriptionTitle, 2);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 1,
          animated: true,
        });
      }
    };

    const toggleSwitch = () => {
      CALENDAR_NOTICE_STORE.setMultiDay(!CALENDAR_NOTICE_STORE.getMultiDay);
    };

    const onChangeStartDate = (newDate) => {
      CALENDAR_NOTICE_STORE.setStartDate(newDate);
    };

    const onChangeEndDate = (newDate) => {
      CALENDAR_NOTICE_STORE.setEndDate(newDate);
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.switchView}>
          <Text style={styles.buttonTextTheme}>Multi day notice? </Text>
          <Switch
            trackColor={{ false: colors.Primary, true: colors.Accent }}
            thumbColor={
              CALENDAR_NOTICE_STORE.getMultiDay ? colors.WHITE : colors.WHITE
            }
            ios_backgroundColor={colors.iosBackgroundColor}
            onValueChange={toggleSwitch}
            value={CALENDAR_NOTICE_STORE.getMultiDay}
          />
        </View>
        <TouchableOpacity
          style={styles.viewScale}
          onPress={() => CALENDAR_NOTICE_STORE.setShowStartDatePicker(true)}
        >
          <TextInput
            disabled={true}
            style={textInputStyles.textInputStyle}
            theme={{
              colors: {
                primary: colors.BLACK,
              },
            }}
            selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
            left={
              <TextInput.Icon name="calendar" size={25} color={colors.BLACK} />
            }
          >
            {CALENDAR_NOTICE_STORE.getMultiDay
              ? "Notice Start Date : "
              : "Notice Date : "}
            {getFormattedDate(CALENDAR_NOTICE_STORE.getStartDate)}
          </TextInput>
        </TouchableOpacity>
        {CALENDAR_NOTICE_STORE.getMultiDay && (
          <TouchableOpacity
            style={styles.viewScale}
            onPress={() => CALENDAR_NOTICE_STORE.setShowEndDatePicker(true)}
          >
            <TextInput
              disabled={true}
              style={textInputStyles.textInputStyle}
              theme={{
                colors: {
                  primary: colors.BLACK,
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              left={
                <TextInput.Icon
                  name="calendar"
                  size={25}
                  color={colors.BLACK}
                />
              }
            >
              Notice End Date :{" "}
              {getFormattedDate(CALENDAR_NOTICE_STORE.getEndDate)}
            </TextInput>
          </TouchableOpacity>
        )}
        <View style={styles.viewScale}>
          {CALENDAR_NOTICE_STORE.getDateError === 1 && (
            <Error text="Start date must be before end date" />
          )}
          {/* Backend accepts current day as start date as well */}
        </View>

        {/* <DateTimePickerModal
          isVisible={CALENDAR_NOTICE_STORE.getShowStartDatePicker}
          date={CALENDAR_NOTICE_STORE.getStartDate}
          mode="date"
          //Notice can be created for start dates from the current day
          minimumDate={new Date()}
          onConfirm={onChangeStartDate}
          onCancel={() => CALENDAR_NOTICE_STORE.setShowStartDatePicker(false)}
        /> */}

        {/* <DateTimePickerModal
          isVisible={CALENDAR_NOTICE_STORE.getShowEndDatePicker}
          date={CALENDAR_NOTICE_STORE.getEndDate}
          mode="date"
          //Notice can be created only for end dates from 1 day after current date
          minimumDate={new Date(new Date().getTime() + 1 * 86400000)}
          onConfirm={onChangeEndDate}
          onCancel={() => CALENDAR_NOTICE_STORE.setShowEndDatePicker(false)}
        /> */}

        {/* Navigation Buttons */}
        <Button
          style={styles.next}
          mode="contained"
          onPress={createNotice}
          labelStyle={{ color: colors.regNext }}
        >
          Create Notice
        </Button>
        <Button
          style={styles.back}
          mode="outline"
          onPress={back}
          labelStyle={{ color: colors.regAttach }}
          icon="chevron-left"
        >
          Back
        </Button>
      </SafeAreaView>
      //null
    );
  }
);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(4),
    width: WIDTH,
  },
  viewScale: {
    //paddingHorizontal: scale(2),
    paddingVertical: verticalScale(4),
    marginHorizontal: scale(HorizontalPadding),
  },
  buttonTextTheme: {
    fontSize: scale(14),
    marginLeft: scale(10),
    color: colors.WHITE,
  },
  switchView: {
    paddingVertical: verticalScale(8),
    backgroundColor: colors.Tertiary,
    borderRadius: moderateScale(9),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(HorizontalPadding),
    marginVertical: verticalScale(2),
  },
  back: {
    position: "absolute",
    bottom: "20@vs",
    left: "10@vs",
  },
  next: {
    position: "absolute",
    bottom: "20@vs",
    right: "20@vs",
    backgroundColor: colors.regAttach,
  },
});

export default CalendarNoticeCreationTime;
