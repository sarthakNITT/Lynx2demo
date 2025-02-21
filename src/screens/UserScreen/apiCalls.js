// import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { API_STORE } from "../../mobx/API_STORE";
import { CLUB_USER_STORE } from "../../mobx/CLUB_USER_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import {
  API_GET_CLUB_DETAILS,
  API_GET_CLUB_PAST_EVENTS,
  API_GET_CLUB_UPCOMING_EVENTS,
} from "../../utils/API_CONSTANTS";
import { NO_NETWORK, UNEXPECTED_ERROR } from "../../utils/ERROR_MESSAGES";
import { RefreshJwtHandler } from "../../utils/helperFunction/refreshJwtHandler";

export const getClubDetails = async (refreshing = false) => {
  reset();
  const BASE_URL = API_STORE.getBaseUrl;
  const clubId = USER_STORE.getClubId;
  const headerInfo = {
    headers: {
      "Content-Type": "application/json",
      token: USER_STORE.getUserToken,
    },
  };
  try {
    // const netInfo = await NetInfo.fetch();

    // if (!netInfo.isConnected) {
    //   CLUB_USER_STORE.setIsError(true);
    //   CLUB_USER_STORE.setErrorText(NO_NETWORK);
    //   CLUB_USER_STORE.setIsLoading(false);
    //   return;
    // }

    if (!refreshing) CLUB_USER_STORE.setIsLoading(true);

    const [clubDetailsResponse, eventsResponse, pastEventsResponse] =
      await axios.all([
        axios.get(BASE_URL + API_GET_CLUB_DETAILS + `/${clubId}`, headerInfo),
        axios.get(
          BASE_URL + API_GET_CLUB_UPCOMING_EVENTS + `/${clubId}`,
          headerInfo
        ),
        axios.get(
          BASE_URL + API_GET_CLUB_PAST_EVENTS + `/${clubId}`,
          headerInfo
        ),
      ]);

    if (
      clubDetailsResponse.status === 200 &&
      eventsResponse.status === 200 &&
      pastEventsResponse.status === 200
    ) {
      CLUB_USER_STORE.setIsLoading(false);
      if (refreshing) CLUB_USER_STORE.setRefresh(false);
      CLUB_USER_STORE.setIsError(false);
      CLUB_USER_STORE.setErrorText(false);

      CLUB_USER_STORE.setClubDetails(clubDetailsResponse.data.details);
      CLUB_USER_STORE.setClubInfo(clubDetailsResponse.data.details);
      CLUB_USER_STORE.setUpcomingEvents(eventsResponse.data.upcomingEvents);
      CLUB_USER_STORE.setLiveEvents(eventsResponse.data.liveEvents);
      CLUB_USER_STORE.setPastEvents(pastEventsResponse.data.pastEvents);
    }
  } catch (e) {
    if (e.response) {
      if (e.response.status === 403) {
        RefreshJwtHandler()
          .then(() => {
            getClubDetails(refreshing);
          })
          .catch(() => {
            CLUB_USER_STORE.setIsError(true);
            CLUB_USER_STORE.setErrorText(UNEXPECTED_ERROR);
            CLUB_USER_STORE.setIsLoading(false);
          });
        return;
      }
    }
    CLUB_USER_STORE.setIsError(true);
    CLUB_USER_STORE.setErrorText(e.message);
    CLUB_USER_STORE.setIsLoading(false);
    if (refreshing) CLUB_USER_STORE.setRefresh(false);
  }
};

const reset = () => {
  CLUB_USER_STORE.setIsError(false);
  CLUB_USER_STORE.setErrorText("");
  CLUB_USER_STORE.setIsLoading(false);
};
