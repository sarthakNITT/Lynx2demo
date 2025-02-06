import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { BackHandler, ScrollView, View } from "react-native";
import { Chip, TextInput } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ErrorScreen from "../../components/ErrorScreen";
import LoaderPage from "../../components/LoadingScreen";
import SuccessScreen from "../../components/SuccessScreen";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { FEEDBACK_STORE } from "../../mobx/FEEDBACK_STORE";
import * as colors from "../../utils/colors";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import {
  FEEDBACK_MAX_LENGTH,
  HorizontalPadding,
} from "../../utils/UI_CONSTANTS";
import { feedsAPI } from "./feedbackApi";
import ScreenHeader from "./ScreenHeader";

const FeedBackScreen = observer(({ navigation }) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }

  const onBackPress = () => {
    setModalTitle("Confirmation");
    setModalMessage("Are you sure you want to discard the feedback?");
    setModalButtons([
      {
        text: "DISCARD",
        func: () => {
          FEEDBACK_STORE.reset();
          navigation.pop();
        },
      },
      {
        text: "KEEP EDITING",
        func: () => console.log("OK Pressed"),
      },
    ]);
    setModalVisible(true);
    return true;
  };
  React.useEffect(() => {
    const backPress = BackHandler.addEventListener("backPress", onBackPress);
    // setting default to suggestion
    FEEDBACK_STORE.setType("suggestion");
    return () => {
      backPress.remove();
    };
  }, []);

  const [modalTitle, setModalTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState({});

  return (
    <>
      {FEEDBACK_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : (
        <>
          {FEEDBACK_STORE.getError ? (
            <ErrorScreen
              showIconInButton={false}
              errorMessage={FEEDBACK_STORE.getErrorText}
              fn={() => {
                FEEDBACK_STORE.setErrorText("");
                FEEDBACK_STORE.setError(false);
              }}
            />
          ) : (
            <>
              {FEEDBACK_STORE.getSuccess ? (
                <SuccessScreen
                  buttonText={"BACK"}
                  showLeftIconInButton={true}
                  fn={() => {
                    navigation.goBack();
                    FEEDBACK_STORE.reset();
                  }}
                />
              ) : (
                <>
                  <View>
                    <ScreenHeader
                      navigation={navigation}
                      isValid={
                        FEEDBACK_STORE.getFeedback.length > 0 &&
                        FEEDBACK_STORE.getType != ""
                      }
                      handleApiCall={feedsAPI}
                      onBackPress={onBackPress}
                      modalButtons={modalButtons}
                      modalMessage={modalMessage}
                      modalTitle={modalTitle}
                      modalVisible={modalVisible}
                      setModalButtons={setModalButtons}
                      setModalMessage={setModalMessage}
                      setModalTitle={setModalTitle}
                      setModalVisible={setModalVisible}
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <TextInput
                        underlineColor="transparent"
                        label={"Feedback"}
                        value={FEEDBACK_STORE.getFeedback}
                        style={{
                          backgroundColor: colors.GRAY_LIGHT,
                          borderTopRightRadius: moderateScale(6),
                          borderTopLeftRadius: moderateScale(6),
                          borderBottomLeftRadius: moderateScale(6),
                          borderBottomRightRadius: moderateScale(6),
                          marginHorizontal: scale(HorizontalPadding),
                          marginTop: verticalScale(10),
                        }}
                        placeholder={"Give a brief overview"}
                        multiline={true}
                        keyboardType={"default"}
                        theme={{
                          colors: {
                            primary: colors.BLACK,
                          },
                        }}
                        selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                        onChangeText={(text) => {
                          FEEDBACK_STORE.setFeedback(text);
                        }}
                        left={
                          <TextInput.Icon
                            name={"tooltip-outline"}
                            color={colors.Accent}
                          />
                        }
                        right={
                          <TextInput.Affix
                            text={
                              "/" +
                              (FEEDBACK_MAX_LENGTH -
                                FEEDBACK_STORE.getFeedback.length)
                            }
                            textStyle={{
                              color:
                                FEEDBACK_MAX_LENGTH -
                                  FEEDBACK_STORE.getFeedback.length <
                                0
                                  ? colors.Tertiary
                                  : colors.GRAY_DARK,
                            }}
                          />
                        }
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          marginTop: verticalScale(25),

                          marginHorizontal: scale(HorizontalPadding),
                        }}
                      >
                        <Chip
                          icon={"bug"}
                          style={{
                            backgroundColor:
                              FEEDBACK_STORE.getType === "bug"
                                ? colors.EventDescriptionScreen_TagBackGround
                                : colors.GRAY_LIGHT,
                          }}
                          selectedColor={colors.BLACK}
                          selected={FEEDBACK_STORE.getType === "bug"}
                          onPress={() => {
                            FEEDBACK_STORE.setType("bug");
                          }}
                        >
                          Bug
                        </Chip>
                        <Chip
                          icon={"star"}
                          style={{
                            backgroundColor:
                              FEEDBACK_STORE.getType === "suggestion"
                                ? colors.EventDescriptionScreen_TagBackGround
                                : colors.GRAY_LIGHT,
                          }}
                          selectedColor={colors.BLACK}
                          selected={FEEDBACK_STORE.getType === "suggestion"}
                          onPress={() => {
                            FEEDBACK_STORE.setType("suggestion");
                          }}
                        >
                          Suggestion
                        </Chip>
                      </View>
                      <View style={{ height: verticalScale(150) }} />
                    </ScrollView>
                  </View>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

export default FeedBackScreen;
