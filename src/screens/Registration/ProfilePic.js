import { observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from '@react-native-documents/picker'
import { Avatar } from 'react-native-paper';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useToast } from 'react-native-toast-notifications';
import Text from '../../components/TextComponent';
import { STUDENT_REGISTRATION_STORE } from '../../mobx/STUDENT_REGISTRATION_STORE';
import { NO_IMAGE_URL } from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import { validFileSize } from '../../utils/helperFunction/FormValidation';
import { MAX_STUDENT_PROFILE_PIC } from '../../utils/UI_CONSTANTS';
import BackButton from './backButton';
import NextButton from './nextButton';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProfilePic = observer(({ forwardAction, backwardAction }) => {
  const toast = useToast();
  const [URI, setURI] = useState(NO_IMAGE_URL);
  const scroll = () => {
    forwardAction();
  };

  const back = () => {
    backwardAction();
  };

  const selectFile = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log("File selected:", file); // Log the selected file to check its details

      // Ensure file size validation
      if (!validFileSize(file.size, MAX_STUDENT_PROFILE_PIC)) {
        toast.show(
          `Maximum allowed file size is ${MAX_STUDENT_PROFILE_PIC} MB`,
          { type: 'danger' },
        );
        return;
      }

      // Store in MobX and update local URI
      STUDENT_REGISTRATION_STORE.setPicture(file);
      setURI(file.uri); // Use the `uri` property instead of `fileCopyUri`

      console.log("File URI after selection:", file.uri); // Log the URI
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled selection");
      } else {
        console.error("Error selecting file:", err);
      }
    }
  };

  // Sync URI with MobX store to ensure the image is updated properly
  useEffect(() => {
    const picture = STUDENT_REGISTRATION_STORE.getPicture;
    if (picture?.uri) {
      setURI(picture.uri); // Use the `uri` property here
    }
  }, [STUDENT_REGISTRATION_STORE.getPicture?.uri]);

  return (
    <>
      {Platform.OS === 'ios' ? (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            onScroll={() => {
              Keyboard.dismiss();
            }}
            scrollEventThrottle={10}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Registration</Text>
            <Text style={styles.title}>{'Profile Picture'}</Text>
            <Text style={styles.subtitle}>
              {'Upload your profile photo. This photo will be used by NIT Trichy for official purposes.'}
            </Text>
            <View style={styles.imageView}>
              <Image
                source={{
                  uri: URI ? URI : NO_IMAGE_URL, // Ensure the URI is correctly used
                }}
                style={styles.image}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.edit}
                onPress={selectFile}>
                <Avatar.Icon
                  icon="lead-pencil"
                  size={35}
                  color="white"
                  style={{ backgroundColor: colors.Accent, elevation: 5 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.optional}>
              <Text
                style={{
                  fontSize: scale(12),
                  color: colors.GRAY_DARK,
                  fontWeight: '300',
                  paddingTop: verticalScale(18),
                  textTransform: 'uppercase',
                }}>
                Optional
              </Text>
              <Text
                style={{
                  fontSize: scale(12),
                  color: colors.GRAY_DARK,
                  textTransform: 'uppercase',
                  fontWeight: '300',
                }}>
                Can be changed later
              </Text>
            </View>
          </ScrollView>
          <NextButton handler={scroll} />
          <BackButton handler={back} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Registration</Text>
          <Text style={styles.title}>{'Profile Picture'}</Text>
          <Text style={styles.subtitle}>
            {'Upload your profile photo. This photo will be used by NIT Trichy for official purposes.'}
          </Text>
          <View style={styles.imageView}>
            <Image
              source={{
                uri: URI ? URI : NO_IMAGE_URL, // Ensure URI is valid
              }}
              style={styles.image}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.edit}
              onPress={selectFile}>
              <Avatar.Icon
                icon="lead-pencil"
                size={35}
                color="white"
                style={{
                  backgroundColor: colors.Accent,
                  elevation: 5,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: scale(12),
              color: colors.GRAY_DARK,
              fontWeight: '300',
              paddingTop: verticalScale(18),
              textTransform: 'uppercase',
            }}>
            Optional
          </Text>
          <Text
            style={{
              fontSize: scale(12),
              alignSelf: 'center',
              color: colors.GRAY_DARK,
              textTransform: 'uppercase',
              fontWeight: '300',
            }}>
            Can be changed later
          </Text>
          <NextButton handler={scroll} />
          <BackButton handler={back} />
        </View>
      )}
    </>
  );
});

const styles = ScaledSheet.create({
  container: {
    width: WIDTH,
    ...Platform.select({
      ios: {
        height: HEIGHT - 80,
      },
      android: {
        height: HEIGHT,
      },
    }),
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  imageView: {
    marginTop: '10@vs',
    elevation: 1,
    height: WIDTH / 1.75,
    width: WIDTH / 1.75,
    borderRadius: (WIDTH / 1.75) * 2,
    alignSelf: 'center',
  },
  image: {
    height: WIDTH / 1.75,
    width: WIDTH / 1.75,
    borderRadius: (WIDTH / 1.75) * 2,
    backgroundColor: colors.GRAY_MEDIUM,
  },
  edit: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: WIDTH / 2.8,
  },
  title: {
    fontSize: '18@s',
    color: '#000000',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '10@vs',
  },
  subtitle: {
    fontSize: '12@s',
    color: '#555555',
    marginTop: '5@vs',
    textAlign: 'center',
  },
  header: {
    fontSize: '18@s',
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '40@vs',
  },
  scrollView: {
    width: '100%',
    backgroundColor: colors.regBackground,
  },
  optional: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfilePic;
