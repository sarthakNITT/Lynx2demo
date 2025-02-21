// import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {API_STORE} from '../mobx/API_STORE';
import {USER_STORE} from '../mobx/USER_STORE';
import {API_SUBSCRIBE_TOGGLE} from '../utils/API_CONSTANTS';
import {RefreshJwtHandler} from '../utils/helperFunction/refreshJwtHandler';
import {STUDENT} from '../utils/USER_TYPE';

const subUnsubClubApi = async (clubId, onSuccess, onFailure) => {
  const url = API_STORE.getBaseUrl + API_SUBSCRIBE_TOGGLE + clubId;
  const headerInfo = {
    headers: {
      'Content-Type': 'application/json',
      token: USER_STORE.getUserToken,
    },
  };
  try {
    if (USER_STORE.getUserType === STUDENT) {
      const response = await axios.put(url, {}, headerInfo);
      if (response.status === 200) onSuccess();
      else onFailure();
    }
  } catch (e) {
    if (e.response) {
      if (e.response.status === 403) {
        RefreshJwtHandler()
          .then(() => {
            subUnsubClubApi(clubId, onSuccess, onFailure);
          })
          .catch(() => {
            onFailure();
          });
      }
      return;
    }
    onFailure();
  }
};

export const toggleSubscriptionApi = async (clubId, onSuccess, onFailure) => {
  // const netInfo = await NetInfo.fetch();
  // if (!netInfo.isConnected) onFailure();
  // else subUnsubClubApi(clubId, onSuccess, onFailure);
};
