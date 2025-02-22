import NetInfo from '@react-native-community/netinfo';

import axios from 'axios';
import {observer} from 'mobx-react';
import React, {useState, useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  Linking,
} from 'react-native';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomAlert from '../../components/customAlert';
import Text from '../../components/TextComponent';
import {PreventDoubleClickWithOpacity as TouchableOpacity} from '../../components/TouchableOpacity';
import {API_STORE} from '../../mobx/API_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';
import {API_SEND_OTP, RECAPTCHA_SITE_KEY} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import {containOnlyNumbers} from '../../utils/helperFunction/FormValidation';

import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import Recaptcha from 'react-native-recaptcha-that-works';
import NotFoundErrorScreen from '../../components/NotFound';

const WIDTH = Dimensions.get('window').width;
//scaling
const height2 = 737.1;
const screenHeight = Dimensions.get('window').height - getStatusBarHeight(true);
export function getHeight(height) {
  return Math.floor((height * screenHeight) / height2);
}

const LoginWebmailScreen = observer(({navigation, forwardAction}) => {
  const toast = useToast();

  const [user, setUser] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [notFount, setNotFount] = useState(false);

  const recaptcha = useRef();

  const send = () => {
    if (!containOnlyNumbers(user) || user.length < 9 || user.length > 9) {
      toast.show('Enter a valid Roll Number', {type: 'warning'});
      return;
    }
    console.log("its from send ()");
    recaptcha.current.open();
    console.log("3");
    //setNotFount(true); // Moved this inside the onLogin function after the response

  };

  const onVerify = token => {
    console.log(token);

    onLogin(token);
  };

  const onExpire = () => {
    toast.show('Unexpected error occurred');
    return;
  };

  const onLogin = async recaptchaToken => {
    setLoading(true);

    //checking if user is purely numbers
    if (!containOnlyNumbers(user) || user.length < 9 || user.length > 9) {
      toast.show('Enter a valid Roll Number', {type: 'warning'});
      return;
    }

    let rollNo = user;
    console.log('roLLno+' + rollNo);

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
        USER_STORE.setUserRollNumber(rollNo);
        console.log(resp.data.message);
        if (resp.data.otpExists == true) {
          toast.show(`Verification code already sent to\n${user}@nitt.edu`, {
            type: 'success',
          });
        } else {
          toast.show(`Verification code sent to\n${user}@nitt.edu`, {
            type: 'success',
          });
        }

        RESET_STORE.setIsStudent(false);
        RESET_STORE.setResendButton(false);
        RESET_STORE.setSecondsRemaining(600);
        RESET_STORE.setTimerStatus('Started');

        setLoading(false);
        forwardAction();
      } else {
        if (resp.data) {
          console.log(resp.data.message);
        }
      }
    } catch (error) {
      console.log( "main error",JSON.stringify(error));
      if (error.response) {
        if (error.response.status == 404) {
          console.log("its from catch message");
          console.log("4");
          setNotFount(true);
          setLoading(false);
          return;
        }
        toast.show(error.response.data.message, {type: 'warning'});
      } else if (error.request) {
        toast.show(SERVER_ERROR, {type: 'warning'});
      } else {
        toast.show(UNEXPECTED_ERROR, {type: 'warning'});
      }
      setModalVisible(true);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
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
        //style={{ backgroundColor: 'white' }}
      />
      {notFount ? (
        <WebmailNotFoundScreen
          RollNumber={user}
          close={() => {
            setNotFount(false); // Set notFound to false when the user closes the screen
          }}
        />
      ) : (
        <View style={styles.container}>
          <SafeAreaView>
            <CustomAlert
              title={'Error'}
              message={modalText}
              startDate={''}
              endDate={''}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              buttons={[
                {
                  text: 'Okay',
                  func: async () => {
                    return;
                  },
                },
              ]}
            />
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={styles.headerTextContainer}>
                <Text style={styles.loginText}>Sign Up</Text>
              </View>

              <View style={{marginBottom: verticalScale(55)}}>
                <View style={styles.textInput}>
                  <TextInput
                    label="Roll Number"
                    placeholder="Enter your Roll Number"
                    mode="outlined"
                    value={user}
                    maxLength={9}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    style={{backgroundColor: 'white'}}
                    theme={{
                      colors: {
                        primary: 'black',
                      },
                    }}
                    selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                    onChangeText={user => {
                      setUser(user);
                    }}
                  />
                </View>
                <View style={styles.textInput}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.pop();
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: scale(14),
                        color: '#000000',
                        marginTop: verticalScale(0),
                      }}>
                      <Text>Already have an account?</Text>

                      <Text
                        style={{
                          color: colors.Contrary,
                          fontWeight: 'bold',
                        }}>
                        {' '}
                        Login
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                {Loading ? (
                  <>
                    <View style={styles.loginBtnView}>
                      <ActivityIndicator
                        size={'large'}
                        color={colors.Tertiary}
                      />
                    </View>
                  </>
                ) : (
                  <View style={styles.loginBtnView}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.Tertiary,
                        borderRadius: verticalScale(22),
                      }}
                      onPress={() => {
                        console.log("7");
                        //setNotFount(true);
                        send();
                      }}>
                      <Icon
                        name="chevron-right"
                        size={verticalScale(44)}
                        color={colors.WHITE}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
});

// 
const WebmailNotFoundScreen = ({ close, RollNumber }) => {
  return (
    <NotFoundErrorScreen
      lottieFileName="notFound"
      fn={() => {
        close(true);
      }}
      RollNumber={RollNumber}
      errorMessage={
        <Text style={styles.errorMessage}>
          We don't have your roll number in our records please check the entered roll number
        </Text>
      }
      errorMessage2={
        <Text style={styles.errorMessage}>
          If you still feel that the entered roll number is legitimate, kindly contact{' '}
          <Text
            style={[styles.emailStyle]} // Apply your custom style here
            onPress={() => {
              const email = 'support@spider-nitt.org';
              Linking.openURL('mailto:' + email);
            }}
          >
            support@spider-nitt.org
          </Text>
        </Text>
      }
    />
  );
};
const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  errorMessage: {
    color: 'black',
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: '20@vs',
    justifyContent: 'space-between',
    marginHorizontal: '15@s',
    color: 'black',
    marginRight: '15@s',
  },
  emailStyle: {
    color: '#007BFF', // Change to your desired color (e.g., blue)
    textDecorationLine: 'underline', // Optional: adds underline for links
  },
  loginText: {
    padding: '10@msr',
    fontSize: '25@s',
    fontWeight: 'bold',
    color: 'black',
    marginLeft: '0@s',
  },
  textInput: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    color: 'black',
  },
  loginBtnView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',color: 'black',

    paddingHorizontal: moderateScale(20),
  },
});

export default LoginWebmailScreen;
