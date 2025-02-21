// import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {API_STORE} from '../mobx/API_STORE';
import {USER_STORE} from '../mobx/USER_STORE';
import {API_TOGGLE_INTERESTED} from '../utils/API_CONSTANTS';
import {RefreshJwtHandler} from '../utils/helperFunction/refreshJwtHandler';
import {STUDENT} from '../utils/USER_TYPE';

async function API_CALL(eventId, successCallback, failureCallBack) {
  try {
    if (USER_STORE.getUserType === STUDENT) {
      const response = await axios.put(
        API_STORE.getBaseUrl + API_TOGGLE_INTERESTED + eventId,
        {},
        {headers: {token: USER_STORE.getUserToken}, timeout: 5000},
      );
      console.log(response.data.message);
      successCallback();
    }
  } catch (error) {
    if (error.response.status === 403) {
      RefreshJwtHandler()
        .then(() => {
          API_CALL(eventId, successCallback, failureCallBack);
        })
        .catch(() => {
          failureCallBack();
        });
      return;
    }
    console.log(error);
    failureCallBack();
  }
}
export const toggleInterestedApi = (
  eventId,
  successCallback,
  failureCallBack,
) => {
  //using netinfo to check if online
  // NetInfo.fetch().then(state => {
  //   if (state.isConnected === true) {
  //     API_CALL(eventId, successCallback, failureCallBack);
  //   } else {
  //     failureCallBack();
  //   }
  // });
};
