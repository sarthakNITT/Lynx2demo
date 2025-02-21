// import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { ANNOUNCEMENT_CREATION_STORE } from "../../mobx/ANNOUNCEMENT_CREATION_STORE";
import { API_STORE } from "../../mobx/API_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import { API_CIRCULAR_CREATION } from "../../utils/API_CONSTANTS";
import {
  FILL_REQUIRED_FIELDS,
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from "../../utils/ERROR_MESSAGES";
import { RefreshJwtHandler } from "../../utils/helperFunction/refreshJwtHandler";

function validData() {
  if (
    ANNOUNCEMENT_CREATION_STORE.getTitle.trim() === "" ||
    ANNOUNCEMENT_CREATION_STORE.getDescription.trim() === ""
  ) {
    ANNOUNCEMENT_CREATION_STORE.setErrorText(FILL_REQUIRED_FIELDS);
    return false;
  } else return true;
}

export function clearData() {
  console.log("data clear");
  ANNOUNCEMENT_CREATION_STORE.setDescription("");
  ANNOUNCEMENT_CREATION_STORE.setError(false);
  ANNOUNCEMENT_CREATION_STORE.setErrorText("");
  ANNOUNCEMENT_CREATION_STORE.setFiles([]);
  ANNOUNCEMENT_CREATION_STORE.setLinks([]);
  ANNOUNCEMENT_CREATION_STORE.setLink("");
  ANNOUNCEMENT_CREATION_STORE.setTitle("");
  ANNOUNCEMENT_CREATION_STORE.setLoading(false);
}

export const createAnnouncement = () => {
  ANNOUNCEMENT_CREATION_STORE.setErrorText("");
  ANNOUNCEMENT_CREATION_STORE.setLoading(true);

  // NetInfo.fetch().then((state) => {
  //   if (state.isConnected === true) {
  //     if (validData()) {
  //       const formData = new FormData();
  //       formData.append("isOfficial", ANNOUNCEMENT_CREATION_STORE.getOfficial);
  //       formData.append("title", ANNOUNCEMENT_CREATION_STORE.getTitle.trim());
  //       formData.append(
  //         "description",
  //         ANNOUNCEMENT_CREATION_STORE.getDescription.trim()
  //       );
  //       var i;
  //       for (i = 0; i < ANNOUNCEMENT_CREATION_STORE.getFiles.length; i++) {
  //         formData.append("files", {
  //           uri: ANNOUNCEMENT_CREATION_STORE.getFiles[i].uri,
  //           type: ANNOUNCEMENT_CREATION_STORE.getFiles[i].type,
  //           name: ANNOUNCEMENT_CREATION_STORE.getFiles[i].name,
  //         });
  //       }
  //       for (i = 0; i < ANNOUNCEMENT_CREATION_STORE.getLinks.length; i++) {
  //         formData.append("links", ANNOUNCEMENT_CREATION_STORE.getLinks[i]);
  //       }
  //       axios
  //         .post(API_STORE.getBaseUrl + API_CIRCULAR_CREATION, formData, {
  //           headers: {
  //             //Remove hard coded token once implemented
  //             token: USER_STORE.getUserToken,
  //           },
  //         })
  //         .then((response) => {
  //           if (response.status === 200) {
  //             clearData();
  //             console.log("done");
  //             ANNOUNCEMENT_CREATION_STORE.setSuccess(true);
  //           } else {
  //             ANNOUNCEMENT_CREATION_STORE.setErrorText(UNEXPECTED_ERROR);
  //             ANNOUNCEMENT_CREATION_STORE.setLoading(false);
  //           }
  //         })
  //         .catch((error) => {
  //           if (error.response) {
  //             if (error.response.status === 403) {
  //               RefreshJwtHandler()
  //                 .then(() => {
  //                   createAnnouncement();
  //                 })
  //                 .catch(() => {
  //                   ANNOUNCEMENT_CREATION_STORE.setErrorText(UNEXPECTED_ERROR);
  //                   ANNOUNCEMENT_CREATION_STORE.setError(true);
  //                   ANNOUNCEMENT_CREATION_STORE.setLoading(false);
  //                 });
  //             }
  //             ANNOUNCEMENT_CREATION_STORE.setErrorText(
  //               error.response.data.message
  //             );
  //           } else if (error.request) {
  //             ANNOUNCEMENT_CREATION_STORE.setErrorText(SERVER_ERROR);
  //           }
  //           ANNOUNCEMENT_CREATION_STORE.setError(true);

  //           ANNOUNCEMENT_CREATION_STORE.setLoading(false);
  //         });
  //     } else {
  //       ANNOUNCEMENT_CREATION_STORE.setError(true);
  //       ANNOUNCEMENT_CREATION_STORE.setLoading(false);
  //     }
  //   } else {
  //     ANNOUNCEMENT_CREATION_STORE.setErrorText(NO_NETWORK);
  //     ANNOUNCEMENT_CREATION_STORE.setError(true);
  //     ANNOUNCEMENT_CREATION_STORE.setLoading(false);
  //   }
  // });
};
