import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {Platform} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ACTIVITY_STORE} from '../../mobx/ACITIVITY_STORE';
import {ANNOUNCEMENT_CREATION_STORE} from '../../mobx/ANNOUNCEMENT_CREATION_STORE';
import {ANNOUNCEMENT_DETAILS_STORE} from '../../mobx/ANNOUNCEMENT_DETAILS_STORE';
import {API_STORE} from '../../mobx/API_STORE';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {CALENDAR_NOTICE_STORE} from '../../mobx/CALENDAR_NOTICE_STORE';
import {CALENDAR_STORE} from '../../mobx/CALENDAR_STORE';
import {CLUB_DESCRIPTION_STORE} from '../../mobx/CLUB_DESCRIPTION_STORE';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import {CLUB_USER_STORE} from '../../mobx/CLUB_USER_STORE';
import {DEEP_LINKING_STORE} from '../../mobx/DEEP_LINKING_STORE';
import {DEPARTMENT_STORE} from '../../mobx/DEPARTMENT_STORE';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {EVENT_CREATION_STORE} from '../../mobx/EVENT_CREATION_STORE';
import {EVENT_DESCRIPTION_STORE} from '../../mobx/EVENT_DESCRIPTION_STORE';
import {EVENT_EDIT_STORE} from '../../mobx/EVENT_EDIT_STORE';
import {FEEDBACK_STORE} from '../../mobx/FEEDBACK_STORE';
import {FEEDS_STORE} from '../../mobx/FEEDS_STORE';
import {LOGIN_STORE} from '../../mobx/LOGIN_STORE';
import {QR_STORE} from '../../mobx/QR_STORE';
import { AUTH_NAV_STORE } from '../../mobx/AUTH_NAV_STORE';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import {SECURE_STORE} from '../../mobx/SECURITY_STORE';
import {STUDENT_DETAILS_STORE} from '../../mobx/STUDENT_DETAILS_STORE';
import {STUDENT_EDIT_PROFILE_STORE} from '../../mobx/STUDENT_EDIT_PROFILE_STORE';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
// import LoginScreen from '../../screens/LoginScreen';
import {USER_STORE} from '../../mobx/USER_STORE';
import {API_LOGOUT_CLUB, API_LOGOUT_STUDENT} from '../API_CONSTANTS';
import {
  CLUB_USER_ID,
  QR_ENCRYPT,
  QR_TTL,
  REFRESH_TOKEN,
  SEEN_INFO,
  USER_TOKEN,
  USER_TYPE,
} from '../STORAGE_KEYS';
import {STUDENT} from '../USER_TYPE';
import {RefreshJwtHandler} from './refreshJwtHandler';

const ResetEverything = async () => {
  if (Platform.OS === 'ios') {
    EncryptedStorage.getItem(SEEN_INFO).then(val => {
      console.log('HEELLO', val);
      EncryptedStorage.clear();
      EncryptedStorage.setItem(SEEN_INFO, val);
    });
  } else {
    await EncryptedStorage.removeItem(CLUB_USER_ID);
    await EncryptedStorage.removeItem(USER_TOKEN);
    await EncryptedStorage.removeItem(USER_TYPE);
    await EncryptedStorage.removeItem(REFRESH_TOKEN);
    await EncryptedStorage.removeItem(QR_ENCRYPT);
    await EncryptedStorage.removeItem(QR_TTL);
  }
  console.log('LOGOUT');

  // //reset stores
  DEEP_LINKING_STORE.reset();
  ACTIVITY_STORE.reset();
  ANNOUNCEMENT_CREATION_STORE.reset();
  CALENDAR_NOTICE_STORE.reset();
  CALENDAR_STORE.reset();
  CLUB_DESCRIPTION_STORE.reset();
  CLUB_REGISTER_STORE.reset();
  ANNOUNCEMENT_DETAILS_STORE.reset();
  CLUB_USER_STORE.reset();
  EDIT_CLUB_PROFILE_STORE.reset();
  EVENT_DESCRIPTION_STORE.reset();
  EVENT_CREATION_STORE.clearData();
  EVENT_EDIT_STORE.clearData();
  FEEDBACK_STORE.reset();
  FEEDS_STORE.reset();
  LOGIN_STORE.reset();
  RESET_STORE.reset();
  STUDENT_DETAILS_STORE.reset();
  STUDENT_EDIT_PROFILE_STORE.reset();
  STUDENT_REGISTRATION_STORE.reset();
  BOTTOM_NAV_STORE.reset();
  USER_STORE.reset();
  DEPARTMENT_STORE.reset();
  SECURE_STORE.reset();
  QR_STORE.reset();
  // // API_STORE.reset();
  AUTH_NAV_STORE.reset();
};
export const LogOutHandler = () => {
  console.log('LOGOUT KARNE KI KOSHISH');

  if (USER_STORE.getUserType === STUDENT) {
    STUDENT_DETAILS_STORE.setIsLoading(true);
  } else {
    CLUB_USER_STORE.setIsLoading(true);
  }
  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      console.log(API_STORE.getBaseUrl+API_LOGOUT_STUDENT);
      console.log(USER_STORE.getFirebaseToken);
      console.log(USER_STORE.getRefreshToken);
      axios
        .post(
          API_STORE.getBaseUrl +
            (USER_STORE.getUserType === STUDENT
              ? API_LOGOUT_STUDENT
              : API_LOGOUT_CLUB),
          {
            reg_token: USER_STORE.getFirebaseToken,
            refreshToken: USER_STORE.getRefreshToken,
          },
          {
            headers: {
              token: USER_STORE.getUserToken,
            },
          },
        )
        .then(async response => {
          if (response.status === 200) {
            console.log('successfully logged out without ');
            ResetEverything();
            // navigation.push("Login");
          }
        })
        .catch(error => {
          console.log('error ho gaya!!!!!!!!!: ', error);
          if (error.response)
            if (error.response.status === 403) {
              RefreshJwtHandler()
                .then(() => {
                  LogOutHandler();
                })
                .catch(() => {
                  alert(
                    'Failed to logout, check your internet connection or try again after some time',
                  );
                });
              return;
            }
          if (USER_STORE.getUserType === STUDENT) {
            STUDENT_DETAILS_STORE.setIsLoading(false);
          } else {
            CLUB_USER_STORE.setIsLoading(false);
          }
          alert(
            'Failed to logout, check your internet connection or try again after some time',
          );
        });
    } else {
      if (USER_STORE.getUserType === STUDENT) {
        STUDENT_DETAILS_STORE.setIsLoading(false);
      } else {
        CLUB_USER_STORE.setIsLoading(false);
      }
      alert(
        'Failed to logout, check your internet connection or try again after some time',
      );
    }
  });
};
