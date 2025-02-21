// import NetInfo from "@react-native-community/netinfo";
import { API_STORE } from "../../mobx/API_STORE";
import { CALENDAR_STORE } from "../../mobx/CALENDAR_STORE";
import {
  API_ADMIN_EVENT_LIST,
  API_EVENT_LIST,
} from "../../utils/API_CONSTANTS";
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from "../../utils/ERROR_MESSAGES";
import axios from "axios";

//API Call for both event list and admin event list

export const eventList = (refreshing = false) => {
  //const axios = require('axios');
  //using netinfo to check if online
  // NetInfo.fetch().then((state) => {
  //   if (state.isConnected == true) {
  //     if (!refreshing) CALENDAR_STORE.setLoading(true);
  //     axios
  //       .all([
  //         axios.get(API_STORE.getBaseUrl + API_EVENT_LIST),
  //         //console.log('getbaseurl is ',API_STORE.getBaseUrl + API_EVENT_LIST),
  //         axios.get(API_STORE.getBaseUrl + API_ADMIN_EVENT_LIST),
  //         // axios.get(`${API_STORE.getBaseUrl}${API_EVENT_LIST}`),
  //         // axios.get(`${API_STORE.getBaseUrl}${API_ADMIN_EVENT_LIST}`),
  //         //console.log('getbaseurl is 2 ',API_STORE.getBaseUrl + API_ADMIN_EVENT_LIST),
  //       ])
  //       .then(
  //         axios.spread((firstResponse, secondResponse) => {
  //           if (firstResponse.status == 200 && secondResponse.status == 200) {
  //             console.log("firstresponse", firstResponse.data);
  //             console.log("secondresponse", secondResponse.data);
  //             CALENDAR_STORE.setEventData(firstResponse.data);
  //             CALENDAR_STORE.setAdminEventData(secondResponse.data);
  //             CALENDAR_STORE.setSuccess(true);
  //           }
  //           if (refreshing) CALENDAR_STORE.setRefreshing(false);
  //           CALENDAR_STORE.setLoading(false);
  //           console.log("NO error");
  //         })
  //       )
  //       .catch((error) => {
  //         console.log("ERROR OCCURED");
  //         if (error.response) {
  //           console.log(error);
  //           CALENDAR_STORE.setErrorText(error.response.data.message);
  //         } else if (error.request) {
  //           console.log(error.request);
  //           CALENDAR_STORE.setErrorText(SERVER_ERROR);
  //         } else {
  //           CALENDAR_STORE.setErrorText(UNEXPECTED_ERROR);
  //         }
  //         CALENDAR_STORE.setError(true);
  //         if (refreshing) CALENDAR_STORE.setRefreshing(false);

  //         CALENDAR_STORE.setLoading(false);
  //       });
  //   } else {
  //     if (refreshing) CALENDAR_STORE.setRefreshing(false);

  //     CALENDAR_STORE.setErrorText(NO_NETWORK);
  //     CALENDAR_STORE.setError(true);
  //     CALENDAR_STORE.setSuccess(false);
  //     CALENDAR_STORE.setLoading(false);
  //   }
  // });
};
