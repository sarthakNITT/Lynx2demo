import {
  API_RESET_PASSWORD_GENERATE_OTP_CLUBS,
  API_RESET_PASSWORD_GENERATE_OTP_STUDENTS,
} from '../../utils/API_CONSTANTS';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {API_STORE} from '../../mobx/API_STORE';
// import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';

export const sendClubOTP = async token => {
  console.log('SENDING CLUB OTP');

  // const netInfo = await NetInfo.fetch();
  // if (!netInfo.isConnected) {
  //   return {status: false, message: NO_NETWORK};
  // }
  try {
    const res = await axios.post(
      API_STORE.getBaseUrl + API_RESET_PASSWORD_GENERATE_OTP_CLUBS,
      {
        email: RESET_STORE.getUsername.trim(),
        recaptcha: token,
      },
    );
    console.log(res.data);
    if (res.data.otpExists === true) {
      return {
        status: true,
        message:
          'Verification code already sent to\n' +
          RESET_STORE.getUsername.trim(),
      };
    }
    return {
      status: true,
      message: 'Verification code sent to\n' + RESET_STORE.getUsername.trim(),
    };
  } catch (error) {
    return {status: false, message: error.response.data.message};
  }
};

export const sendStudentOTP = async token => {
  console.log('SENDING STUDENT OTP');
  // const netInfo = await NetInfo.fetch();
  // if (!netInfo.isConnected) {
  //   return {status: false, message: NO_NETWORK};
  // }
  try {
    const res = await axios.post(
      API_STORE.getBaseUrl + API_RESET_PASSWORD_GENERATE_OTP_STUDENTS,
      {
        rollNo: RESET_STORE.getUsername.trim(),
        recaptcha: token,
      },
    );
    console.log(res.data);
    if (res.data.otpExists === true) {
      return {
        status: true,
        message:
          'Verification code already sent to\n' +
          RESET_STORE.getUsername.trim() +
          '@nitt.edu',
      };
    }
    return {
      status: true,
      message:
        'Verification code sent to\n' +
        RESET_STORE.getUsername.trim() +
        '@nitt.edu',
    };
  } catch (error) {
  if (error.response && error.response.data) {
    return {status: false, message: error.response.data.message};
  } else {
    return {status: false, message: error.message || 'Something went wrong'};
  }
}

};
