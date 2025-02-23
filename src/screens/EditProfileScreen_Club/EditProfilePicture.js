import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import DocumentPicker from '@react-native-documents/picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {NO_IMAGE_URL} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {validFileSize} from '../../utils/helperFunction/FormValidation';
import {MAX_CLUB_PROFILE_PICTURE} from '../../utils/UI_CONSTANTS';

const WIDTH = Dimensions.get('window').width;

const EditProfilePicture = observer(() => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const selectImage = async () => {
    try {
      const image = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      if (!validFileSize(image.size, MAX_CLUB_PROFILE_PICTURE)) {
        toast.show(
          `Maximum allowed file size is ${MAX_CLUB_PROFILE_PICTURE} MB`,
          {type: 'danger'},
        );
        return;
      }
      console.log(image);
      Image.getSize(
        image.uri,
        (width, height) => {
          if (width > 3840 || height > 2160) {
            toast.show('Image Resolution not supported', {type: 'warning'});
            return;
          }
        },
        error => {
          toast.show('Image not supported', {type: 'warning'});
          return;
        },
      );
      setLoading(true);
      ImageResizer.createResizedImage(
        image.uri,
        4000,
        4000,
        'JPEG',
        90,
        0,
        null,
        false,
        {onlyScaleDown: true},
      )
        .then(response => {
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
          console.log(response);
          EDIT_CLUB_PROFILE_STORE.setClubImage(response.uri);
          EDIT_CLUB_PROFILE_STORE.setImage(response);
          setLoading(false);
        })
        .catch(err => {
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
          console.log(err);
          toast.show('Image not supported', {type: 'warning'});
          setLoading(false);

          return;
        });
    } catch (err) {
      if (DocumentPicker.isCancel()) console.log(err);
      else throw err;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        {loading ? (
          <ActivityIndicator
            style={styles.imageView}
            color={colors.Accent}
            size={'large'}
          />
        ) : (
          <Image
            source={{
              uri: EDIT_CLUB_PROFILE_STORE.getClubImage
                ? EDIT_CLUB_PROFILE_STORE.getClubImage
                : NO_IMAGE_URL,
            }}
            style={styles.image}
          />
        )}
        <TouchableOpacity style={styles.edit} onPress={selectImage}>
          <Avatar.Icon
            icon="lead-pencil"
            size={35}
            color="white"
            style={{backgroundColor: colors.Accent, elevation: 5}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageView: {
    marginTop: '3@vs',
    elevation: 1,
    height: WIDTH / 1.75,
    width: WIDTH / 1.75,
    borderRadius: (WIDTH / 1.75) * 2,
  },
  image: {
    height: WIDTH / 1.75,
    width: WIDTH / 1.75,
    borderRadius: (WIDTH / 1.75) * 2,
  },
  edit: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: WIDTH / 2.8,
  },
});

export default EditProfilePicture;