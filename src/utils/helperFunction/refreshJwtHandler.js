// import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {API_STORE} from '../../mobx/API_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {API_REFRESH_JWT} from '../API_CONSTANTS';
import {REFRESH_TOKEN, USER_TOKEN} from '../STORAGE_KEYS';

export const RefreshJwtHandler = async () => {
  console.log('GETTING NEW JWT TOKEN');
  // const netInfo = await NetInfo.fetch();
  // if (!netInfo.isConnected) {
  //   throw new Error('Failed to refresh JWT Token');
  // }

  const refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN);

  if (refreshToken === null) {
    throw new Error('Failed to refresh JWT Token');
  }

  try {
    const response = await axios.post(API_STORE.getBaseUrl + API_REFRESH_JWT, {
      refreshToken: refreshToken,
    });

    const newToken = response.data.token;
    console.log('new user token is: ', newToken);
    await EncryptedStorage.removeItem(USER_TOKEN);
    await EncryptedStorage.setItem(USER_TOKEN, newToken);
    USER_STORE.setUserToken(newToken);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to refresh JWT Token');
  }
};
