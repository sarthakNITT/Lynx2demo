// import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { API_STORE } from "../../mobx/API_STORE";
import { EVENT_CREATION_STORE } from "../../mobx/EVENT_CREATION_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import { API_POST_ADD_EVENT } from "../../utils/API_CONSTANTS";
import { NO_NETWORK, UNEXPECTED_ERROR } from "../../utils/ERROR_MESSAGES";
import { RefreshJwtHandler } from "../../utils/helperFunction/refreshJwtHandler";

export const addEvent = async () => {
  reset();
  const formData = getFormDataReady();
  const url = API_STORE.getBaseUrl + API_POST_ADD_EVENT;
  const headerInfo = {
    headers: {
      "Content-Type": "application/json",
      token: USER_STORE.getUserToken,
    },
  };
  try {
    // const netInfo = await NetInfo.fetch();
    // if (!netInfo.isConnected) {
    //   EVENT_CREATION_STORE.setLoading(false);
    //   EVENT_CREATION_STORE.setIsError(true);
    //   EVENT_CREATION_STORE.setErrorText(NO_NETWORK);
    //   return;
    // }
    EVENT_CREATION_STORE.setLoading(true);

    const response = await axios.post(url, formData, headerInfo);

    if (response.status === 200 || response.status === 201) {
      EVENT_CREATION_STORE.setLoading(false);
      EVENT_CREATION_STORE.setIsError(false);
      EVENT_CREATION_STORE.setErrorText("");
      EVENT_CREATION_STORE.clearData();
      EVENT_CREATION_STORE.setSuccess(true);
    } else {
      EVENT_CREATION_STORE.setLoading(false);
      EVENT_CREATION_STORE.setIsError(true);
      EVENT_CREATION_STORE.setErrorText(response.data.message);
    }
  } catch (e) {
    if (e.response) {
      if (e.response.status === 403) {
        RefreshJwtHandler()
          .then(() => {
            addEvent();
          })
          .catch(() => {
            EVENT_CREATION_STORE.setErrorText(UNEXPECTED_ERROR);
            EVENT_CREATION_STORE.setIsError(true);
            EVENT_CREATION_STORE.setLoading(false);
          });
        return;
      }
    }
    EVENT_CREATION_STORE.setIsError(true);
    EVENT_CREATION_STORE.setErrorText(e.response.data.message);
    EVENT_CREATION_STORE.setLoading(false);
  }
};

const getFormDataReady = () => {
  const formData = new FormData();
  formData.append("title", EVENT_CREATION_STORE.getTitle.trim());
  formData.append("description", EVENT_CREATION_STORE.getDesc.trim());
  formData.append(
    "startDate",
    EVENT_CREATION_STORE.getStartEventIST.toString()
  );
  formData.append("endDate", EVENT_CREATION_STORE.getEndEventIST.toString());
  EVENT_CREATION_STORE.getTags.forEach((item, index) => {
    formData.append(`tags[${index}]`, item);
  });
  EVENT_CREATION_STORE.getLinks.forEach((item, index) => {
    formData.append(`links[${index}]`, item);
  });
  EVENT_CREATION_STORE.getImages.forEach((image) => {
    if (image != null) {
      formData.append("eventsPic", {
        uri: image.uri,
        name: image.name,
        type: "image/jpeg",
      });
    }
  });
  return formData;
};

const reset = () => {
  EVENT_CREATION_STORE.setIsError(false);
  EVENT_CREATION_STORE.setErrorText("");
  EVENT_CREATION_STORE.setLoading(false);
};
