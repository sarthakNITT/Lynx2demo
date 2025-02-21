// import NetInfo from '@react-native-community/netinfo';
import {ACTIVITY_STORE} from '../../mobx/ACITIVITY_STORE';
import {API_STORE} from '../../mobx/API_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {
  API_CLUB_ACTIVITY,
  API_STUDENT_ACTIVITY,
} from '../../utils/API_CONSTANTS';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import {RefreshJwtHandler} from '../../utils/helperFunction/refreshJwtHandler';
import {ADMIN, CLUB} from '../../utils/USER_TYPE';
import axios from 'axios';
const ActivityAPI = refreshing => {
  ACTIVITY_STORE.setError(false);
  //const axios = require('axios');
  //using netinfo to check if online
  // NetInfo.fetch().then(state => {
  //   if (state.isConnected === true) {
  //     if (!refreshing) {
  //       ACTIVITY_STORE.setLoading(true);
  //     }
  //     let url = API_STUDENT_ACTIVITY;
  //     if (USER_STORE.getUserType === CLUB || USER_STORE.getUserType === ADMIN) {
  //       url = API_CLUB_ACTIVITY;
  //     }
  //     axios
  //       .get(
  //         API_STORE.getBaseUrl + url,
  //         // Token from Mobux
  //         {headers: {token: USER_STORE.getUserToken}},
  //       )
  //       .then(response => {
  //         console.log(response.status);
  //         if (response.status == 200) {
  //           ACTIVITY_STORE.setData(response.data.notifications);
  //           ACTIVITY_STORE.setSuccess(true);
  //         }
  //         ACTIVITY_STORE.setLoading(false);
  //         if (refreshing) {
  //           ACTIVITY_STORE.setRefreshing(false);
  //         }
  //       })
  //       .catch(error => {
  //         if (error.response) {
  //           if (error.response.status === 403) {
  //             RefreshJwtHandler()
  //               .then(() => {
  //                 ActivityAPI(refreshing);
  //               })
  //               .catch(() => {
  //                 ACTIVITY_STORE.setErrorText(UNEXPECTED_ERROR);
  //                 ACTIVITY_STORE.setError(true);
  //                 ACTIVITY_STORE.setLoading(false);
  //               });
  //             return;
  //           }
  //           console.log(error);
  //           ACTIVITY_STORE.setErrorText(error.response.data.message);
  //         } else if (error.request) {
  //           console.log(error.request);
  //           ACTIVITY_STORE.setErrorText(SERVER_ERROR);
  //         }
  //         ACTIVITY_STORE.setError(true);
  //         ACTIVITY_STORE.setLoading(false);
  //         if (refreshing) {
  //           ACTIVITY_STORE.setRefreshing(false);
  //         }
  //       });
  //   } else {
  //     ACTIVITY_STORE.setSuccess(false);
  //     ACTIVITY_STORE.setLoading(false);
  //     ACTIVITY_STORE.setErrorText(NO_NETWORK);
  //     ACTIVITY_STORE.setError(true);
  //     if (refreshing) {
  //       ACTIVITY_STORE.setRefreshing(false);
  //     }
  //   }
  // });
};

export default ActivityAPI;
