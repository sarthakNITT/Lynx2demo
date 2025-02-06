import { observer } from "mobx-react";
import React from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  ScrollView,
  View,
  Platform,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import Error from "../../components/Error";
import { EVENT_CREATION_STORE } from "../../mobx/EVENT_CREATION_STORE";
import * as colors from "../../utils/colors";
import { eventCreation_DescriptionTitle } from "../../utils/stringConstants";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import textInputStyles from "./textInputStyles";

const WIDTH = Dimensions.get("window").width;

const EventCreationTitle = observer(({ scrollViewRef, callback }) => {
  const toast = useToast();

  //Handling scroll
  const scroll = () => {
    if (EVENT_CREATION_STORE.getTitle.trim() === "") {
      toast.show("Event Title can't be empty", { type: "warning" });
      return;
    }
    if (EVENT_CREATION_STORE.getTitleError) {
      return;
    }

    callback(eventCreation_DescriptionTitle, 2);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH,
        animated: true,
      });
    }
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
            <View style={styles.viewScale}>
              <TextInput
                underlineColor="transparent"
                label="Event Title"
                style={textInputStyles.textInputStyle}
                placeholder="Event Title"
                multiline={false}
                value={EVENT_CREATION_STORE.getTitle}
                theme={{
                  colors: {
                    primary: colors.BLACK,
                  },
                }}
                selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                onChangeText={(nTitle) => {
                  EVENT_CREATION_STORE.setTitle(nTitle);
                }}
                left={
                  <TextInput.Icon name={"lead-pencil"} color={colors.Accent} />
                }
                right={
                  <TextInput.Affix
                    text={"/" + EVENT_CREATION_STORE.getCharLeftTitle}
                    textStyle={{
                      color:
                        EVENT_CREATION_STORE.getTitle.length < 0
                          ? colors.Tertiary
                          : colors.GRAY_DARK,
                    }}
                  />
                }
              />
              {EVENT_CREATION_STORE.getTitleError == 1 && (
                <Error text="Please fill in the Title" />
              )}
              {EVENT_CREATION_STORE.getTitleError == 2 && (
                <Error text="Exceeds Word Limit" />
              )}
            </View>
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
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.viewScale}>
            <TextInput
              underlineColor="transparent"
              label="Event Title"
              style={textInputStyles.textInputStyle}
              placeholder="Event Title"
              multiline={false}
              value={EVENT_CREATION_STORE.getTitle}
              theme={{
                colors: {
                  primary: colors.BLACK,
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              onChangeText={(nTitle) => {
                EVENT_CREATION_STORE.setTitle(nTitle);
              }}
              left={
                <TextInput.Icon name={"lead-pencil"} color={colors.Accent} />
              }
              right={
                <TextInput.Affix
                  text={"/" + EVENT_CREATION_STORE.getCharLeftTitle}
                  textStyle={{
                    color:
                      EVENT_CREATION_STORE.getTitle.length < 0
                        ? colors.Tertiary
                        : colors.GRAY_DARK,
                  }}
                />
              }
            />
            {EVENT_CREATION_STORE.getTitleError == 1 && (
              <Error text="Please fill in the Title" />
            )}
            {EVENT_CREATION_STORE.getTitleError == 2 && (
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
        </View>
      )}
    </>
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
  scrollView: {
    width: "100%",
    backgroundColor: colors.regBackground,
  },
});

export default EventCreationTitle;
