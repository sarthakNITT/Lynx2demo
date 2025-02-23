import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { API_STORE } from "../../mobx/API_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import { API_NEW_MESSAGE } from "../../utils/API_CONSTANTS";
import { NO_NETWORK, UNEXPECTED_ERROR } from "../../utils/ERROR_MESSAGES";

// const MessageAPI = async (
//   message,
//   title,
//   selectedImage,
//   links,
//   toast,
//   successcallback
// ) => {
//   const state = await NetInfo.fetch();
//   if (state.isConnected) {
//     console.log(title);
//     console.log(message);
//     console.log(
//       selectedImage ? `Image URI: ${selectedImage}` : "No image is being sent"
//     );
//     console.log(links);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", message);

//     if (selectedImage) {
//       const fileType = selectedImage.split(".").pop();
//       let mimeType = "";

//       switch (fileType) {
//         case "jpg":
//           mimeType = "image/jpg";
//           break;
//         case "jpeg":
//           mimeType = "image/jpeg";
//           break;
//         case "png":
//           mimeType = "image/png";
//           break;
//         default:
//           console.log("Unsupported file type");
//           return;
//       }

//       formData.append("image", {
//         uri: selectedImage,
//         name: `image.${fileType}`,
//         type: mimeType,
//       });
//     }

//     links.forEach((link, index) => {
//       formData.append(`link[${index}]`, link);
//     });

//     axios
//       .post(API_STORE.getBaseUrl + API_NEW_MESSAGE, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           token: USER_STORE.getUserToken,
//         },
//       })
//       .then(async (response) => {
//         if (response.status === 200) {
//           console.log(response.data.message);
//           await successcallback(response.data.message);
//         }
//       })
//       .catch((error) => {
//         toast.show(`Unexpected Error has occurred: ${error.message}`, {
//           type: "warning",
//         });
//       });
//   } else {
//     console.error(NO_NETWORK);
//   }
// };

// export default MessageAPI;
// import ImageResizer from "react-native-image-resizer";

// const MessageAPI = async (
//   message,
//   title,
//   selectedImage,
//   links,
//   toast,
//   successcallback
// ) => {
//   const state = await NetInfo.fetch();
//   if (!state.isConnected) {
//     console.error(NO_NETWORK);
//     return;
//   }

//   console.log("Title:", title);
//   console.log("Message:", message);
//   console.log(selectedImage ? `Image URI: ${selectedImage}` : "No image is being sent");
//   console.log("Links:", links);

//   const formData = new FormData();
//   formData.append("title", title);
//   formData.append("description", message);

//   if (selectedImage) {
//     try {
//       // Resize image
//       const resizedImage = await ImageResizer.createResizedImage(
//         selectedImage,
//         80, // Width
//         80, // Height
//         "JPEG", // Format
//         20, // Quality
//         0, // Rotation
//         null, // No target path
//         false, // Don't keep EXIF metadata
//         { onlyScaleDown: true }
//       );

//       console.log("Resized Image:", resizedImage);

//       const fileType = resizedImage.name.split(".").pop();
//       let mimeType = fileType === "png" ? "image/png" : "image/jpeg";

//       formData.append("image", {
//         uri: resizedImage.uri,
//         name: `image.${fileType}`,
//         type: mimeType,
//       });
//     } catch (error) {
//       console.error("Error resizing image:", error);
//       toast.show("Image processing failed", { type: "danger" });
//       return;
//     }
//   }

//   links.forEach((link, index) => {
//     formData.append(`link[${index}]`, link);
//   });

//   axios
//     .post(API_STORE.getBaseUrl + API_NEW_MESSAGE, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         token: USER_STORE.getUserToken,
//       },
//     })
//     .then(async (response) => {
//       if (response.status === 200) {
//         console.log(response.data.message);
//         await successcallback(response.data.message);
//       }
//     })
//     .catch((error) => {
//       console.error("API Error:", error);
//       toast.show(`Unexpected Error has occurred: ${error.message}`, {
//         type: "warning",
//       });
//     });
// };

// export default MessageAPI;
import ImageResizer from "@bam.tech/react-native-image-resizer";
import mime from "mime";

const MessageAPI = async (
  message,
  title,
  selectedImage,
  links,
  toast,
  successcallback
) => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    console.error(NO_NETWORK);
    return;
  }

  // console.log("Title:", title);
  // console.log("Message:", message);
  // console.log(selectedImage ? `Image URI: ${selectedImage}` : "No image is being sent");
  // console.log("Links:", links);

  const formData = new FormData();
formData.append("title", title);
formData.append("description", message);

if (selectedImage) {
  try {
    // Resize image to a more reasonable size
    const resizedImage = await ImageResizer.createResizedImage(
      selectedImage,
      800, // Width
      800, // Height
      "JPEG",
      80, // Quality (Increased)
      0,
      null,
      false,
      { onlyScaleDown: true }
    );

    console.log("Resized Image:", resizedImage);

    const fileType = mime.getType(resizedImage.uri) || "image/jpeg";

    // Change the property name from 'image' to 'files'
    formData.append("files", {
      uri: resizedImage.uri,
      name: resizedImage.name,
      type: fileType,
    });
  } catch (error) {
    console.error("Error resizing image:", error);
    toast.show("Image processing failed", { type: "danger" });
    return;
  }
}

links.forEach((link, index) => {
  formData.append(`link[${index}]`, link);
});

console.log(formData);

try {
  const response = await fetch(API_STORE.getBaseUrl + API_NEW_MESSAGE, {
    method: 'POST',
    headers: {
      token: USER_STORE.getUserToken, // Removed "Content-Type" for FormData
    },
    body: formData, // body as FormData
  });
  console.log(response);

  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData.message);
    await successcallback(responseData.message);
  } else {
    console.error("API Error:", response.statusText);
    toast.show(`Unexpected Error has occurred: ${response.statusText}`, {
      type: "warning",
    });
  }
} catch (error) {
  console.error("Fetch Error:", error);
  toast.show(`Unexpected Error has occurred: ${error.message}`, {
    type: "warning",
  });
}}

export default MessageAPI;
