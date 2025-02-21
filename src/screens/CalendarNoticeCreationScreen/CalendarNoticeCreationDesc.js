import { observer } from "mobx-react";
import React from "react";
import { Dimensions, Keyboard, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import Error from "../../components/Error";
import { CALENDAR_NOTICE_STORE } from "../../mobx/CALENDAR_NOTICE_STORE";
import * as colors from "../../utils/colors";
import {
  calendarNoticeCreation_DateTitle,
  calendarNoticeCreation_NoticeTitle,
} from "../../utils/stringConstants";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import textInputStyles from "./textInputStyles";

const WIDTH = Dimensions.get("window").width;

const CalendarNoticeCreationDesc = observer(
  ({ scrollViewRef, descInputRef, callback }) => {
    const toast = useToast();

    //handling scroll
    const scroll = () => {
      if (CALENDAR_NOTICE_STORE.getDescription.trim() === "") {
        toast.show("Notice description can't be empty", { type: "warning" });
        return;
      }
      if (CALENDAR_NOTICE_STORE.getDescError != 0) {
        return;
      }

      callback(calendarNoticeCreation_DateTitle, 3);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 2,
          animated: true,
        });
        Keyboard.dismiss();
      }
    };
    const back = () => {
      callback(calendarNoticeCreation_NoticeTitle, 1);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 0,
          animated: true,
        });
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewScale}>
          <TextInput
            ref={descInputRef}
            underlineColor="transparent"
            style={textInputStyles.textInputStyle}
            label="Notice Description"
            multiline={false}
            theme={{
              colors: {
                primary: colors.BLACK,
              },
            }}
            selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
            placeholder="Notice Description"
            value={CALENDAR_NOTICE_STORE.getDescription}
            onChangeText={(nDesc) => {
              CALENDAR_NOTICE_STORE.setDescription(nDesc);
            }}
            left={<TextInput.Icon name={"text-subject"} color={colors.BLACK} />}
            right={
              <TextInput.Affix
                text={"/" + CALENDAR_NOTICE_STORE.getCharLeftDesc}
                textStyle={{
                  color:
                    CALENDAR_NOTICE_STORE.getDescription.length < 0
                      ? colors.Tertiary
                      : colors.GRAY_DARK,
                }}
              />
            }
          />
          {CALENDAR_NOTICE_STORE.getDescError == 1 && (
            <Error text="Please fill in the Description" />
          )}
          {CALENDAR_NOTICE_STORE.getDescError == 2 && (
            <Error text="Exceeds Word Limit" />
          )}
        </View>

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
      </SafeAreaView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(4),
    width: WIDTH,
  },
  viewScale: {
    paddingHorizontal: scale(HorizontalPadding),
    paddingVertical: verticalScale(4),
  },
  wordCount: {
    fontSize: scale(10),
    textAlign: "right",
    paddingHorizontal: scale(HorizontalPadding),
  },
  next: {
    position: "absolute",
    bottom: verticalScale(20),
    right: verticalScale(20),
    backgroundColor: colors.regAttach,
  },
  back: {
    position: "absolute",
    bottom: verticalScale(20),
    left: verticalScale(10),
  },
});

export default CalendarNoticeCreationDesc;
