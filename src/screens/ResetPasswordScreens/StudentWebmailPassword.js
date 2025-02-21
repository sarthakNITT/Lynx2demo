// import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from '../../components/TextComponent';
import {API_STORE} from '../../mobx/API_STORE';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import {API_RESET_PASSWORD_VALIDATE_STUDENT} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {
  NO_NETWORK,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';

const StudentWebmailPassword = ({forwardAction, backwardAction}) => {
  const toast = useToast();

  const [password, setPass] = useState();
  const [Loading, setLoading] = useState(false);
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);

  const setPassword = () => {
    RESET_STORE.setStudentPassword(password);
  };

  const validateStudentLogin = () => {
    setLoading(true);

    // NetInfo.fetch().then(state => {
    //   if (state.isConnected == true) {
    //     if (
    //       RESET_STORE.getStudentPassword != '' &&
    //       RESET_STORE.getUsername != ''
    //     ) {
    //       const studentRoll = RESET_STORE.getUsername;
    //       studentPassword = RESET_STORE.getStudentPassword;
    //       const axiosHeaders = {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       };
    //       const body = JSON.stringify({
    //         rollNo: studentRoll,
    //         webmail_password: studentPassword,
    //       });

    //       axios
    //         .post(
    //           API_STORE.getBaseUrl + API_RESET_PASSWORD_VALIDATE_STUDENT,
    //           body,
    //           axiosHeaders,
    //         )
    //         .then(response => {
    //           console.log(331);
    //           console.log(response.status);
    //           if (response.status === 200) {
    //             RESET_STORE.setStudentToken(response.data.token);
    //             console.log('webmail verified successfully');
    //             setLoading(false);
    //             forwardAction();
    //           }
    //           // console.log(RESET_STORE.getStudentToken);
    //         })
    //         .catch(error => {
    //           if (error.response) {
    //             toast.show(error.response.data.message, {type: 'danger'});
    //           } else if (error.request) {
    //             // The request was made but no response was received
    //             // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //             // http.ClientRequest in node.js
    //             toast.show(SERVER_ERROR, {type: 'danger'});
    //           } else {
    //             // Something happened in setting up the request that triggered an Error
    //             toast.show(UNEXPECTED_ERROR, {type: 'danger'});
    //           }
    //           setLoading(false);
    //         });
    //     }
    //   } else {
    //     toast.show(NO_NETWORK, {type: 'danger'});
    //     setLoading(false);
    //   }
    // });
  };

  return (
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
          Enter your webmail password
        </Text>

        <TextInput
          label="Password"
          placeholder="Enter your webmail password"
          autoCapitalize="none"
          mode="outlined"
          style={{backgroundColor: 'white', paddingTop: verticalScale(9)}}
          theme={{
            colors: {
              primary: 'black',
            },
          }}
          secureTextEntry={passwordToggle}
          right={
            <TextInput.Icon
              name={eyeIcon}
              onPress={() => {
                setPasswordToggle(!passwordToggle);
                setEyeIcon(eyeIcon === 'eye' ? 'eye-off' : 'eye');
              }}
            />
          }
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={pass => {
            setPass(pass);
          }}
        />

        <View style={styles.loginBtnView}>
          <Button
            icon={'chevron-left'}
            color={colors.Accent}
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
                setPassword();
                validateStudentLogin();
              }}>
              <Icon
                name="chevron-right"
                size={verticalScale(44)}
                color={colors.WHITE}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default StudentWebmailPassword;

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
    color: colors.FontColor,
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
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(0),
    paddingTop: verticalScale(9),
    flexDirection: 'row',
  },
});
