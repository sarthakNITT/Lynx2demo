// import NetInfo from "@react-native-community/netinfo";
import { API_STORE } from "../../mobx/API_STORE";
import { STUDENT_EDIT_PROFILE_STORE } from "../../mobx/STUDENT_EDIT_PROFILE_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import { API_EDIT_PROFILE_STUDENT } from "../../utils/API_CONSTANTS";
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from "../../utils/ERROR_MESSAGES";
import { RefreshJwtHandler } from "../../utils/helperFunction/refreshJwtHandler";
import axios from 'axios';
export const EditProfileAPI = (formData) => {
  //const axios = require("axios");

  // NetInfo.fetch().then((state) => {
  //   STUDENT_EDIT_PROFILE_STORE.setLoading(true);
  //   STUDENT_EDIT_PROFILE_STORE.setError(false);
  //   STUDENT_EDIT_PROFILE_STORE.setErrorText("");
  //   if (state.isConnected === true) {
  //     console.log(API_STORE.getBaseUrl + API_EDIT_PROFILE_STUDENT);
  //     console.log(USER_STORE.getUserToken);
    
  //     const editProfile = async () => {
  //       try {
  //         // const response = await fetch(API_STORE.getBaseUrl + API_EDIT_PROFILE_STUDENT, {
  //         //   method: "PUT",
  //         //   headers: {
  //         //     "Content-Type": "application/json",
  //         //     token: USER_STORE.getUserToken,
  //         //   },
  //         //   body: formData,
  //         // });
  //         const response = await fetch(API_STORE.getBaseUrl + API_EDIT_PROFILE_STUDENT, {
  //           method: "PUT",
  //           headers: {
  //             token: USER_STORE.getUserToken, // Remove Content-Type!
  //           },
  //           body: formData,
  //         });
  //         console.log(JSON.stringify(formData));
  //         console.log(response);
  //         if (response.ok) {
  //           const data = await response.json();
  //           console.log("1");
  //           STUDENT_EDIT_PROFILE_STORE.setSuccess(true);
  //           STUDENT_EDIT_PROFILE_STORE.setLoading(false);
  //         } else {
  //           console.log("2");
  //           const errorData = await response.json();
  //           console.log(errorData);
  //           STUDENT_EDIT_PROFILE_STORE.setErrorText(errorData.message || UNEXPECTED_ERROR);
  //           STUDENT_EDIT_PROFILE_STORE.setError(true);
  //           STUDENT_EDIT_PROFILE_STORE.setLoading(false);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         if (error.response) {
  //           if (error.response.status === 403) {
  //             try {
  //               await RefreshJwtHandler();
  //               EditProfileAPI(formData);
  //             } catch {
  //               STUDENT_EDIT_PROFILE_STORE.setErrorText(UNEXPECTED_ERROR);
  //               STUDENT_EDIT_PROFILE_STORE.setError(true);
  //               STUDENT_EDIT_PROFILE_STORE.setLoading(false);
  //             }
  //             return;
  //           }
  //         }
  //         STUDENT_EDIT_PROFILE_STORE.setErrorText(SERVER_ERROR);
  //         STUDENT_EDIT_PROFILE_STORE.setError(true);
  //         STUDENT_EDIT_PROFILE_STORE.setLoading(false);
  //       }
  //     };
    
  //     editProfile();
  //   } else {
  //     STUDENT_EDIT_PROFILE_STORE.setErrorText(NO_NETWORK);
  //     STUDENT_EDIT_PROFILE_STORE.setError(true);
  //     STUDENT_EDIT_PROFILE_STORE.setLoading(false);
  //   }
    
  //   // if (state.isConnected === true) {
  //   //   console.log(API_STORE.getBaseUrl + API_EDIT_PROFILE_STUDENT);
  //   //   console.log(USER_STORE.getUserToken);
  //   //   axios
  //   //     .put(
  //   //       API_STORE.getBaseUrl + API_EDIT_PROFILE_STUDENT,

  //   //       formData,

  //   //       { headers: { token: USER_STORE.getUserToken } }
  //   //     )
  //   //     .then((response) => {
  //   //       if (response.status === 200) {
  //   //         console.log("1");
  //   //         STUDENT_EDIT_PROFILE_STORE.setSuccess(true);
  //   //         STUDENT_EDIT_PROFILE_STORE.setLoading(false);
  //   //       } else {
  //   //         console.log("2");
  //   //         STUDENT_EDIT_PROFILE_STORE.setErrorText(UNEXPECTED_ERROR);
  //   //         STUDENT_EDIT_PROFILE_STORE.setError(true);
  //   //         STUDENT_EDIT_PROFILE_STORE.setLoading(false);
  //   //       }
  //   //     })
  //   //     .catch((error) => {
  //   //       console.log(error);
  //   //       if (error.response) {
  //   //         if (error.response.status === 403) {
  //   //           RefreshJwtHandler()
  //   //             .then(() => {
  //   //               EditProfileAPI(formData);
  //   //             })
  //   //             .catch(() => {
  //   //               STUDENT_EDIT_PROFILE_STORE.setErrorText(UNEXPECTED_ERROR);
  //   //               STUDENT_EDIT_PROFILE_STORE.setError(true);
  //   //               STUDENT_EDIT_PROFILE_STORE.setLoading(false);
  //   //             });
  //   //           return;
  //   //         }
  //   //         console.log(error.response.data.message);
  //   //         STUDENT_EDIT_PROFILE_STORE.setErrorText(
  //   //           error.response.data.message
  //   //         );
  //   //       } else {
  //   //         STUDENT_EDIT_PROFILE_STORE.setErrorText(SERVER_ERROR);
  //   //       }
  //   //       STUDENT_EDIT_PROFILE_STORE.setError(true);
  //   //       STUDENT_EDIT_PROFILE_STORE.setLoading(false);
  //   //     });
  //   // } else {
  //   //   STUDENT_EDIT_PROFILE_STORE.setErrorText(NO_NETWORK);
  //   //   STUDENT_EDIT_PROFILE_STORE.setError(true);
  //   //   STUDENT_EDIT_PROFILE_STORE.setLoading(false);
  //   // }
  // });
};
