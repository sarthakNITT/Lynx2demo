import { observer } from "mobx-react";
import React from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import Error from "../../components/Error";
import { EVENT_CREATION_STORE } from "../../mobx/EVENT_CREATION_STORE";
import * as colors from "../../utils/colors";
import {
  eventCreation_DateTitle,
  eventCreation_eventTitle,
} from "../../utils/stringConstants";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import textInputStyles from "./textInputStyles";
const WIDTH = Dimensions.get("window").width;

const EventCreationDesc = observer(
  ({ scrollViewRef, descInputRef, callback }) => {
    const toast = useToast();

    //handling scroll
    const scroll = () => {
      Keyboard.dismiss();

      if (EVENT_CREATION_STORE.getDesc.trim() === "") {
        toast.show("Event description can't be empty", { type: "warning" });
        return;
      }
      if (EVENT_CREATION_STORE.getDescError != 0) {
        return;
      }
      Keyboard.dismiss();

      callback(eventCreation_DateTitle, 3);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 2,
          animated: true,
        });
        Keyboard.dismiss();
      }
    };

    const back = () => {
      callback(eventCreation_eventTitle, 1);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 0,
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
                  ref={descInputRef}
                  underlineColor="transparent"
                  style={textInputStyles.textInputStyle}
                  label="Event Description"
                  multiline={true}
                  theme={{
                    colors: {
                      primary: colors.BLACK,
                    },
                  }}
                  selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                  placeholder={"Event Description"}
                  value={EVENT_CREATION_STORE.getDesc}
                  onChangeText={(nDesc) => {
                    EVENT_CREATION_STORE.setDesc(nDesc);
                  }}
                  left={
                    <TextInput.Icon
                      name={"text-subject"}
                      color={colors.BLACK}
                    />
                  }
                  right={
                    <TextInput.Affix
                      text={"/" + EVENT_CREATION_STORE.getCharLeftDesc}
                      textStyle={{
                        color:
                          EVENT_CREATION_STORE.getDesc.length < 0
                            ? colors.Tertiary
                            : colors.GRAY_DARK,
                      }}
                    />
                  }
                />
                {EVENT_CREATION_STORE.getDescError == 1 && (
                  <Error text="Please fill in the Description" />
                )}
                {EVENT_CREATION_STORE.getDescError == 2 && (
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
            <View style={styles.viewScale}>
              <TextInput
                ref={descInputRef}
                underlineColor="transparent"
                style={textInputStyles.textInputStyle}
                label="Event Description"
                multiline={true}
                theme={{
                  colors: {
                    primary: colors.BLACK,
                  },
                }}
                selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                placeholder={"Event Description"}
                value={EVENT_CREATION_STORE.getDesc}
                onChangeText={(nDesc) => {
                  EVENT_CREATION_STORE.setDesc(nDesc);
                }}
                left={
                  <TextInput.Icon name={"text-subject"} color={colors.BLACK} />
                }
                right={
                  <TextInput.Affix
                    text={"/" + EVENT_CREATION_STORE.getCharLeftDesc}
                    textStyle={{
                      color:
                        EVENT_CREATION_STORE.getDesc.length < 0
                          ? colors.Tertiary
                          : colors.GRAY_DARK,
                    }}
                  />
                }
              />
              {EVENT_CREATION_STORE.getDescError == 1 && (
                <Error text="Please fill in the Description" />
              )}
              {EVENT_CREATION_STORE.getDescError == 2 && (
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
          </View>
        )}
      </>
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
  scrollView: {
    width: "100%",
    backgroundColor: colors.regBackground,
  },
});

export default EventCreationDesc;
