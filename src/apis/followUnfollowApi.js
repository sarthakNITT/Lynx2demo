// import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {API_STORE} from '../mobx/API_STORE';
import {USER_STORE} from '../mobx/USER_STORE';
import {API_FOLLOW_TOGGLE} from '../utils/API_CONSTANTS';
import {RefreshJwtHandler} from '../utils/helperFunction/refreshJwtHandler';
import {STUDENT} from '../utils/USER_TYPE';

async function API_CALL(clubId, successCallback, failureCallBack) {
  try {
    if (USER_STORE.getUserType === STUDENT) {
      const [responseFollow] = await axios.all([
        axios.put(
          API_STORE.getBaseUrl + API_FOLLOW_TOGGLE + clubId,
          {},
          {headers: {token: USER_STORE.getUserToken}},
        ),
      ]);
      console.log(responseFollow.data.message);

      if (responseFollow.status == 200) {
        successCallback();
      } else {
        failureCallBack();
      }
    }
  } catch (error) {
    if (error.response.status === 403) {
      RefreshJwtHandler()
        .then(() => {
          API_CALL(clubId, successCallback, failureCallBack);
        })
        .catch(() => {
          failureCallBack();
        });

      return;
    }
    console.log('catch error follow unfollow');
    console.log(error);
    failureCallBack();
  }
}
export const toggleFollowApi = (clubID, successCallback, failureCallBack) => {
  //using netinfo to check if online
  // NetInfo.fetch().then(state => {
  //   if (state.isConnected === true) {
  //     API_CALL(clubID, successCallback, failureCallBack);
  //   } else {
  //     failureCallBack();
  //   }
  // });
};
