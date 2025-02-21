// import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { Platform } from "react-native";
// import DeviceInfo from "react-native-device-info";
import { API_STORE } from "../../mobx/API_STORE";
import { FEEDBACK_STORE } from "../../mobx/FEEDBACK_STORE";
import { STUDENT_DETAILS_STORE } from "../../mobx/STUDENT_DETAILS_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import { API_FEEDBACK } from "../../utils/API_CONSTANTS";
import { NO_NETWORK, SERVER_ERROR } from "../../utils/ERROR_MESSAGES";
import { STUDENT } from "../../utils/USER_TYPE";
const GetFeedback = () => {
  return `
Feedback: ${FEEDBACK_STORE.getFeedback}
Device: ${DeviceInfo.getModel()}
API level: ${Platform.Version}
   `;
};
export const feedsAPI = () => {
  FEEDBACK_STORE.setLoading(true);
  //using netinfo to check if online
  const fb = GetFeedback();
  console.log(fb);
  // NetInfo.fetch().then((state) => {
  //   if (state.isConnected === true) {
  //     axios
  //       .post(API_STORE.getBaseUrl + API_FEEDBACK, {
  //         userType: USER_STORE.getUserType === STUDENT ? "student" : "club",
  //         userId:
  //           USER_STORE.getUserType === STUDENT
  //             ? STUDENT_DETAILS_STORE.getStudentId
  //             : USER_STORE.getClubId,
  //         detail: fb,
  //         feedbackType: FEEDBACK_STORE.getType,
  //       })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           FEEDBACK_STORE.setSuccess(true);
  //         }
  //         FEEDBACK_STORE.setLoading(false);
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           FEEDBACK_STORE.setErrorText(error.response.data.message);
  //         } else if (error.request) {
  //           FEEDBACK_STORE.setErrorText(SERVER_ERROR);
  //         }
  //         FEEDBACK_STORE.setError(true);
  //         FEEDBACK_STORE.setLoading(false);
  //       });
  //   } else {
  //     FEEDBACK_STORE.setSuccess(false);
  //     FEEDBACK_STORE.setLoading(false);
  //     FEEDBACK_STORE.setErrorText(NO_NETWORK);
  //     FEEDBACK_STORE.setError(true);
  //   }
  // });
};
