import { observer } from "mobx-react";
import React, { useState } from "react";
import {
  BackHandler,
  Keyboard,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { verticalScale } from "react-native-size-matters";
import CustomAlert from "../../components/customAlert";
import ErrorScreen from "../../components/ErrorScreen";
import LoaderPage from "../../components/LoadingScreen";
import SuccessScreen from "../../components/SuccessScreen";
import { EVENT_DESCRIPTION_STORE } from "../../mobx/EVENT_DESCRIPTION_STORE";
import { EVENT_EDIT_STORE } from "../../mobx/EVENT_EDIT_STORE";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import { eventDescriptionAPI } from "../EventDescriptionScreen/eventDescriptionAPI";
import EventEditDateTime from "./EventEditDateTime";
import EventEditHeader from "./EventEditHeader";
import EventEditImages from "./EventEditImages";
import EventEditInput from "./EventEditInput";
import EventEditLinks from "./EventEditLinks";
import EventEditTags from "./EventEditTags";

const EventEditScreen = observer(({ navigation }) => {
  React.useEffect(() => {
    const backPress = BackHandler.addEventListener("backPress", onBackPress);

    return () => {
      backPress.remove();
    };
  }, []);

  const onBackPress = () => {
    setModalTitle("Confirmation");
    setModalMessage("Are you sure you want to discard this event?");
    setModalButtons([
      {
        text: "DISCARD",
        func: () => {
          EVENT_EDIT_STORE.clearData();
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
    EVENT_EDIT_STORE.setData(EVENT_DESCRIPTION_STORE.getData);
    EVENT_EDIT_STORE.setEventId(EVENT_DESCRIPTION_STORE.getID);
  }, []);

  const [modalTitle, setModalTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState({});

  return (
    <>
      {EVENT_EDIT_STORE.getIsLoading ? (
        <>
          <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
        </>
      ) : (
        <>
          {EVENT_EDIT_STORE.getIsError ? (
            <>
              <ErrorScreen
                showIconInButton={false}
                errorMessage={EVENT_EDIT_STORE.getErrorText}
                showButton={true}
                fn={() => {
                  EVENT_EDIT_STORE.setIsError(false);
                }}
              />
            </>
          ) : (
            <>
              {EVENT_EDIT_STORE.getIsSuccess ? (
                <>
                  <SuccessScreen
                    buttonText={"BACK"}
                    showLeftIconInButton={true}
                    fn={() => {
                      eventDescriptionAPI();
                      EVENT_EDIT_STORE.clearData();
                      navigation.pop();
                    }}
                  />
                </>
              ) : (
                <>
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
                    <EventEditHeader navigation={navigation} />
                    <ScrollView
                      onScroll={() => {
                        Keyboard.dismiss();
                      }}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps={"always"}
                    >
                      <EventEditImages navigation={navigation} />
                      <EventEditInput />
                      <EventEditDateTime />
                      <EventEditLinks />
                      <EventEditTags />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: verticalScale(4),
  },
});

export default EventEditScreen;
