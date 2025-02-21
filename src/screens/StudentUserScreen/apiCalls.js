// import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { API_STORE } from "../../mobx/API_STORE";
import { STUDENT_DETAILS_STORE } from "../../mobx/STUDENT_DETAILS_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import {
  API_GET_STUDENT_CLUBS,
  API_GET_STUDENT_DETAILS,
  API_GET_STUDENT_INTERESTS,
} from "../../utils/API_CONSTANTS";
import { NO_NETWORK, UNEXPECTED_ERROR } from "../../utils/ERROR_MESSAGES";
import { RefreshJwtHandler } from "../../utils/helperFunction/refreshJwtHandler";

export const getAllStudentDetails = async (refreshing = false) => {
  reset();

  try {
    // const netInfo = await NetInfo.fetch();
    // if (!netInfo.isConnected) {
    //   STUDENT_DETAILS_STORE.setIsError(true);
    //   STUDENT_DETAILS_STORE.setIsLoading(false);
    //   STUDENT_DETAILS_STORE.setErrorText(NO_NETWORK);
    //   return;
    // }

    const headerInfo = {
      headers: {
        "Content-Type": "application/json",
        token: USER_STORE.getUserToken,
      },
    };
    const [detailsResponse, clubFollowResponse, interestedEventsResponse] =
      await axios.all([
        axios.get(API_STORE.getBaseUrl + API_GET_STUDENT_DETAILS, headerInfo),
        axios.get(API_STORE.getBaseUrl + API_GET_STUDENT_CLUBS, headerInfo),
        axios.get(API_STORE.getBaseUrl + API_GET_STUDENT_INTERESTS, headerInfo),
      ]);
    if (
      detailsResponse.status === 200 &&
      clubFollowResponse.status === 200 &&
      interestedEventsResponse.status === 200
    ) {
      STUDENT_DETAILS_STORE.setIsLoading(false);
      if (refreshing) STUDENT_DETAILS_STORE.setRefresh(false);

      STUDENT_DETAILS_STORE.setIsError(false);
      STUDENT_DETAILS_STORE.setErrorText("");

      STUDENT_DETAILS_STORE.setDetails(detailsResponse.data.details);
      STUDENT_DETAILS_STORE.setClubs(clubFollowResponse.data.clubs);
      STUDENT_DETAILS_STORE.setInterests(
        interestedEventsResponse.data.interestedEvents
      );
    }
  } catch (e) {
    console.log("ers", e.response.status);

    if (e.response) {
      if (e.response.status === 403) {
        RefreshJwtHandler()
          .then(() => {
            getAllStudentDetails(refreshing);
          })
          .catch(() => {
            STUDENT_DETAILS_STORE.setErrorText(UNEXPECTED_ERROR);
            STUDENT_DETAILS_STORE.setIsError(true);
            STUDENT_DETAILS_STORE.setIsLoading(false);
          });
        return;
      }
    }
    STUDENT_DETAILS_STORE.setIsLoading(false);
    if (refreshing) STUDENT_DETAILS_STORE.setRefresh(false);

    STUDENT_DETAILS_STORE.setIsError(true);
    STUDENT_DETAILS_STORE.setErrorText(e.message);
  }
};

const reset = () => {
  STUDENT_DETAILS_STORE.setIsError(false);
  STUDENT_DETAILS_STORE.setErrorText("");
};
