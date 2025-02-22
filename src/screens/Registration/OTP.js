import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {observer} from 'mobx-react';
import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  HelperText,
  TextInput,
} from 'react-native-paper';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ErrorScreen from '../../components/ErrorScreen';
import Text from '../../components/TextComponent';
import {API_STORE} from '../../mobx/API_STORE';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {
  API_SEND_OTP,
  API_VERIFY_OTP,
  RECAPTCHA_SITE_KEY,
} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {
  NO_NETWORK,
  OTP_SENT,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import Timer from './Timer';
import {getDepartmentAPI} from './getDepartmentAPI';
import {FormatSeconds} from '../../utils/helperFunction/formatSeconds';
import Recaptcha from 'react-native-recaptcha-that-works';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';

const OTPScreen = observer(({forwardAction, backwardAction}) => {
  // console.log("text");
  const [OTP, setOTP] = useState(0);
  const toast = useToast();
  const recaptcha = useRef();
  const [errorOTP, setErrorOTP] = useState(false);
  const [Internet, setInternet] = useState(true);
  const [Loading, setLoading] = useState(false);

  const [reload, setReload] = useState(false);
  const scroll = () => {
    forwardAction();
  };
  const send = () => {
    recaptcha.current.open();
  };

  const onVerify = token => {
    resendOtp(token);
    console.log('Resend OTP');
  };

  const onExpire = () => {
    toast.show('Unexpected error occurred');
    return;
  };
  const validateOtp = () => {
    //return;

    setLoading(true);
    if (OTP === 0) {
      setLoading(false);
      toast.show('Enter OTP', {type: 'danger'});
    }
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        setInternet(true);

        const axiosHeaders = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify({
          rollNo: USER_STORE.getUserRollNumber,
          otp: OTP,
        });
        axios
          .post(API_STORE.getBaseUrl + API_VERIFY_OTP, body, axiosHeaders)
          .then(response => {
            setLoading(false);
            console.log("ERRRRORRRR",response.data);
            if (response.data.message === 'Success') {
              
              console.log('Hello + Success to scroll');
              STUDENT_REGISTRATION_STORE.setFirstName(response.data.name);
              USER_STORE.setUserRegToken(response.data.token);
              getDepartmentAPI(toast, setLoading);
              console.log("response",response.data);
              scroll();

            }
          })
          .catch(error => {
            setLoading(false);
            console.log("er" + error);
            toast.show(error.response.data.message, {type: 'danger'});
            setErrorOTP(true);
          });
      } else {
        RESET_STORE.setErrorText(NO_NETWORK);
        RESET_STORE.setError(true);
        setLoading(false);
        setInternet(false);
      }
    });
  };
  const resendOtp = async recaptchaToken => {
    setLoading(true);
    RESET_STORE.setIsStudent(false);
    RESET_STORE.setResendButton(false);
    RESET_STORE.setSecondsRemaining(600);
    RESET_STORE.setTimerStatus('Started');

    //checking if user is purely numbers

    let rollNo = USER_STORE.getUserRollNumber.trim();

    try {
      setLoading(true);
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        toast.show(NO_NETWORK, {type: 'warning'});
        return;
      }

      const reg_token = USER_STORE.getFirebaseToken;
      console.log('reg: ', reg_token);
      const resp = await axios.post(API_STORE.getBaseUrl + API_SEND_OTP, {
        rollNo: rollNo,
        recaptcha: recaptchaToken,
      });

      if (resp.status === 200) {
        setLoading(false);
        USER_STORE.setUserRollNumber(rollNo);
        console.log(resp.data.message + 'SUccess');

        if (resp.data.otpExists == true) {
          toast.show('OTP has been already sent to the webmail', {
            type: 'success',
          });
        } else {
          toast.show(OTP_SENT, {type: 'success'});
        }
      } else {
        if (resp.data) {
          setLoading(false);
          console.log(resp.data.message);
          console.log(resp.data.message + 'f');
        }
      }
    } catch (error) {
      console.log(1);

      console.log(JSON.stringify(error));
      if (error.response) {
        console.log(2);

        toast.show(error.response.data.message, {type: 'warning'});
      } else if (error.request) {
        console.log(3);

        toast.show(SERVER_ERROR, {type: 'warning'});
      } else {
        console.log(4);

        toast.show(UNEXPECTED_ERROR, {type: 'warning'});
      }
      setModalVisible(true);
      setLoading(false);
    }
  };
  const hasErrors = () => {
    return errorOTP;
  };

  useEffect(() => {
    console.log('reload');
    setReload(!reload);
  }, []);

  return (
    <>
      <Recaptcha
        ref={recaptcha}
        siteKey={RECAPTCHA_SITE_KEY}
        baseUrl="http://localhost:3000"
        onVerify={onVerify}
        onExpire={onExpire}
        loadingComponent={
          <ActivityIndicator size={'large'} color={colors.Tertiary} />
        }
        size="normal"
      />
      {!Internet ? (
        <>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}>
            <ErrorScreen
              showIconInButton={false}
              errorMessage={NO_NETWORK}
              fn={() => {
                NetInfo.fetch().then(state => {
                  if (state.isConnected == true) {
                    RESET_STORE.setErrorText('');
                    RESET_STORE.setError(false);
                    setInternet(true);
                  }
                });
              }}
            />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              paddingHorizontal: moderateScale(20),
              backgroundColor: 'white',

              paddingTop: verticalScale(25),

              backgroundColor: 'white',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={{...styles.title, fontSize: scale(14)}}>
              Enter your verification code
            </Text>
            <TextInput
              label="OTP"
              placeholder="Enter your OTP"
              keyboardType="number-pad"
              mode="outlined"
              textColor=""
              style={{
                  backgroundColor: 'white',
                  paddingTop: verticalScale(9),
                  marginTop: verticalScale(20), // Add spacing above this component
              }}
              theme={{
                  colors: {
                    primary: 'black',
                  },
               }}
               selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
               onChangeText={otp => {
               setOTP(parseInt(otp));
               console.log(otp);
                }}
              />
            <HelperText type="error" visible={hasErrors()}>
              Invalid OTP
            </HelperText>
            <View style={styles.loginBtnView}>
              
              <Button
                icon={'chevron-left'}
                color={colors.Accent} 
                //disabled={RESET_STORE.getSecondsRemaining !== 0}
                onPress={() => {
                  console.log("backward");
                   backwardAction();
                }}
                labelStyle={{
                color: 'black',
                }}>
                Back
              </Button>

              {Loading ? (
                <>
                  <ActivityIndicator size={'large'} color={colors.Tertiary} />
                </>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.Tertiary,
                    borderRadius: verticalScale(22),
                  }}
                  onPress={() => {
                    validateOtp();
                  }}>
                  <Icon
                    name="chevron-right"
                    size={verticalScale(44)}
                    color={colors.WHITE}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View>
              {
}
              <Timer />
              {RESET_STORE.getSecondsRemaining !== 0 ? (
                <>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: scale(12.5),
                      marginTop: verticalScale(6),
                    }}>
                    <Text>The resend button</Text>

                    <Text> will be available in</Text>
                    <Text
                      style={{
                        color: 'darkgreen',
                        fontWeight: 'bold',
                        fontSize: scale(14),
                      }}>
                      {'\n'}
                      {FormatSeconds(RESET_STORE.getSecondsRemaining)}
                    </Text>
                  </Text>
                </>
              ) : null}
            </View>
            {/* {resendButton && ( */}
            <View style={styles.otpButton}>
              <Button
                mode="contained"
                loading={RESET_STORE.getSecondsRemaining !== 0}
                disabled={RESET_STORE.getSecondsRemaining !== 0}
                onPress={() => {
                  send();
                }}>
                <Text style={styles.otpText}>Resend OTP</Text>
              </Button>
            </View>
          </View>
        </>
      )}
    </>
  );
});

export default OTPScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  header: {
    fontSize: '18@s',
    color: colors.FontColor,
    fontWeight: 'bold',
    marginTop: '40@vs',
  },
  title: {
    fontSize: '18@s',
    color: '#000000',
    fontWeight: '500',
    marginTop: '10@vs',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '12@s',
    color: '#555555',
    marginTop: '5@vs',
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
  loginBtnView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(0),
    paddingTop: verticalScale(9),
    flexDirection: 'row',
  },
  otpText: {
    fontSize: '12@s',
    color: colors.FontColor,
    fontWeight: '500',
    marginTop: '10@vs',
    textAlign: 'center',
  },
  otpButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(0),
    paddingTop: verticalScale(9),
    flexDirection: 'row',
    marginTop: '10@vs',
  },
});
