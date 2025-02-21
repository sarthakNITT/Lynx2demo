import { observer } from "mobx-react";
import moment from "moment";
import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, TextInput } from "react-native-paper";
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import Error from "../../components/Error";
import HelperText from "../../components/HelperText";
import { EVENT_CREATION_STORE } from "../../mobx/EVENT_CREATION_STORE";
import * as colors from "../../utils/colors";
import { getFormattedDate } from "../../utils/helperFunction/getFormattedDate";
import { getFormattedTime } from "../../utils/helperFunction/getFormattedTime";
import {
  eventCreation_DescriptionTitle,
  eventCreation_ImageTitle,
} from "../../utils/stringConstants";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import textInputStyles from "./textInputStyles";
const WIDTH = Dimensions.get("window").width;

const EventCreationTime = observer(({ scrollViewRef, callback }) => {
  const scroll = () => {
    onChangeEndDate(EVENT_CREATION_STORE.getEndEvent);
    onChangeStartDate(EVENT_CREATION_STORE.getStartEvent);
    if (EVENT_CREATION_STORE.getDateError !== 0) return;

    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 3,
        animated: true,
      });
    }
    callback(eventCreation_ImageTitle, 4);
  };

  const back = () => {
    callback(eventCreation_DescriptionTitle, 2);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 1,
        animated: true,
      });
    }
  };

  const onChangeStartDate = (newDate) => {
    console.log("Date: ", newDate);
    EVENT_CREATION_STORE.setStartEvent(newDate);
  };

  const onChangeEndDate = (newDate) => {
    EVENT_CREATION_STORE.setEndEvent(newDate);
  };

  return (
    <>
      {Platform.OS === "ios" ? (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            onScroll={() => {
              Keyboard.dismiss();
            }}
            scrollEventThrottle={10}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={styles.viewScale}
              onPress={() => EVENT_CREATION_STORE.setShowStartPicker(true)}
            >
              <Text
                disabled={true}
                style={{
                  ...textInputStyles.textInputStyle,
                  paddingHorizontal: 15,
                  fontSize: 16,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#bdbdbd",
                  backgroundColor: "#e6e6e6",
                  padding: 20,
                  color: "#6a6a6a",
                }}
                theme={{
                  colors: {
                    primary: colors.BLACK,
                  },
                }}
                selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              >
                Event start:{" "}
                {getFormattedDate(EVENT_CREATION_STORE.getStartEvent)}
                {" | "}
                {getFormattedTime(EVENT_CREATION_STORE.getStartEvent)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewScale}
              onPress={() => EVENT_CREATION_STORE.setShowEndPicker(true)}
            >
              <Text
                disabled={true}
                style={{
                  ...textInputStyles.textInputStyle,
                  paddingHorizontal: 15,
                  fontSize: 16,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#bdbdbd",
                  backgroundColor: "#e6e6e6",
                  padding: 20,
                  color: "#6a6a6a",
                }}
                theme={{
                  colors: {
                    primary: colors.BLACK,
                  },
                }}
              >
                Event end: {getFormattedDate(EVENT_CREATION_STORE.getEndEvent)}
                {" | "}
                {getFormattedTime(EVENT_CREATION_STORE.getEndEvent)}
              </Text>
              {EVENT_CREATION_STORE.getDateError === 1 && (
                <Error text="Start date/time must be before end date/time" />
              )}
              {EVENT_CREATION_STORE.getDateError === 2 && (
                <Error text="Start date/time must be after current date/time" />
              )}
            </TouchableOpacity>
            <HelperText
              text={"Event time should be in Indian Standard Time (IST)"}
            />
            {/* <DateTimePickerModal
              isVisible={EVENT_CREATION_STORE.getShowStartPicker}
              date={EVENT_CREATION_STORE.getStartEvent}
              mode="datetime"
              minimumDate={moment().toDate()}
              onConfirm={onChangeStartDate}
              onCancel={() => EVENT_CREATION_STORE.setShowStartPicker(false)}
            /> */}

            {/* <DateTimePickerModal
              isVisible={EVENT_CREATION_STORE.getShowEndPicker}
              date={EVENT_CREATION_STORE.getEndEvent}
              mode="datetime"
              minimumDate={moment().toDate()}
              onConfirm={onChangeEndDate}
              onCancel={() => EVENT_CREATION_STORE.setShowEndPicker(false)}
            /> */}
          </ScrollView>

          {/* Navigation Buttons */}
          <Button
            style={styles.next}
            mode="contained"
            onPress={scroll}
            labelStyle={{ color: colors.regNext }}
          >
            Next
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
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.viewScale}
            onPress={() => EVENT_CREATION_STORE.setShowStartPicker(true)}
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
              Event start:{" "}
              {getFormattedDate(EVENT_CREATION_STORE.getStartEvent)}
              {" | "}
              {getFormattedTime(EVENT_CREATION_STORE.getStartEvent)}
            </TextInput>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewScale}
            onPress={() => EVENT_CREATION_STORE.setShowEndPicker(true)}
          >
            <TextInput
              disabled={true}
              style={textInputStyles.textInputStyle}
              theme={{
                colors: {
                  primary: colors.BLACK,
                },
              }}
              left={
                <TextInput.Icon
                  name="calendar"
                  size={25}
                  color={colors.BLACK}
                />
              }
            >
              Event end: {getFormattedDate(EVENT_CREATION_STORE.getEndEvent)}
              {" | "}
              {getFormattedTime(EVENT_CREATION_STORE.getEndEvent)}
            </TextInput>
            {EVENT_CREATION_STORE.getDateError === 1 && (
              <Error text="Start date/time must be before end date/time" />
            )}
            {EVENT_CREATION_STORE.getDateError === 2 && (
              <Error text="Start date/time must be after current date/time" />
            )}
          </TouchableOpacity>
          <HelperText
            text={"Event time should be in Indian Standard Time (IST)"}
          />
          {/* <DateTimePickerModal
            isVisible={EVENT_CREATION_STORE.getShowStartPicker}
            date={EVENT_CREATION_STORE.getStartEvent}
            mode="datetime"
            minimumDate={moment().toDate()}
            onConfirm={onChangeStartDate}
            onCancel={() => EVENT_CREATION_STORE.setShowStartPicker(false)}
          /> */}

          {/* <DateTimePickerModal
            isVisible={EVENT_CREATION_STORE.getShowEndPicker}
            date={EVENT_CREATION_STORE.getEndEvent}
            mode="datetime"
            minimumDate={moment().toDate()}
            onConfirm={onChangeEndDate}
            onCancel={() => EVENT_CREATION_STORE.setShowEndPicker(false)}
          /> */}

          {/* Navigation Buttons */}
          <Button
            style={styles.next}
            mode="contained"
            onPress={scroll}
            labelStyle={{ color: colors.regNext }}
          >
            Next
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
        </View>
      )}
    </>
  );
});

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
  scrollView: {
    width: "100%",

    backgroundColor: colors.regBackground,
  },
});

export default EventCreationTime;
