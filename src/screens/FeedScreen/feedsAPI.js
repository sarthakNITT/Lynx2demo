// import NetInfo from "@react-native-community/netinfo";
import { API_STORE } from "../../mobx/API_STORE";
import { FEEDS_STORE } from "../../mobx/FEEDS_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import {
  API_GET_CLUB_UPCOMING_EVENTS,
  API_UPCOMING_EVENTS,
} from "../../utils/API_CONSTANTS";
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from "../../utils/ERROR_MESSAGES";
import { RefreshJwtHandler } from "../../utils/helperFunction/refreshJwtHandler";
import { STUDENT } from "../../utils/USER_TYPE";
import axios from 'axios';
export const feedsAPI = (refreshing) => {
  FEEDS_STORE.setError(false);
  //const axios = require("axios");
  //using netinfo to check if online
  // NetInfo.fetch().then((state) => {
  //   if (state.isConnected === true) {
  //     if (USER_STORE.getUserType === STUDENT) {
  //       axios
  //         .get(
  //           API_STORE.getBaseUrl + API_UPCOMING_EVENTS,
  //           // Token from Mobux
  //           { headers: { token: USER_STORE.getUserToken } }
  //         )
  //         .then((response) => {
  //           if (response.status == 200) {
  //             FEEDS_STORE.setData(response.data);
  //             FEEDS_STORE.formatData();

  //             FEEDS_STORE.setSuccess(true);
  //           }
  //           FEEDS_STORE.setLoading(false);

  //           FEEDS_STORE.setRefreshing(false);
  //         })
  //         .catch((error) => {
  //           if (error.response) {
  //             console.log(error.response.data);
  //             if (error.response.status === 403) {
  //               RefreshJwtHandler()
  //                 .then(() => {
  //                   feedsAPI(refreshing);
  //                 })
  //                 .catch(() => {
  //                   FEEDS_STORE.setErrorText(UNEXPECTED_ERROR);
  //                   FEEDS_STORE.setError(true);
  //                   FEEDS_STORE.setLoading(false);
  //                 });
  //               return;
  //             }
  //             FEEDS_STORE.setErrorText(error.response.data.message);
  //           } else if (error.request) {
  //             console.log(error.request);
  //             FEEDS_STORE.setErrorText(SERVER_ERROR);
  //           }
  //           FEEDS_STORE.setError(true);
  //           FEEDS_STORE.setLoading(false);

  //           FEEDS_STORE.setRefreshing(false);
  //         });
  //     } else {
  //       axios
  //         .get(
  //           API_STORE.getBaseUrl +
  //             API_GET_CLUB_UPCOMING_EVENTS +
  //             USER_STORE.getClubId
  //         )
  //         .then((response) => {
  //           if (response.status == 200) {
  //             FEEDS_STORE.setData(response.data);
  //             FEEDS_STORE.formatData();

  //             FEEDS_STORE.setSuccess(true);
  //           }
  //           FEEDS_STORE.setLoading(false);
  //           if (refreshing) {
  //             FEEDS_STORE.setRefreshing(false);
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(100000);
  //           console.log(JSON.stringify(error));
  //           if (error.response) {
  //             console.log(error);
  //             FEEDS_STORE.setErrorText(error.response.data.message);
  //           } else if (error.request) {
  //             console.log(error.request);
  //             FEEDS_STORE.setErrorText(SERVER_ERROR);
  //           }
  //           FEEDS_STORE.setError(true);
  //           FEEDS_STORE.setLoading(false);
  //           if (refreshing) {
  //             FEEDS_STORE.setRefreshing(false);
  //           }
  //         });
  //     }
  //   } else {
  //     FEEDS_STORE.setSuccess(false);
  //     FEEDS_STORE.setLoading(false);
  //     FEEDS_STORE.setErrorText(NO_NETWORK);
  //     FEEDS_STORE.setError(true);
  //     if (refreshing) {
  //       FEEDS_STORE.setRefreshing(false);
  //     }
  //   }
  // });
};
