import { observer } from "mobx-react";
import moment from "moment";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import HelperText from "../../components/HelperText";
import Text from "../../components/TextComponent";
import { EVENT_EDIT_STORE } from "../../mobx/EVENT_EDIT_STORE";
import * as color from "../../utils/colors";
import { formatToIndiaTime } from "../../utils/helperFunction/getFormattedTime";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import styles from "./styles";

const TIME_FORMAT = "h:mm A";
const DATE_FORMAT = "MMMM DD, YYYY";

const EventEditDateTime = observer(() => {
  const toast = useToast();

  const onChangeEndEvent = (newEnd) => {
    if (EVENT_EDIT_STORE.getEditStartEvent.getTime() >= newEnd.getTime()) {
      toast.show(`Start Date/Time must be before end Date/Time`, {
        type: "warning",
      });
      EVENT_EDIT_STORE.setShowEndPicker(false);
      return;
    } else {
      EVENT_EDIT_STORE.setEditEndEvent(newEnd);
    }
  };

  const onChangeStartEvent = (newStart) => {
    let now = new Date();
    var newStartIST = formatToIndiaTime(newStart);

    if (newStartIST.getTime() < now.getTime()) {
      console.log("PAST");
      toast.show(`Start Date/Time cannot be in the past`, {
        type: "warning",
      });
      EVENT_EDIT_STORE.setShowStartPicker(false);
      return;
    } else {
      EVENT_EDIT_STORE.setEditStartEvent(newStart);
    }
  };

  return (
    <>
      {Platform.OS === "ios" ? (
        <View>
          <View style={s.startEndDisplayBg}>
            <View style={s.startEndDisplay}>
              <Text style={s.startEndDisplayText}>EVENT START</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.viewScale}
              onPress={() => EVENT_EDIT_STORE.setShowStartPicker(true)}
            >
              <Text
                disabled={true}
                style={{
                  paddingHorizontal: 15,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "#bdbdbd",
                  padding: 20,
                  color: "#696969",
                  backgroundColor: color.GRAY_LIGHT,
                }}
              >
                On{" "}
                {moment(EVENT_EDIT_STORE.getEditStartEvent).format(DATE_FORMAT)}
                , At{" "}
                {moment(EVENT_EDIT_STORE.getEditStartEvent).format(TIME_FORMAT)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={s.startEndDisplayBg}>
            <View style={s.startEndDisplay}>
              <Text style={s.startEndDisplayText}>EVENT END</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.viewScale}
              onPress={() => EVENT_EDIT_STORE.setShowEndPicker(true)}
            >
              <Text
                disabled={true}
                style={{
                  ...styles.textInputStyles,
                  paddingHorizontal: 15,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "#bdbdbd",
                  padding: 20,
                  color: "#696969",
                  backgroundColor: color.GRAY_LIGHT,
                }}
              >
                On{" "}
                {moment(EVENT_EDIT_STORE.getEditEndEvent).format(DATE_FORMAT)},
                At{" "}
                {moment(EVENT_EDIT_STORE.getEditEndEvent).format(TIME_FORMAT)}
              </Text>
            </TouchableOpacity>
          </View>
          <HelperText
            style={{ marginBottom: verticalScale(3) }}
            text={"Event time should be in Indian Standard Time (IST)"}
          />
          {/* <DateTimePickerModal
            isVisible={EVENT_EDIT_STORE.getShowStartPicker}
            date={EVENT_EDIT_STORE.getEditStartEvent}
            mode="datetime"
            minimumDate={moment().toDate()}
            onConfirm={onChangeStartEvent}
            onCancel={() => EVENT_EDIT_STORE.setShowStartPicker(false)}
          /> */}

          {/* <DateTimePickerModal
            isVisible={EVENT_EDIT_STORE.getShowEndPicker}
            date={EVENT_EDIT_STORE.getEditEndEvent}
            mode="datetime"
            minimumDate={moment().toDate()}
            onConfirm={onChangeEndEvent}
            onCancel={() => EVENT_EDIT_STORE.setShowEndPicker(false)}
          /> */}
        </View>
      ) : (
        <View>
          <View style={s.startEndDisplayBg}>
            <View style={s.startEndDisplay}>
              <Text style={s.startEndDisplayText}>EVENT START</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.viewScale}
              onPress={() => EVENT_EDIT_STORE.setShowStartPicker(true)}
            >
              <TextInput
                style={styles.textInputStyles}
                disabled={true}
                left={
                  <TextInput.Icon
                    name="calendar"
                    size={25}
                    color={color.BLACK}
                  />
                }
              >
                On{" "}
                {moment(EVENT_EDIT_STORE.getEditStartEvent).format(DATE_FORMAT)}
                , At{" "}
                {moment(EVENT_EDIT_STORE.getEditStartEvent).format(TIME_FORMAT)}
              </TextInput>
            </TouchableOpacity>
          </View>

          <View style={s.startEndDisplayBg}>
            <View style={s.startEndDisplay}>
              <Text style={s.startEndDisplayText}>EVENT END</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.viewScale}
              onPress={() => EVENT_EDIT_STORE.setShowEndPicker(true)}
            >
              <TextInput
                style={styles.textInputStyles}
                disabled={true}
                left={
                  <TextInput.Icon
                    name="calendar"
                    size={25}
                    color={color.BLACK}
                  />
                }
              >
                On{" "}
                {moment(EVENT_EDIT_STORE.getEditEndEvent).format(DATE_FORMAT)},
                At{" "}
                {moment(EVENT_EDIT_STORE.getEditEndEvent).format(TIME_FORMAT)}
              </TextInput>
            </TouchableOpacity>
          </View>
          <HelperText
            style={{ marginBottom: verticalScale(3) }}
            text={"Event time should be in Indian Standard Time (IST)"}
          />
          {/* <DateTimePickerModal
            isVisible={EVENT_EDIT_STORE.getShowStartPicker}
            date={EVENT_EDIT_STORE.getEditStartEvent}
            mode="datetime"
            minimumDate={moment().toDate()}
            onConfirm={onChangeStartEvent}
            onCancel={() => EVENT_EDIT_STORE.setShowStartPicker(false)}
          /> */}

          {/* <DateTimePickerModal
            isVisible={EVENT_EDIT_STORE.getShowEndPicker}
            date={EVENT_EDIT_STORE.getEditEndEvent}
            mode="datetime"
            minimumDate={moment().toDate()}
            onConfirm={onChangeEndEvent}
            onCancel={() => EVENT_EDIT_STORE.setShowEndPicker(false)}
          /> */}
        </View>
      )}
    </>
  );
});

const s = StyleSheet.create({
  startEndDisplay: {
    height: verticalScale(25),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.Tertiary,
    borderRadius: moderateScale(9),
    marginHorizontal: scale(HorizontalPadding),
  },
  startEndDisplayText: {
    fontSize: 16,
    color: "white",
  },
  startEndDisplayBg: {
    borderRadius: moderateScale(9),
    backgroundColor: color.Tertiary,
    marginHorizontal: scale(9),
    paddingVertical: verticalScale(3),
    marginVertical: verticalScale(4),
  },
});

export default EventEditDateTime;
