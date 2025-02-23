import { observer } from "mobx-react";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Image, View } from "react-native";
import DocumentPicker from '@react-native-documents/picker'
import ImageResizer from "@bam.tech/react-native-image-resizer";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import Error from "../../components/Error";
import { EVENT_CREATION_STORE } from "../../mobx/EVENT_CREATION_STORE";
import * as color from "../../utils/colors";
import { validFileSize } from "../../utils/helperFunction/FormValidation";
import {
  eventCreation_DateTitle,
  eventCreation_tags_linksTitle,
} from "../../utils/stringConstants";
import {
  HorizontalPadding,
  MAX_EVENT_IMAGE_SIZE,
  MAX_IMAGES_IN_EVENT,
} from "../../utils/UI_CONSTANTS";
import Images from "./Images";

const win = Dimensions.get("window");

const EventCreationImages = observer(({ scrollViewRef, callback }) => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  //handling scroll
  const scroll = () => {
    if (EVENT_CREATION_STORE.getImages.length < 2) {
      EVENT_CREATION_STORE.setImageError(true);
      return;
    }
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: win.width * 4,
        animated: true,
      });
    }
    callback(eventCreation_tags_linksTitle, 5);
  };
  const back = () => {
    callback(eventCreation_DateTitle, 3);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: win.width * 2,
        animated: true,
      });
    }
  };
  //

  const selectImage = async () => {
    if (EVENT_CREATION_STORE.getImages.length >= MAX_IMAGES_IN_EVENT + 1) {
      toast.show(`Maximum image count is ${MAX_IMAGES_IN_EVENT}`, {
        type: "warning",
      });
      return;
    }

    try {
      const image = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (!validFileSize(image.size, MAX_EVENT_IMAGE_SIZE)) {
        toast.show(`Maximum allowed image size is ${MAX_EVENT_IMAGE_SIZE} MB`, {
          type: "warning",
        });
        return;
      }

      if (EVENT_CREATION_STORE.getImages.length + 1 > MAX_IMAGES_IN_EVENT + 1) {
        toast.show(`Maximum image count is ${MAX_IMAGES_IN_EVENT}`, {
          type: "warning",
        });
        return;
      }
      setLoading(true);
      ImageResizer.createResizedImage(
        image.uri,
        1080,
        1080,
        "JPEG",
        90,
        0,
        null,
        false,
        { onlyScaleDown: true }
      )
        .then((response) => {
      //     // response.uri is the URI of the new image that can now be displayed, uploaded...
      //     // response.path is the path of the new image
      //     // response.name is the name of the new image with the extension
      //     // response.size is the size of the new image
          console.log(response);
          EVENT_CREATION_STORE.addImage(response);
          EVENT_CREATION_STORE.setProfilePictureSelected(false);

          setLoading(false);
        })
        .catch((err) => {
      //     // Oops, something went wrong. Check that the filename is correct and
      //     // inspect err to get more details.
          console.log(err);
          toast.show("Image not supported", { type: "warning" });
          setLoading(false);

          return;
        });

      console.log(EVENT_CREATION_STORE.getImages.length);
      //EVENT_CREATION_STORE.setLoading(false);

      await Image.getSize(
        image.uri,
        () => {
          //EVENT_CREATION_STORE.setLoading(false);

          EVENT_CREATION_STORE.setProfilePictureSelected(true);
          EVENT_CREATION_STORE.setImageError(false);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      if (DocumentPicker.isCancel()) console.log(err);
      else throw err;
    }
  };

  const deleteImage = (index) => {
    EVENT_CREATION_STORE.removeImage(index);
  };
  console.log(isLoading);
  return (
    <View style={styles.container}>
      <View style={styles.choosePicture}>
        {EVENT_CREATION_STORE.getImages.length > 1 ? (
          <Images selectImage={selectImage} deleteImage={deleteImage} />
        ) : (
          <Button
            icon="plus"
            mode="text"
            color={color.BLACK}
            textColor={color.BLACK}
            onPress={() => selectImage()}
          >
            Add featured image
          </Button>
        )}
      </View>
      {EVENT_CREATION_STORE.getImageError && (
        <View style={styles.error}>
          <Error text="Please upload a featured image" />
        </View>
      )}

      {/* Navigation Buttons */}
      {isLoading ? (
        <ActivityIndicator
          style={{ ...styles.next, backgroundColor: "white" }}
          color={color.Accent}
          size={"large"}
        />
      ) : (
        <Button
          style={styles.next}
          mode="contained"
          onPress={scroll}
          labelStyle={{ color: color.regNext }}
        >
          Next
        </Button>
      )}
      <Button
        style={styles.back}
        mode="outline"
        onPress={back}
        labelStyle={{ color: color.regAttach }}
        icon="chevron-left"
      >
        Back
      </Button>
    </View>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: win.width,
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),
    justifyContent: "center",
    alignItems: "center",
    color: color.BLACK, // General text color for the container
  },
  choosePicture: {
    justifyContent: "center",
    alignItems: "center",
    color: color.BLACK, // Text color for this view container
  },
  addImageText: {
    color: color.BLACK, // Ensure this is applied to the "Add featured image" text
    fontSize: "16@s", // Customize the font size if needed
  },
  headerText: {
    color: color.BLACK,
    fontSize: "16@s",
  },
  error: {
    position: "absolute",
    bottom: "60@vs",
    left: scale(HorizontalPadding),
    color: color.BLACK,
  },
  next: {
    position: "absolute",
    bottom: "20@vs",
    right: "20@vs",
    backgroundColor: color.regAttach,
  },
  back: {
    position: "absolute",
    bottom: "20@vs",
    left: "10@vs",
  },
});

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     width: win.width,
//     paddingVertical: verticalScale(20),
//     paddingHorizontal: scale(10),
//     justifyContent: 'center',
//     alignItems: 'center',
//     color:color.BLACK,
//     //backgroundColor:color.BLACK,

//   },
//   choosePicture: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     //textColor:color.BLACK,
//     //backgroundColor:color.BLACK,
//     color:color.BLACK,

//   },
//   headerText: {
//     color: color.BLACK,
//     fontSize: '16@s',

//   },
//   error: {
//     position: 'absolute',
//     bottom: '60@vs',
//     left: scale(HorizontalPadding),
//     color:color.BLACK,
//     //backgroundColor:color.BLACK,

//   },
//   next: {
//     position: 'absolute',
//     bottom: '20@vs',
//     right: '20@vs',
//     backgroundColor: color.regAttach,

//   },
//   back: {
//     position: 'absolute',
//     bottom: '20@vs',
//     left: '10@vs',

//   },
// });

export default EventCreationImages;
