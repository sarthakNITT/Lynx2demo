import React, {useState, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, HelperText, TextInput} from 'react-native-paper';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from '../../components/TextComponent';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import {RECAPTCHA_SITE_KEY} from '../../utils/API_CONSTANTS';
import * as colors from '../../utils/colors';
import Recaptcha from 'react-native-recaptcha-that-works';
import {containOnlyNumbers} from '../../utils/helperFunction/FormValidation';
import {sendClubOTP, sendStudentOTP} from './sendOTPApi';

const Username = ({forward, navigation}) => {
  const [error, setError] = useState('');
  const [Loading, setLoading] = useState(false);
  const toast = useToast();

  const recaptcha = useRef();

  const send = () => {
    if (RESET_STORE.getUsername.trim() === '') {
      toast.show('Enter your username', {type: 'warning'});
      return;
    }
    if (
      RESET_STORE.getUsername != '' &&
      RESET_STORE.getUsername.match(/^[0-9]+$/) == null
    ) {
      //if not purely numbers then check if '@' is present (of form a@b where len a/b >=1)
      if (
        !RESET_STORE.getUsername
          .slice(
            RESET_STORE.getUsername.slice(
              1,
              RESET_STORE.getUsername.length - 1,
            ),
          )
          .includes('@')
      ) {
        console.log('error');
        setError('Not a valid Username');
        return;
      }
    } else {
      if (
        !containOnlyNumbers(RESET_STORE.getUsername.trim()) ||
        RESET_STORE.getUsername.trim().length < 9 ||
        RESET_STORE.getUsername.trim().length > 9
      ) {
        toast.show('Enter a valid Roll Number', {type: 'warning'});
        return;
      }
    }
    recaptcha.current.open();
  };

  const onVerify = token => {
    forwardAction(token);
  };

  const onExpire = () => {
    toast.show('Unexpected error occurred');
    return;
  };
  const hasErrors = () => {
    if (error == '') {
      return false;
    } else {
      return true;
    }
  };

  const forwardAction = recaptchaToken => {
    if (RESET_STORE.getUsername.trim() === '') {
      toast.show('Enter your username', {type: 'warning'});
      return;
    }

    if (
      RESET_STORE.getUsername != '' &&
      RESET_STORE.getUsername.match(/^[0-9]+$/) == null
    ) {
      //if not purely numbers then check if '@' is present (of form a@b where len a/b >=1)
      if (
        !RESET_STORE.getUsername
          .slice(
            RESET_STORE.getUsername.slice(
              1,
              RESET_STORE.getUsername.length - 1,
            ),
          )
          .includes('@')
      ) {
        console.log('error');
        setError('Not a valid Username');
        return;
      }
      setLoading(true);
      sendClubOTP(recaptchaToken).then(rep => {
        console.log('resp: ', rep);
        console.log('resp: ', rep.status);

        if (rep.status) toast.show(rep.message, {type: 'success'});
        else toast.show(rep.message, {type: 'danger'});
        setLoading(false);

        if (rep.status) {
          RESET_STORE.setIsStudent(false);
          RESET_STORE.setResendButton(false);
          RESET_STORE.setSecondsRemaining(600);
          RESET_STORE.setTimerStatus('Started');
          forward();
        }
      });
    } else {
      setLoading(true);

      sendStudentOTP(recaptchaToken).then(rep => {
        console.log('resp: ', rep);
        console.log('resp: ', rep.status);

        if (rep.status) toast.show(rep.message, {type: 'success'});
        else toast.show(rep.message, {type: 'danger'});
        setLoading(false);

        if (rep.status) {
          RESET_STORE.setIsStudent(true);
          RESET_STORE.setResendButton(false);
          RESET_STORE.setSecondsRemaining(600);
          RESET_STORE.setTimerStatus('Started');
          forward();
        }
      });
    }
  };
  return (
    <View
      style={{
        paddingHorizontal: moderateScale(20),
        backgroundColor: 'white',
        flex: 1,
        paddingTop: verticalScale(25),
      }}>
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
      <Text style={styles.title}>Reset Password</Text>
      <Text style={{...styles.title, fontSize: scale(14)}}>
        Enter your username
      </Text>
      <TextInput
        label="Username"
        placeholder="Enter your username"
        mode="outlined"
        autoCapitalize="none"
        style={{backgroundColor: 'white', paddingTop: verticalScale(9)}}
        theme={{
          colors: {
            primary: 'black',
          },
        }}
        selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
        onChangeText={user => {
          RESET_STORE.setUsername(user);
        }}
      />
      <HelperText type="error" visible={hasErrors()}>
        {error}
      </HelperText>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: scale(14),

            marginTop: verticalScale(6),
          }}>
          <Text>Have your password?</Text>

          <Text
            style={{
              color: 'darkgreen',
              fontWeight: 'bold',
            }}>
            {' '}
            Login
          </Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.loginBtnView}>
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
              send();
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
  );
};

export default Username;

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
