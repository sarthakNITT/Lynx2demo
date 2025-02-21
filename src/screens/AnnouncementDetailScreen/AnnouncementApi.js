// import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { ANNOUNCEMENT_DETAILS_STORE } from "../../mobx/ANNOUNCEMENT_DETAILS_STORE";
import { API_STORE } from "../../mobx/API_STORE";
import { API_GET_CIRCULAR_BY_ID } from "../../utils/API_CONSTANTS";
import { NO_NETWORK, SERVER_ERROR } from "../../utils/ERROR_MESSAGES";

async function API_CALL() {
  try {
    const response = await axios.get(
      API_STORE.getBaseUrl +
        API_GET_CIRCULAR_BY_ID +
        ANNOUNCEMENT_DETAILS_STORE.getId,
      { timeout: 5000 }
    );
    ANNOUNCEMENT_DETAILS_STORE.setData(response.data.circular);
    ANNOUNCEMENT_DETAILS_STORE.setLoading(false);
  } catch (error) {
    if (error.response) {
      console.log(error);
      ANNOUNCEMENT_DETAILS_STORE.setErrorText(error.response.data.message);
    } else if (error.request) {
      console.log(error.request);
      ANNOUNCEMENT_DETAILS_STORE.setErrorText(SERVER_ERROR);
    }
    ANNOUNCEMENT_DETAILS_STORE.setError(true);
    ANNOUNCEMENT_DETAILS_STORE.setLoading(false);
  }
}
export const circularDescriptionApi = () => {
  ANNOUNCEMENT_DETAILS_STORE.setError(false);

  //using netinfo to check if online
  // NetInfo.fetch().then((state) => {
  //   if (state.isConnected === true) {
  //     ANNOUNCEMENT_DETAILS_STORE.setLoading(true);
  //     API_CALL();
  //   } else {
  //     ANNOUNCEMENT_DETAILS_STORE.setLoading(false);
  //     ANNOUNCEMENT_DETAILS_STORE.setErrorText(NO_NETWORK);
  //     ANNOUNCEMENT_DETAILS_STORE.setError(true);
  //   }
  // });
};
