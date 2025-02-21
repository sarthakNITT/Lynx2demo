// import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {API_STORE} from '../../mobx/API_STORE';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {API_STUDENT_REGISTER} from '../../utils/API_CONSTANTS';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';


export const studentRegisterAPI = formData => {
  STUDENT_REGISTRATION_STORE.setApiError(false);
  STUDENT_REGISTRATION_STORE.setApiCall(true);
  const token = USER_STORE.getUserRegToken;

  // NetInfo.fetch().then(async(state) => {
  //   console.log(formData);
  //   console.log("API URL: ", API_STORE.getBaseUrl + API_STUDENT_REGISTER);
  //   console.log("Network state: ", state);
  //   console.log( token);
  //   console.log(API_STORE.getBaseUrl + API_STUDENT_REGISTER);
  //   if (state.isConnected === true) {
  //     // Send the request body as JSON
  //   const response = await fetch(API_STORE.getBaseUrl + API_STUDENT_REGISTER, {
  //     method: "POST",
  //     headers: {
  //       //"Content-Type": "application/json",  // Specify JSON in Content-Type
  //       "token": token,  // Send the token in the 'token' header
  //     },
  //     body: formData  // Convert body object to JSON string
  //   });
  //   const data = await response.json();
  //   console.log("lynx");
  //   console.log(response);
  //   console.log(data);
  //   const obj = {"data":data};
  //   if (response.status === 200) {
  //           console.log("in third1 if");
  //           STUDENT_REGISTRATION_STORE.setApiResponse(obj);
  //           STUDENT_REGISTRATION_STORE.setApiSuccess(true);
  //           STUDENT_REGISTRATION_STORE.setApiCall(false);
            
  //   }
  //     // axios
  //     //   .post(API_STORE.getBaseUrl + API_STUDENT_REGISTER, formData, {
  //     //     headers: {token: token},
  //     //   })

  //     //   .then(response => {
  //     //     if (response.status === 200) {
  //     //       console.log("in third1 if");
  //     //       STUDENT_REGISTRATION_STORE.setApiResponse(response);
  //     //       STUDENT_REGISTRATION_STORE.setApiSuccess(true);
  //     //       STUDENT_REGISTRATION_STORE.setApiCall(false);
            
  //     //     }
  //     //   })
  //     //   .catch(error => {
  //     //     console.log("ERROR" + error);
  //     //     if (error.response) {
  //     //       STUDENT_REGISTRATION_STORE.setApiErrorText(
  //     //         error.response.data.message,
  //     //       );
  //     //       console.log(error);
  //     //       console.log("in 2");
  //     //       console.log(error.response);
  //     //     } else if (error.request) {
  //     //       console.log(error.request);
  //     //       console.log(error);
  //     //       STUDENT_REGISTRATION_STORE.setApiErrorText(SERVER_ERROR);
  //     //       console.log("in 3 ");
  //     //     } else {
  //     //       STUDENT_REGISTRATION_STORE.setApiErrorText(UNEXPECTED_ERROR);
  //     //       console.log("in 4 "); 
  //     //     }
  //     //     console.log("in 5 ");
  //     //     STUDENT_REGISTRATION_STORE.setApiError(true);
  //     //     STUDENT_REGISTRATION_STORE.setApiCall(false);
  //     //   });
  //   } else {
  //     STUDENT_REGISTRATION_STORE.setApiErrorText(NO_NETWORK);
  //     STUDENT_REGISTRATION_STORE.setApiError(true);
  //     STUDENT_REGISTRATION_STORE.setApiCall(false);
  //     console.log("in third IN ELSE if");
  //   }
  // });
};
// import NetInfo from '@react-native-community/netinfo';
// import { API_STORE } from '../../mobx/API_STORE';
// import { STUDENT_REGISTRATION_STORE } from '../../mobx/STUDENT_REGISTRATION_STORE';
// import { USER_STORE } from '../../mobx/USER_STORE';
// import { API_STUDENT_REGISTER } from '../../utils/API_CONSTANTS';
// import { NO_NETWORK, SERVER_ERROR, UNEXPECTED_ERROR } from '../../utils/ERROR_MESSAGES';

// export const studentRegisterAPI = async (formData) => {
//   STUDENT_REGISTRATION_STORE.setApiError(false);
//   STUDENT_REGISTRATION_STORE.setApiCall(true);
//   const token = USER_STORE.getUserRegToken;

//   const state = await NetInfo.fetch();
//   console.log("API URL: ", API_STORE.getBaseUrl + API_STUDENT_REGISTER);
//   console.log("Network state: ", state);

//   if (state.isConnected) {
//     try {
//       const response = await fetch(API_STORE.getBaseUrl + API_STUDENT_REGISTER, {
//         method: 'POST',
//         body: formData, // fetch automatically sets Content-Type for FormData
//         headers: {
//           token: token,
//         },
//       });

//       const responseData = await response.json();
//       console.log("Response Data:", responseData);

//       if (response.ok) {
//         STUDENT_REGISTRATION_STORE.setApiResponse(responseData);
//         STUDENT_REGISTRATION_STORE.setApiSuccess(true);
//       } else {
//         STUDENT_REGISTRATION_STORE.setApiErrorText(responseData.message || SERVER_ERROR);
//         STUDENT_REGISTRATION_STORE.setApiError(true);
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       STUDENT_REGISTRATION_STORE.setApiErrorText(SERVER_ERROR);
//       STUDENT_REGISTRATION_STORE.setApiError(true);
//     } finally {
//       STUDENT_REGISTRATION_STORE.setApiCall(false);
//     }
//   } else {
//     STUDENT_REGISTRATION_STORE.setApiErrorText(NO_NETWORK);
//     STUDENT_REGISTRATION_STORE.setApiError(true);
//     STUDENT_REGISTRATION_STORE.setApiCall(false);
//   }
// };

