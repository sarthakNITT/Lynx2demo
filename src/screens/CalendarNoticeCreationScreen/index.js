import { useFocusEffect } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import CustomAlert from "../../components/customAlert";
import ErrorScreen from "../../components/ErrorScreen";
import LoaderPage from "../../components/LoadingScreen";
import SuccessScreen from "../../components/SuccessScreen";
import Text from "../../components/TextComponent";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { CALENDAR_NOTICE_STORE } from "../../mobx/CALENDAR_NOTICE_STORE";
import * as color from "../../utils/colors";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import { calendarNoticeCreation_NoticeTitle } from "../../utils/stringConstants";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import CalendarNoticeCreationDesc from "./CalendarNoticeCreationDesc";
import CalendarNoticeCreationScreenHeader from "./CalendarNoticeCreationScreenHeader";
import CalendarNoticeCreationTime from "./CalendarNoticeCreationTime";
import CalendarNoticeCreationTitle from "./CalendarNoticeCreationTitle";

const WIDTH = Dimensions.get("window").width;

const CalendarNoticeCreationScreen = observer(({ navigation }) => {
  const scrollview = useRef(null);
  const descInputRef = useRef(null);

  const [pageTitle, setPageTitle] = useState(
    calendarNoticeCreation_NoticeTitle
  );
  // const [subtitle, setSubTitle] = useState('');
  const [page, setPage] = useState(0);

  const changeText = (title, page) => {
    setPageTitle(title);
    setPage(page);
  };

  const handleFocus = (x) => {
    if (Math.floor(x) == Math.floor(WIDTH)) descInputRef.current.focus();
  };

  //Handling hardwareBackPress
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (page < 1) {
          setModalTitle("Confirmation");
          setModalMessage("Are you sure you want to discard this notice?");
          setModalButtons([
            {
              text: "DISCARD",
              func: () => {
                CALENDAR_NOTICE_STORE.reset();
                navigation.goBack();
                console.log("CALLED");
                toggleTab(true);
              },
            },
            {
              text: "KEEP EDITING",
              func: () => console.log("OK Pressed"),
            },
          ]);
          setModalVisible(true);
        }

        setPage(page - 1);
        if (scrollview.current !== null) {
          scrollview.current.scrollTo({
            x: WIDTH * (page - 1),
            animated: true,
          });
        }
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    })
  );

  function toggleTab(tabShow) {
    BOTTOM_NAV_STORE.setTabVisibility(tabShow);
  }

  useEffect(() => {
    toggleTab(false);
    return () => {};
  }, []);
  const [modalTitle, setModalTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState({});

  return (
    <>
      {CALENDAR_NOTICE_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : CALENDAR_NOTICE_STORE.getError ? (
        <ErrorScreen
          errorMessage={CALENDAR_NOTICE_STORE.getErrorText}
          fn={() => {
            CALENDAR_NOTICE_STORE.setErrorText("");
            CALENDAR_NOTICE_STORE.setError(false);
            setPage(0);
          }}
        />
      ) : CALENDAR_NOTICE_STORE.getSuccess ? (
        <SuccessScreen
          buttonText={"BACK"}
          showLeftIconInButton={true}
          fn={() => {
            CALENDAR_NOTICE_STORE.reset();
            navigation.pop();
          }}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <CustomAlert
            title={modalTitle}
            message={modalMessage}
            startDate={""}
            endDate={""}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            buttons={modalButtons}
          />
          <CalendarNoticeCreationScreenHeader navigation={navigation} />
          <Text style={styles.title}>{pageTitle}</Text>
          <ScrollView
            keyboardShouldPersistTaps="always"
            ref={scrollview}
            horizontal={true}
            onScroll={({ nativeEvent }) => {
              handleFocus(nativeEvent.contentOffset.x);
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            pagingEnabled={true}
            style={{ width: WIDTH, marginTop: verticalScale(5) }}
            scrollEnabled={false}
          >
            <CalendarNoticeCreationTitle
              scrollViewRef={scrollview}
              callback={changeText}
            />
            <CalendarNoticeCreationDesc
              scrollViewRef={scrollview}
              descInputRef={descInputRef}
              callback={changeText}
            />
            <CalendarNoticeCreationTime
              scrollViewRef={scrollview}
              callback={changeText}
              navigation={navigation}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color.Secondary,
  },
  viewScale: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
  },

  divider: {
    height: verticalScale(2),
    backgroundColor: color.GRAY_MEDIUM,
  },
  dividerEnd: {
    height: verticalScale(2),
    backgroundColor: color.GRAY_MEDIUM,
  },
  uploadButton: {
    backgroundColor: color.Tertiary,
    borderRadius: moderateScale(6),
    marginVertical: verticalScale(9),
    marginHorizontal: scale(HorizontalPadding),
  },
  header: {
    fontSize: "18@s",
    color: color.FontColor,
    fontWeight: "bold",
    marginTop: "40@vs",
  },
  title: {
    fontSize: "16@s",
    //color: color.FontColor,
    color: "black",
    fontWeight: "500",
    marginTop: "10@vs",
  },
  subtitle: {
    fontSize: "12@s",
    color: "#555555",
    marginTop: "5@vs",
    textAlign: "center",
  },
  input: {
    width: "100%",
  },
});

export default CalendarNoticeCreationScreen;
