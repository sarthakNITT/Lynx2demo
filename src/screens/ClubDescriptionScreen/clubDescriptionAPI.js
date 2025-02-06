import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { API_STORE } from "../../mobx/API_STORE";
import { CLUB_DESCRIPTION_STORE } from "../../mobx/CLUB_DESCRIPTION_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import {
  API_CLUB_DATA_BY_ID,
  API_CLUB_UPCOMING_EVENTS_BY_ID,
  API_IS_FOLLOWING,
  API_CLUB_CIRCULAR_BY_ID,
} from "../../utils/API_CONSTANTS";
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from "../../utils/ERROR_MESSAGES";
import { RefreshJwtHandler } from "../../utils/helperFunction/refreshJwtHandler";
import { STUDENT } from "../../utils/USER_TYPE";

async function API_CALL(refreshing) {
  try {
    const [responseData, responseUpcomingLive, responseCircular] =
      await axios.all([
        axios.get(
          API_STORE.getBaseUrl +
            API_CLUB_DATA_BY_ID +
            "/" +
            CLUB_DESCRIPTION_STORE.getID
        ),
        axios.get(
          API_STORE.getBaseUrl +
            API_CLUB_UPCOMING_EVENTS_BY_ID +
            "/" +
            CLUB_DESCRIPTION_STORE.getID
        ),
        axios.get(
          API_STORE.getBaseUrl +
            API_CLUB_CIRCULAR_BY_ID +
            CLUB_DESCRIPTION_STORE.getID
        ),
      ]);

    // if the user is a student check if he is following that club
    if (USER_STORE.getUserType === STUDENT) {
      const isFollowing = await axios.get(
        API_STORE.getBaseUrl + API_IS_FOLLOWING + CLUB_DESCRIPTION_STORE.getID,
        { headers: { token: USER_STORE.getUserToken } }
      );
      CLUB_DESCRIPTION_STORE.setIsFollowingClub(isFollowing.data.isFollowing);
    }

    if (
      responseData.status == 200 &&
      responseUpcomingLive.status == 200 &&
      responseCircular.status == 200
    ) {
      CLUB_DESCRIPTION_STORE.setData(responseData.data.details);
      CLUB_DESCRIPTION_STORE.setLiveEvents(
        responseUpcomingLive.data.liveEvents
      );
      CLUB_DESCRIPTION_STORE.setUpcomingEvents(
        responseUpcomingLive.data.upcomingEvents
      );

      CLUB_DESCRIPTION_STORE.setCircular(responseCircular.data.circulars);
      // CLUB_DESCRIPTION_STORE.setPastEvents(responsePast.data.pastEvents);
      CLUB_DESCRIPTION_STORE.setSuccess(true);
    } else {
      CLUB_DESCRIPTION_STORE.setSuccess(false);
      CLUB_DESCRIPTION_STORE.setError(true);
      CLUB_DESCRIPTION_STORE.setErrorText(USER_DETAILS_FETCH);
    }
    CLUB_DESCRIPTION_STORE.setLoading(false);
    if (refreshing) {
      CLUB_DESCRIPTION_STORE.setRefreshing(false);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        RefreshJwtHandler()
          .then(() => {
            clubDescriptionAPI();
          })
          .catch(() => {
            CLUB_DESCRIPTION_STORE.setErrorText(UNEXPECTED_ERROR);
            CLUB_DESCRIPTION_STORE.setError(true);
            CLUB_DESCRIPTION_STORE.setLoading(false);
            if (refreshing) {
              CLUB_DESCRIPTION_STORE.setRefreshing(false);
            }
          });
        return;
      }
      console.log(error);
      CLUB_DESCRIPTION_STORE.setErrorText(error.response.data.message);
    } else if (error.request) {
      console.log(error.request);
      CLUB_DESCRIPTION_STORE.setErrorText(SERVER_ERROR);
    }
    CLUB_DESCRIPTION_STORE.setError(true);
    CLUB_DESCRIPTION_STORE.setLoading(false);
    if (refreshing) {
      CLUB_DESCRIPTION_STORE.setRefreshing(false);
    }
  }
}
export const clubDescriptionAPI = (refreshing) => {
  CLUB_DESCRIPTION_STORE.setError(false);

  //using netinfo to check if online
  NetInfo.fetch().then((state) => {
    if (state.isConnected === true) {
      if (!refreshing) {
        CLUB_DESCRIPTION_STORE.setLoading(true);
      }

      API_CALL(refreshing);
      if (refreshing) {
        CLUB_DESCRIPTION_STORE.setLoading(false);
        CLUB_DESCRIPTION_STORE.setRefreshing(false);
      }
    } else {
      CLUB_DESCRIPTION_STORE.setSuccess(false);
      CLUB_DESCRIPTION_STORE.setLoading(false);
      CLUB_DESCRIPTION_STORE.setErrorText(NO_NETWORK);
      CLUB_DESCRIPTION_STORE.setError(true);
      if (refreshing) {
        CLUB_DESCRIPTION_STORE.setRefreshing(false);
      }
    }
  });
};
