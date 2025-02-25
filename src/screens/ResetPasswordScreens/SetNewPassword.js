import NetInfo from '@react-native-community/netinfo';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
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
import {
  API_RESET_PASSWORD_CLUBS,
  API_RESET_PASSWORD_STUDENT,
} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import {
  NO_NETWORK,
  PASSWORD_NO_MATCH,
  PASSWORD_SHORT,
  SERVER_ERROR,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import {PASSWORD_LENGTH} from '../../utils/UI_CONSTANTS';

const SetNewPassword = ({navigation}) => {
  const [newPassword, setNewPass] = useState('');
  const [newConfirmPassword, setNewConfirmPass] = useState('');
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);

  const toast = useToast();

  const changePassword = () => {
    console.log("1");
    if (newPassword.trim().length < PASSWORD_LENGTH) {
      toast.show(PASSWORD_SHORT, {type: 'warning'});
      return;
    }
    if (newPassword !== newConfirmPassword) {
      toast.show(PASSWORD_NO_MATCH, {type: 'warning'});
      return;
    }
    RESET_STORE.setLoading(true);
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        console.log("2");
        // Get the token (assuming it's stored in RESET_STORE)
        const token = RESET_STORE.getClubsToken;

        const body = JSON.stringify({
          new_password: newPassword.trim(),
          new_cpassword: newConfirmPassword.trim(),
        });
        let url = null;
        if (RESET_STORE.getIsStudent) {
          url = API_STORE.getBaseUrl + API_RESET_PASSWORD_STUDENT;
        } else {
          url = API_STORE.getBaseUrl + API_RESET_PASSWORD_CLUBS;
        }

        fetch(url, {
          method: 'POST',
          headers: {
            token: token,
            'Content-Type': 'application/json',
          },
          body: body,
        })
          .then(response => {
            if (response.ok) {
              return response.json().then(data => {
                console.log(data);
                RESET_STORE.setSuccess(true);
                RESET_STORE.setLoading(false);

                //added by sarthak to navigate automatically to login screen after successfully set new password
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                });
              });
            } else {
              return response.json().then(data => {
                RESET_STORE.setErrorText(data.message || SERVER_ERROR);
                RESET_STORE.setError(true);
                RESET_STORE.setLoading(false);
              });
            }
          })
          .catch(error => {
            console.log(error);
            RESET_STORE.setErrorText(SERVER_ERROR);
            RESET_STORE.setError(true);
            RESET_STORE.setLoading(false);
          });
      } else {
        RESET_STORE.setErrorText(NO_NETWORK);
        RESET_STORE.setError(true);
        RESET_STORE.setLoading(false);
      }
    });
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
        <Text style={styles.title}>Set Password</Text>
        <Text style={{...styles.title, fontSize: scale(14)}}>
          Enter your new password
        </Text>

        <TextInput
          autoCapitalize="none"
          label="Password"
          placeholder="Enter your new password"
          mode="outlined"
          style={{
            backgroundColor: 'white',
            paddingTop: verticalScale(9),
          }}
          theme={{
            colors: {
              primary: 'black',
            },
          }}
          secureTextEntry={passwordToggle}
          // Uncomment and adjust the below code if you want to toggle the eye icon:
          // right={
          //   <TextInput.Icon
          //     name={eyeIcon}
          //     onPress={() => {
          //       setPasswordToggle(!passwordToggle);
          //       setEyeIcon(eyeIcon === 'eye' ? 'eye-off' : 'eye');
          //     }}
          //   />
          // }
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={pass => {
            setNewPass(pass);
          }}
        />
        <TextInput
          label="Confirm Password"
          placeholder="Confirm your password"
          mode="outlined"
          style={{
            backgroundColor: 'white',
            paddingTop: verticalScale(9),
          }}
          theme={{
            colors: {
              primary: 'black',
            },
          }}
          secureTextEntry={true}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          autoCapitalize="none"
          onChangeText={pass => {
            setNewConfirmPass(pass);
          }}
        />

        <View style={styles.loginBtnView}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.Tertiary,
              borderRadius: verticalScale(22),
            }}
            onPress={() => {
              changePassword();
            }}>
            <Icon
              name="chevron-right"
              size={verticalScale(44)}
              color={colors.WHITE}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SetNewPassword;

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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(0),
    paddingTop: verticalScale(9),
  },
});
