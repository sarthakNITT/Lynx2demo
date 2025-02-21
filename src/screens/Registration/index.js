import {observer} from 'mobx-react';
import React, {useRef, useState, useEffect} from 'react';
import {BackHandler} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import ErrorScreen from '../../components/ErrorScreen';
import LoaderPage from '../../components/LoadingScreen';
import SuccessScreen from '../../components/SuccessScreen';
import {DEPARTMENT_STORE} from '../../mobx/DEPARTMENT_STORE';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {ACCENT_LOTTIE, EXTERNAL_LOTTIE} from '../../utils/LOADING_TYPES';
import {REFRESH_TOKEN, USER_TOKEN, USER_TYPE} from '../../utils/STORAGE_KEYS';
import {STUDENT} from '../../utils/USER_TYPE';
import DOB from './DOB';
import {getDepartmentAPI} from './getDepartmentAPI';
import LoginWebmailScreen from './LoginWebmail';
import Name from './Name';
import OTPScreen from './OTP';
import ProfilePic from './ProfilePic';
 import ResetPassword from './ResetPassword';
import {studentRegisterAPI} from './studentRegisterAPI';
// import PagerView from 'react-native-pager-view';
import { reg_token } from '../../utils/API_CONSTANTS';

const Registration = observer(({navigation}) => {
  const [Page, setPage] = useState(0);

  // const ref = useRef(PagerView);
  const buttonForwardAction = () => {
    ref.current.setPage(Page + 1);
  };
  const buttonBackwardAction = () => {
    ref.current.setPage(Page - 1);
  };

  const handleAPICALL = () => {
    // setErrorText(null);
    const formData = new FormData();
    formData.append(
      'first_name',
      STUDENT_REGISTRATION_STORE.getFirstName.trim(),
    );
    formData.append('last_name', STUDENT_REGISTRATION_STORE.getLastName.trim());
    formData.append(
      'department',
      STUDENT_REGISTRATION_STORE.getDepartment.trim(),
    );
    formData.append(
      'new_password',
      STUDENT_REGISTRATION_STORE.getPassword.trim(),
    );
    formData.append(
      'confirm_password',
      STUDENT_REGISTRATION_STORE.getConfirmPassword.trim(),
    );
    formData.append('dob', '' + STUDENT_REGISTRATION_STORE.getBirthDay);
    formData.append('address', STUDENT_REGISTRATION_STORE.getAddress.trim());
    formData.append('aadhar_no', STUDENT_REGISTRATION_STORE.getAadhar.trim());
    console.log('Profile picture:  ', STUDENT_REGISTRATION_STORE.getPicture);
    if (STUDENT_REGISTRATION_STORE.getPicture)
      formData.append('profileImg', {
        uri: STUDENT_REGISTRATION_STORE.getPicture.uri,
        type: STUDENT_REGISTRATION_STORE.getPicture.type,
        name: STUDENT_REGISTRATION_STORE.getPicture.name,
      });

    formData.append('reg_token', "1");
    formData.append(
      'countryCode',
      '+' + STUDENT_REGISTRATION_STORE.getCountryCode,
    );
    formData.append(
      'mobile_no',
      STUDENT_REGISTRATION_STORE.getMobileNumber.trim(),
    );
    formData.append('gender', STUDENT_REGISTRATION_STORE.getGender.trim());
    formData.append(
      'nationality',
      STUDENT_REGISTRATION_STORE.getNationality.trim(),
    );
    formData.append(
      'department_id',
      STUDENT_REGISTRATION_STORE.getDepartmentId
    );
    formData[reg_token]="abc";
    studentRegisterAPI(formData);
  };

  //disabling back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);


  return (
    <>
      {STUDENT_REGISTRATION_STORE.getApiCall ||
      DEPARTMENT_STORE.getLoading === true ? (
        <LoaderPage
          LoadingAccent={ACCENT_LOTTIE}
          LoaderLottieType={EXTERNAL_LOTTIE}
        />
        
      ) : (
        <>
          {DEPARTMENT_STORE.getError === true ? (
            <ErrorScreen
              errorMessage={DEPARTMENT_STORE.getErrorText}
              fn={() => {
                if (DEPARTMENT_STORE.getErrorText === NO_NETWORK) {
                  getDepartmentAPI();
                } else {
                  DEPARTMENT_STORE.setErrorText('');
                  DEPARTMENT_STORE.setError(false);
                }
              }}
            />
          ) : (
            <>
              {STUDENT_REGISTRATION_STORE.getApiError ? (
                <ErrorScreen
                  errorMessage={STUDENT_REGISTRATION_STORE.getApiErrorText}
                  fn={() => {
                    if (
                      STUDENT_REGISTRATION_STORE.getApiErrorText === NO_NETWORK
                    ) {
                      handleAPICALL();
                    } else {
                      STUDENT_REGISTRATION_STORE.setApiCall(false);
                      STUDENT_REGISTRATION_STORE.setApiErrorText('');
                      STUDENT_REGISTRATION_STORE.setApiError(false);
                    }
                    //to avoid going to LoginWebmail
                  }}
                />
              ) : (
                <>
                  {STUDENT_REGISTRATION_STORE.getApiSuccess ? (
                    <SuccessScreen
                      buttonText={'NEXT'}
                      showRightIconInButton={true}
                      automatic={false}
                      fn={async () => {
                        USER_STORE.setUserType(STUDENT);
                        await EncryptedStorage.setItem(
                          USER_TOKEN,
                          STUDENT_REGISTRATION_STORE.getApiResponse.data.token,
                        );

                        await EncryptedStorage.setItem(USER_TYPE, STUDENT);
                        await EncryptedStorage.setItem(
                          REFRESH_TOKEN,
                          STUDENT_REGISTRATION_STORE.getApiResponse.data
                            .refreshToken,
                        );

                        USER_STORE.setRefreshToken(
                          STUDENT_REGISTRATION_STORE.getApiResponse.data
                            .refreshToken,
                        );
                        //stored items should be string
                        USER_STORE.setUserToken(
                          STUDENT_REGISTRATION_STORE.getApiResponse.data.token,
                        );
                        DEPARTMENT_STORE.reset();
                        STUDENT_REGISTRATION_STORE.reset();
                        USER_STORE.setUserRegToken(null);
                      }}
                    />
                  ) : (
                    <>
                      {/* <PagerView
                        style={{flex: 1}}
                        initialPage={Page}
                        scrollEnabled={false}
                        showPageIndicator={false}
                        ref={ref}
                        onPageSelected={event => {
                          setPage(event.nativeEvent.position);
                        }}>
                        <LoginWebmailScreen
                          navigation={navigation}
                          forwardAction={buttonForwardAction}
                        />
                        <OTPScreen
                          forwardAction={buttonForwardAction}
                          backwardAction={buttonBackwardAction}
                        />
                        <Name
                          forwardAction={buttonForwardAction}
                          backwardAction={buttonBackwardAction}
                        />
                        <DOB
                          forwardAction={buttonForwardAction}
                          backwardAction={buttonBackwardAction}
                        />

                        <ProfilePic
                          forwardAction={buttonForwardAction}
                          backwardAction={buttonBackwardAction}
                        />
                        <ResetPassword
                          backwardAction={buttonBackwardAction}
                          handleAPICALL={handleAPICALL}
                        />
                      </PagerView> */}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );

});
export default Registration;
