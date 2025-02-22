import { API_STORE } from '../../mobx/API_STORE';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {observer} from 'mobx-react';
import React, {useState, useRef} from 'react';
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
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import {
  API_RESET_PASSWORD_VALIDATE_OTP_CLUBS,
  API_RESET_PASSWORD_VALIDATE_OTP_STUDENTS,
  RECAPTCHA_SITE_KEY,
} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {NO_NETWORK} from '../../utils/ERROR_MESSAGES';
import {FormatSeconds} from '../../utils/helperFunction/formatSeconds';
import Timer from './Timer';
import {sendClubOTP, sendStudentOTP} from './sendOTPApi';
import Recaptcha from 'react-native-recaptcha-that-works';

const ClubEnterOTP = observer(({forwardAction, backwardAction}) => {
  const [OTP, setOTP] = useState(0);
  const toast = useToast();
  const recaptcha = useRef();
  const [errorOTP, setErrorOTP] = useState(false);
  const [Internet, setInternet] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const send = () => {
    recaptcha.current.open();
  };

  const onVerify = token => {
    if (RESET_STORE.getIsStudent) {
      sendStudentOTP(token).then(resp => {
        console.log('resp: ', resp);
        if (resp.status) toast.show(resp.message, {type: 'success'});
        else toast.show(resp.message, {type: 'danger'});
        if (resp.status) {
          RESET_STORE.setResendButton(false);
          RESET_STORE.setSecondsRemaining(600);
          RESET_STORE.setTimerStatus('Started');
          setReload(!reload);
        }
      });
    } else {
      sendClubOTP(token).then(resp => {
        console.log('resp: ', resp);
        if (resp.status) toast.show(resp.message, {type: 'success'});
        else toast.show(resp.message, {type: 'danger'});
        if (resp.status) {
          RESET_STORE.setResendButton(false);
          RESET_STORE.setSecondsRemaining(600);
          RESET_STORE.setTimerStatus('Started');
          setReload(!reload);
        }
      });
    }
  };

  const onExpire = () => {
    toast.show('Unexpected error occurred');
    return;
  };

  const validateOtp = () => {
    setLoading(true);
    const VALIDATE_URL = RESET_STORE.getIsStudent
      ? API_RESET_PASSWORD_VALIDATE_OTP_STUDENTS
      : API_RESET_PASSWORD_VALIDATE_OTP_CLUBS;
    // if (OTP === 0) {
    //   setLoading(false);
    //   toast.show('Enter OTP', {type: 'danger'});
    // }
    if (OTP === 0) {
      setLoading(false);
      toast.show('Enter OTP', {type: 'danger'});
      return; // add this return statement
    }    
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        setInternet(true);

        const userEmail = RESET_STORE.getUsername.trim();

        const axiosHeaders = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify({
          otp: OTP,
          email: userEmail,
          rollNo: userEmail,
        });

        axios
          .post(API_STORE.getBaseUrl + VALIDATE_URL, body, axiosHeaders)
          .then(response => {
            setLoading(false);
            if (response.status === 200) {
              RESET_STORE.setClubsToken(response.data.token);
              forwardAction();
            }
          })
          .catch(error => {
            setLoading(false);
            console.log(error);
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

  const hasErrors = () => {
    return errorOTP;
  };

  return (
    <>
      <Recaptcha
        ref={recaptcha}
        siteKey={RECAPTCHA_SITE_KEY}
        baseUrl="http://nittapp.spider-nitt.org"
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
              flex: 1,
              paddingTop: verticalScale(25),
            }}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={{...styles.title, fontSize: scale(14)}}>
              Enter your verification code
            </Text>
            <TextInput
              label="OTP"
              placeholder="Enter your OTP"
              keyboardType="number-pad"
              mode="outlined"
              style={{backgroundColor: 'white', paddingTop: verticalScale(9)}}
              theme={{
                colors: {
                  primary: 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              onChangeText={otp => {
                setOTP(parseInt(otp));
              }}
            />
            <HelperText type="error" visible={hasErrors()}>
              Invalid OTP
            </HelperText>
            <View style={styles.loginBtnView}>
              <Button
                icon={'chevron-left'}
                color={colors.Accent}
                disabled={RESET_STORE.getSecondsRemaining !== 0}
                onPress={() => {
                  backwardAction();
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

export default ClubEnterOTP;

const styles = ScaledSheet.create({
  header: {
    fontSize: '18@s',
    color: colors.FontColor,
    fontWeight: 'bold',
    marginTop: '40@vs',
  },
  title: {
    fontSize: '18@s',
    color: colors.FontColor,
    fontWeight: '500',
    marginTop: '10@vs',
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
