import { observer } from "mobx-react";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import Error from "../../components/Error";
import { CALENDAR_NOTICE_STORE } from "../../mobx/CALENDAR_NOTICE_STORE";
import * as colors from "../../utils/colors";
import { calendarNoticeCreation_DescriptionTitle } from "../../utils/stringConstants";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import textInputStyles from "./textInputStyles";

const WIDTH = Dimensions.get("window").width;

const CalendarNoticeCreationTitle = observer(({ scrollViewRef, callback }) => {
  const toast = useToast();

  //Handling scroll
  const scroll = () => {
    if (CALENDAR_NOTICE_STORE.getTitle.trim() === "") {
      toast.show("Notice Title can't be empty", { type: "warning" });
      return;
    }
    if (CALENDAR_NOTICE_STORE.getTitleError) {
      return;
    }

    callback(calendarNoticeCreation_DescriptionTitle, 2);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Notice Title"
          style={textInputStyles.textInputStyle}
          placeholder="Notice Title"
          multiline={false}
          value={CALENDAR_NOTICE_STORE.getTitle}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={(nTitle) => {
            CALENDAR_NOTICE_STORE.setTitle(nTitle);
          }}
          left={<TextInput.Icon name={"lead-pencil"} color={colors.Accent} />}
          right={
            <TextInput.Affix
              text={"/" + CALENDAR_NOTICE_STORE.getCharLeftTitle}
              textStyle={{
                color:
                  CALENDAR_NOTICE_STORE.getTitle.length < 0
                    ? colors.Tertiary
                    : colors.GRAY_DARK,
              }}
            />
          }
        />
        {CALENDAR_NOTICE_STORE.getTitleError == 1 && (
          <Error text="Please fill in the Title" />
        )}
        {CALENDAR_NOTICE_STORE.getTitleError == 2 && (
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
    </SafeAreaView>
  );
});

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
});

export default CalendarNoticeCreationTitle;
