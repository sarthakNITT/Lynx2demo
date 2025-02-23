import NetInfo from '@react-native-community/netinfo';
import {API_STORE} from '../../mobx/API_STORE';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {API_EDIT_PROFILE_CLUB} from '../../utils/API_CONSTANTS';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
export const EditProfileClubAPI = formData => {
  const axios = require('axios');
  NetInfo.fetch().then(state => {
    if (state.isConnected == true) {
      EDIT_CLUB_PROFILE_STORE.setLoading(true);
      axios
        .put(
          API_STORE.getBaseUrl + API_EDIT_PROFILE_CLUB,

          formData,

          {headers: {token: USER_STORE.getUserToken}},
        )
        .then(response => {
          if (response.status === 200) {
            EDIT_CLUB_PROFILE_STORE.setLoading(false);
            EDIT_CLUB_PROFILE_STORE.setSuccess(true);
          } else {
            EDIT_CLUB_PROFILE_STORE.setLoading(false);
            EDIT_CLUB_PROFILE_STORE.setError(true);
            EDIT_CLUB_PROFILE_STORE.setError(UNEXPECTED_ERROR);
          }
        })
        .catch(error => {
          EDIT_CLUB_PROFILE_STORE.setLoading(false);
          EDIT_CLUB_PROFILE_STORE.setError(true);
          if (error.response) {
            console.log(error.response.data.message);
            EDIT_CLUB_PROFILE_STORE.setErrorText(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            EDIT_CLUB_PROFILE_STORE.setErrorText(SERVER_ERROR);
          }
          console.log(error);
        });
    } else {
      EDIT_CLUB_PROFILE_STORE.setErrorText(NO_NETWORK);
    }
  });
};