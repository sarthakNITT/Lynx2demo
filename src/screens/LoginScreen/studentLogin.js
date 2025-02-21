// import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { API_STORE } from '../../mobx/API_STORE';
import { LOGIN_STORE } from '../../mobx/LOGIN_STORE';
import { USER_STORE } from '../../mobx/USER_STORE';
import { API_STUDENT_LOGIN } from '../../utils/API_CONSTANTS';
import {
  NO_NETWORK,
  SERVER_ERROR,
  USER_DOESNT_EXIST,
} from '../../utils/ERROR_MESSAGES';
import { REFRESH_TOKEN, USER_TOKEN, USER_TYPE } from '../../utils/STORAGE_KEYS';
import { STUDENT } from '../../utils/USER_TYPE';

export const studentLogin = (rollNo, password) => {
  // const axios = require('axios');
  //using netinfo to check if online
  // NetInfo.fetch().then(state => {
  //   if (state.isConnected == true) {
  //     LOGIN_STORE.setLoading(true);
  //     // const reg_token = USER_STORE.getFirebaseToken;
  //     const reg_token=1; // make change here when done
  //     console.log('reg: ', reg_token);
  //     axios
  //       .post("https://api.lynx.spider.nitt.edu/auth/student/login", {
  //         rollNo,
  //         password,
  //         reg_token,
  //       })
  //       .then(response => {
  //         if (response.status == 200) {
  //           if (response.data.userExists) {
  //             console.log("1");
  //             EncryptedStorage.setItem(USER_TOKEN, response.data.token);
  //             EncryptedStorage.setItem(USER_TYPE, STUDENT);
  //             EncryptedStorage.setItem(
  //               REFRESH_TOKEN,
  //               response.data.refreshToken,
  //             );
  //             USER_STORE.setUserRollNumber(rollNo);
  //             USER_STORE.setUserType(STUDENT);
  //             USER_STORE.setUserToken(response.data.token);
  //             USER_STORE.setRefreshToken(response.data.refreshToken);
  //           } else {
  //             console.log("2");
  //             LOGIN_STORE.setError(true);
  //             LOGIN_STORE.setErrorText(USER_DOESNT_EXIST);
  //           }
  //         }
  //         LOGIN_STORE.setLoading(false);
  //       })
  //       .catch(error => {
  //         if (error.response) {

  //           if (error.response.status == 404) {
  //             console.log("3");
  //             LOGIN_STORE.setErrorText(USER_DOESNT_EXIST);
  //           } else {
  //             console.log("4");
  //             LOGIN_STORE.setErrorText(error.response.data.message);
  //           }
  //         } else if (error.request) {
  //           console.log("5");
  //           console.log(error.request);
  //           LOGIN_STORE.setErrorText(SERVER_ERROR);
  //         } else if (
  //           USER_STORE.getFirebaseToken == null ||
  //           USER_STORE.getFirebaseToken.length == 0
  //         ) {
  //           console.log("6");
  //           LOGIN_STORE.setErrorText('Internal Device Error');
  //         }
  //         console.log("7");
  //         LOGIN_STORE.setError(true);
  //         LOGIN_STORE.setLoading(false);
  //       });
  //   } else {
  //     console.log("8");
  //     LOGIN_STORE.setErrorText(NO_NETWORK);
  //     LOGIN_STORE.setError(true);
  //     LOGIN_STORE.setLoading(false);
  //   }
  // });
};