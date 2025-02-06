import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { View } from "react-native";
import { deleteEvent } from "../../apis/deleteEvent";
import CustomAlert from "../../components/customAlert";
import ErrorScreen from "../../components/ErrorScreen";
import LoaderPage from "../../components/LoadingScreen";
import { API_STORE } from "../../mobx/API_STORE";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { CLUB_USER_STORE } from "../../mobx/CLUB_USER_STORE";
import * as colors from "../../utils/colors";
import { ACCENT_STUDENT_USER_LOADER } from "../../utils/LOADING_TYPES";
import { getClubDetails } from "./apiCalls";
import Body from "./Body";
import Header from "./Header";

const UserScreen = observer(({ navigation }) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
  }

  React.useEffect(() => {
    getClubDetails();
  }, []);

  const onDeleteClick = (eventId, eventName) => {
    setModalTitle("Confirmation");
    setModalMessage(`${eventName} will be deleted permanently!`);
    setModalButtons([
      {
        text: "CANCEL",
        func: () => {},
      },
      {
        text: "DELETE",
        styles: {
          color: "red",
        },
        func: () => {
          console.log(`Deleting event ${eventName}`);

          deleteEvent(eventId, onRefresh, (reason) => {
            console.log(`Error in deletion: ${reason}`);
          });
        },
      },
    ]);
    setModalVisible(true);
  };

  const onEventClick = (eventId) => {
    navigation.navigate("EventDescriptionScreen", {
      eventId: eventId,
      app: true,
    });
  };

  const onRefresh = () => {
    CLUB_USER_STORE.setRefresh(true);
    getClubDetails(true);
  };

  const functions = {
    onDeleteClick: onDeleteClick,
    onEventClick: onEventClick,
    onRefresh: onRefresh,
  };

  const [modalTitle, setModalTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState({});

  return (
    <View style={{ backgroundColor: colors.WHITE, flex: 1 }}>
      <CustomAlert
        title={modalTitle}
        message={modalMessage}
        startDate={""}
        endDate={""}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        buttons={modalButtons}
      />
      {CLUB_USER_STORE.getIsError ? (
        <ErrorScreen
          showIconInButton={false}
          errorMessage={CLUB_USER_STORE.getErrorText}
          fn={() => {
            getClubDetails();
          }}
        />
      ) : CLUB_USER_STORE.getIsLoading ? (
        <LoaderPage LoadingAccent={ACCENT_STUDENT_USER_LOADER} />
      ) : (
        <>
          <Header
            name={CLUB_USER_STORE.getName}
            url={API_STORE.getCDN + CLUB_USER_STORE.getProfilePic}
            followers={CLUB_USER_STORE.getFollowerCount}
            description={CLUB_USER_STORE.getDescription}
            navigation={navigation}
          />
          <Body functions={functions} />
        </>
      )}
    </View>
  );
});

export default UserScreen;
