import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {API_STORE} from '../mobx/API_STORE';
import {API_SEARCH} from '../utils/API_CONSTANTS';
import {NO_NETWORK} from '../utils/ERROR_MESSAGES';

async function API_CALL(query, type, successCallback, failureCallBack) {
  try {
    const response = await axios.post(
      API_STORE.getBaseUrl + API_SEARCH,
      {
        search: query,
        type: type,
      },
      {timeout: 5000},
    );
    console.log(response.data.message);
    successCallback(response.data);
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message || 'Unexpected error occurred';
    failureCallBack(errorMessage);
  }
}

export const searchApi = async (query, type, successCallback, failureCallBack) => {
  const state = await NetInfo.fetch();
  if (state.isConnected === true) {
    API_CALL(query, type, successCallback, failureCallBack);
  } else {
    failureCallBack(NO_NETWORK);
  }
};
