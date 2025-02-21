import { useFocusEffect } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, Dimensions, View, ScrollView } from "react-native";
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
import { EVENT_CREATION_STORE } from "../../mobx/EVENT_CREATION_STORE";
import * as color from "../../utils/colors";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import { eventCreation_eventTitle } from "../../utils/stringConstants";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import EventCreationDesc from "./EventCreationDesc";
import EventCreationImages from "./EventCreationImages";
import EventCreationScreenHeader from "./EventCreationScreenHeader";
import EventCreationTag from "./EventCreationTags";
import EventCreationTime from "./EventCreationTime";
import EventCreationTitle from "./EventCreationTitle";

const WIDTH = Dimensions.get("window").width;

const EventCreationScreen = observer(({ navigation }) => {
  const scrollview = useRef(null);
  const descInputRef = useRef(null);

  const [pageTitle, setPageTitle] = useState(eventCreation_eventTitle);
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
          setModalMessage("Are you sure you want to discard this event?");
          setModalButtons([
            {
              text: "DISCARD",
              func: () => {
                EVENT_CREATION_STORE.clearData();
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
      {EVENT_CREATION_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : EVENT_CREATION_STORE.getError ? (
        <ErrorScreen
          showIconInButton={false}
          errorMessage={EVENT_CREATION_STORE.getErrorText}
          fn={() => {
            EVENT_CREATION_STORE.setErrorText("");
            EVENT_CREATION_STORE.setIsError(false);
            setPage(0);
          }}
        />
      ) : EVENT_CREATION_STORE.getSuccess ? (
        <SuccessScreen
          buttonText={"BACK"}
          showLeftIconInButton={true}
          fn={() => {
            EVENT_CREATION_STORE.clearData();
            navigation.pop();
          }}
        />
      ) : (
        <View style={styles.container}>
          <CustomAlert
            title={modalTitle}
            message={modalMessage}
            startDate={""}
            endDate={""}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            buttons={modalButtons}
          />
          <EventCreationScreenHeader navigation={navigation} />
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
            <EventCreationTitle
              scrollViewRef={scrollview}
              callback={changeText}
            />
            <EventCreationDesc
              scrollViewRef={scrollview}
              descInputRef={descInputRef}
              callback={changeText}
            />
            <EventCreationTime
              scrollViewRef={scrollview}
              callback={changeText}
            />
            <EventCreationImages
              scrollViewRef={scrollview}
              callback={changeText}
            />
            <EventCreationTag
              scrollViewRef={scrollview}
              callback={changeText}
            />
          </ScrollView>
        </View>
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
    color: color.BLACK,
    fontWeight: "500",
    marginTop: "10@vs",
    textAlign: "center",
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

export default EventCreationScreen;
