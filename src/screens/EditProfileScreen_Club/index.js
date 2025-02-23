import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, View, Keyboard, Platform} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import CustomAlert from '../../components/customAlert';
import ErrorScreen from '../../components/ErrorScreen';
import LoaderPage from '../../components/LoadingScreen';
import SuccessScreen from '../../components/SuccessScreen';
import {API_STORE} from '../../mobx/API_STORE';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {CLUB_USER_STORE} from '../../mobx/CLUB_USER_STORE';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {ACCENT_LOTTIE, EXTERNAL_LOTTIE} from '../../utils/LOADING_TYPES';
import {getClubDetails} from '../UserScreen/apiCalls';
import EditClubLinks from './EditClubLinks';
//import EditDescription from './EditDescription';
import {EditProfileClubAPI} from './EditProfileClubAPI';
import EditProfilePicture from './EditProfilePicture';
import ScreenHeader from './ScreenHeader';

const EditClubProfileScreen = observer(({navigation}) => {
  const handleAPICALL = () => {
    EDIT_CLUB_PROFILE_STORE.setErrorText(null);
    const form = new FormData();

    if (
      EDIT_CLUB_PROFILE_STORE.getImage &&
      Object.keys(EDIT_CLUB_PROFILE_STORE.getImage).length !== 0
    ) {
      form.append('profilePic', {
        uri: EDIT_CLUB_PROFILE_STORE.getImage.uri,
        type: 'image/jpeg',
        name: EDIT_CLUB_PROFILE_STORE.getImage.name,
      });
    }

    form.append(
      'description',
      EDIT_CLUB_PROFILE_STORE.getClubDescription.trim(),
    );

    form.append(
      'links[website]',
      EDIT_CLUB_PROFILE_STORE.getWebsiteLink.trim(),
    );

    form.append(
      'links[linkedin]',
      EDIT_CLUB_PROFILE_STORE.getLinkedInLink.trim(),
    );

    form.append(
      'links[youtube]',
      EDIT_CLUB_PROFILE_STORE.getYoutubeLink.trim(),
    );

    form.append(
      'links[instagram]',
      EDIT_CLUB_PROFILE_STORE.getInstagramLink.trim(),
    );

    form.append('links[medium]', EDIT_CLUB_PROFILE_STORE.getMediumLink.trim());

    form.append(
      'links[facebook]',
      EDIT_CLUB_PROFILE_STORE.getFacebookLink.trim(),
    );

    EditProfileClubAPI(form);
  };

  const populateData = () => {
    EDIT_CLUB_PROFILE_STORE.reset();
    const clubDetails = CLUB_USER_STORE.getClubDetail;
    EDIT_CLUB_PROFILE_STORE.setClubDescription(clubDetails.description);
    EDIT_CLUB_PROFILE_STORE.setClubImage(
      API_STORE.getCDN + clubDetails.profile_pic,
    );
    EDIT_CLUB_PROFILE_STORE.setInstagramLink(clubDetails.links.instagram);
    EDIT_CLUB_PROFILE_STORE.setWebsiteLink(clubDetails.links.website);
    EDIT_CLUB_PROFILE_STORE.setFacebookLink(clubDetails.links.facebook);
    EDIT_CLUB_PROFILE_STORE.setLinkedInLink(clubDetails.links.linkedin);
    EDIT_CLUB_PROFILE_STORE.setYoutubeLink(clubDetails.links.youtube);
    EDIT_CLUB_PROFILE_STORE.setMediumLink(clubDetails.links.medium);
  };
  const onBackPress = () => {
    setModalTitle('Confirmation');
    setModalMessage('Are you sure you want to discard unsaved changes?');
    setModalButtons([
      {
        text: 'DISCARD',
        func: () => {
          navigation.goBack();
        },
      },
      {
        text: 'KEEP EDITING',
        func: () => console.log('OK Pressed'),
      },
    ]);
    setModalVisible(true);
    return true;
  };
  const [modalTitle, setModalTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState({});
  useEffect(() => {
    populateData();
    BOTTOM_NAV_STORE.setTabVisibility(false);

    const backPress = BackHandler.addEventListener('backPress', onBackPress);

    return () => {
      backPress.remove();
    };
  }, []);
  return (
    <>
      {EDIT_CLUB_PROFILE_STORE.getLoading ? (
        <LoaderPage
          LoadingAccent={ACCENT_LOTTIE}
          LoaderLottieType={EXTERNAL_LOTTIE}
        />
      ) : (
        <>
          {EDIT_CLUB_PROFILE_STORE.getError ? (
            <ErrorScreen
              showIconInButton={false}
              errorMessage={EDIT_CLUB_PROFILE_STORE.getErrorText}
              fn={() => {
                EDIT_CLUB_PROFILE_STORE.setErrorText('');
                EDIT_CLUB_PROFILE_STORE.setError(false);
                if (EDIT_CLUB_PROFILE_STORE.getErrorText === NO_NETWORK) {
                  handleAPICALL();
                }
              }}
            />
          ) : (
            <>
              {EDIT_CLUB_PROFILE_STORE.getSuccess ? (
                <SuccessScreen
                  buttonText={'BACK'}
                  showLeftIconInButton={true}
                  fn={() => {
                    CLUB_USER_STORE.setRefresh(true);
                    getClubDetails(true);
                    EDIT_CLUB_PROFILE_STORE.reset();

                    navigation.pop();
                  }}
                />
              ) : (
                <>
                  <CustomAlert
                    title={modalTitle}
                    message={modalMessage}
                    startDate={''}
                    endDate={''}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    buttons={modalButtons}
                  />
                  <ScreenHeader
                    navigation={navigation}
                    handleAPICALL={handleAPICALL}
                    setModalVisible={setModalVisible}
                    setModalButtons={setModalButtons}
                    setModalMessage={setModalMessage}
                    setModalTitle={setModalTitle}
                    onBackPress={onBackPress}
                  />
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <EditProfilePicture />
                    {/* <EditDescription /> */}
                    <EditClubLinks />
                    <View style={{height: verticalScale(20)}} />
                  </ScrollView>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

export default EditClubProfileScreen;