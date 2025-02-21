import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import ErrorScreen from "../../components/ErrorScreen";
import Header from "./Header";
import LoaderPage from "../../components/LoadingScreen";
import { ANNOUNCEMENT_DETAILS_STORE } from "../../mobx/ANNOUNCEMENT_DETAILS_STORE";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import * as colors from "../../utils/colors";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import { circularDescriptionApi } from "./AnnouncementApi";
import AnnouncementDetail from "./AnnouncementDetail";
import CreatorDetails from "./CreatorDetails";
import { USER_STORE } from "../../mobx/USER_STORE";
import CustomAlert from "../../components/customAlert";
// import NetInfo from "@react-native-community/netinfo";
import { useToast } from "react-native-toast-notifications";
import { NO_NETWORK } from "../../utils/ERROR_MESSAGES";
import axios from "axios";
import { API_STORE } from "../../mobx/API_STORE";
import { DELETE_CIRCULARS } from "../../utils/API_CONSTANTS";

const AnnouncementDetailScreen = observer(({ route, navigation }) => {
  route.params = route.params || {};
  // route.params.circularId ="62359549ec458ddae47dd6f5"; sample circularID for checking
  const toast = useToast();
  const [modalTitle, setModalTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState({});

  const onDeleteClick = (
    circularId = ANNOUNCEMENT_DETAILS_STORE.getData._id,
    circularName = ANNOUNCEMENT_DETAILS_STORE.getData.title
  ) => {
    setModalTitle("Confirmation");
    setModalMessage(`${circularName} will be deleted permanently!`);
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
        func: async () => {
          // const netInfo = await NetInfo.fetch();
          // if (!netInfo.isConnected) {
          //   toast.show(NO_NETWORK, { type: "danger" });
          //   return;
          // }
          ANNOUNCEMENT_DETAILS_STORE.setLoading(true);
          try {
            const resp = await axios.get(
              API_STORE.getBaseUrl + DELETE_CIRCULARS + circularId,
              { headers: { token: USER_STORE.getUserToken } }
            );
            if (resp.status == 200) {
              navigation.goBack();
              ANNOUNCEMENT_DETAILS_STORE.reset();
            }
          } catch (error) {
            if (error.response) {
              console.log(error.response);
              ANNOUNCEMENT_DETAILS_STORE.setErrorText(
                error.response.data.message
              );
            } else if (error.request) {
              console.log(error.request);
              ANNOUNCEMENT_DETAILS_STORE.setErrorText(SERVER_ERROR);
            }
            ANNOUNCEMENT_DETAILS_STORE.setError(true);
            ANNOUNCEMENT_DETAILS_STORE.setLoading(false);
          }
        },
      },
      <AnnouncementDetail navigation={navigation} />

    ]);
    setModalVisible(true);
  };

  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }

  useEffect(() => {
    ANNOUNCEMENT_DETAILS_STORE.setId(route.params.circularId);
    circularDescriptionApi();
  }, []);
  return (
    <>
      {ANNOUNCEMENT_DETAILS_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : (
        <>
          <CustomAlert
            title={modalTitle}
            message={modalMessage}
            startDate={""}
            endDate={""}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            buttons={modalButtons}
          />
          {ANNOUNCEMENT_DETAILS_STORE.getError ? (
            <ErrorScreen
              showIconInButton={true}
              buttonText={"GO BACK"}
              errorMessage={ANNOUNCEMENT_DETAILS_STORE.getErrorText}
              fn={() => {
                ANNOUNCEMENT_DETAILS_STORE.reset();
                navigation.goBack();
              }}
            />
          ) : (
            <>
              <Header
                props={{ navigation: navigation }}
                onDeletePress={onDeleteClick}
                title={
                  ANNOUNCEMENT_DETAILS_STORE.getLoading
                    ? ""
                    : ANNOUNCEMENT_DETAILS_STORE.getData.title
                }
              />
              <ScrollView
                style={{ marginHorizontal: scale(HorizontalPadding) }}
                showsVerticalScrollIndicator={false}
              >
                <CreatorDetails navigation={navigation} />
                <AnnouncementDetail navigation={navigation} />
              </ScrollView>
            </>
          )}
        </>
      )}
    </>
  );
});

const styles = ScaledSheet.create({
  divider: {
    height: "2@vs",
    backgroundColor: colors.GRAY_MEDIUM,
  },
});
export default AnnouncementDetailScreen;
