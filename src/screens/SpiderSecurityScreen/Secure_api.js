// import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { SECURE_STORE } from "../../mobx/SECURITY_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import { API_GET_SECURITY_KEYS } from "../../utils/API_CONSTANTS";
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from "../../utils/ERROR_MESSAGES";
import { RefreshJwtHandler } from "../../utils/helperFunction/refreshJwtHandler";
import { STUDENT } from "../../utils/USER_TYPE";

export const secureAPI = (refreshing) => {
  SECURE_STORE.setError(false);
  // const axios = require('axios');
  //using netinfo to check if online
  // NetInfo.fetch().then((state) => {
  //   if (state.isConnected === true) {
  //     if (USER_STORE.getUserType === STUDENT) {
  //       axios
  //         .get(
  //           API_GET_SECURITY_KEYS,
  //           // Token from Mob x
  //           { headers: { token: USER_STORE.getUserToken } }
  //         )
  //         .then((response) => {
  //           if (response.status == 200) {
  //             console.log(response.data);
  //             if (response.data == "no OTPs found") {
  //               SECURE_STORE.setData([]);
  //             } else {
  //               console.log("data", response.data);
  //               SECURE_STORE.setData(response.data);
  //             }
  //           }
  //           SECURE_STORE.setLoading(false);
  //           SECURE_STORE.setRefreshing(false);
  //         })
  //         .catch((error) => {
  //           console.log(7);
  //           if (error.response) {
  //             console.log(error.response.data);
  //             if (error.response.status === 403) {
  //               RefreshJwtHandler()
  //                 .then(() => {
  //                   secureAPI(refreshing);
  //                 })
  //                 .catch(() => {
  //                   SECURE_STORE.setErrorText(UNEXPECTED_ERROR);
  //                   SECURE_STORE.setError(true);
  //                   SECURE_STORE.setLoading(false);
  //                 });
  //               return;
  //             }
  //             SECURE_STORE.setErrorText(error.response.data.message);
  //           } else if (error.request) {
  //             console.log(error.request);
  //             SECURE_STORE.setErrorText(SERVER_ERROR);
  //           }
  //           SECURE_STORE.setError(true);
  //           SECURE_STORE.setLoading(false);

  //           SECURE_STORE.setRefreshing(false);
  //         });
  //     }
  //   } else {
  //     SECURE_STORE.setLoading(false);
  //     SECURE_STORE.setErrorText(NO_NETWORK);
  //     SECURE_STORE.setError(true);
  //     if (refreshing) {
  //       SECURE_STORE.setRefreshing(false);
  //     }
  //   }
  // });
};
