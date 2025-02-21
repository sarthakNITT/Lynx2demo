import React, {useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
// import {TextInput} from 'react-native-paper';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import Error from '../../components/Error';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import * as colors from '../../utils/colors';
import {PASSWORD_NO_MATCH, PASSWORD_SHORT} from '../../utils/ERROR_MESSAGES';
import {PASSWORD_LENGTH} from '../../utils/UI_CONSTANTS';
import BackButton from './backButton';
import NextButton from './nextButton';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ResetPassword = ({handleAPICALL, backwardAction}) => {
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [passwordToggle, setPasswordToggle] = useState(true);

  const [passEr, setpassEr] = useState(false);
  const [cpassEr, setcpassEr] = useState(false);
  const [matchEr, setmatchEr] = useState(false);
  const toast = useToast();
  const register = () => {
    if (
      STUDENT_REGISTRATION_STORE.getPassword.trim().length < PASSWORD_LENGTH
    ) {
      toast.show(PASSWORD_SHORT, {type: 'warning'});
      return;
    }
    setpassEr(false);
    setcpassEr(false);
    setmatchEr(false);
    if (STUDENT_REGISTRATION_STORE.getPassword.trim() === '') {
      setpassEr(true);
      return;
    }
    if (STUDENT_REGISTRATION_STORE.getConfirmPassword.trim() === '') {
      setcpassEr(true);
      return;
    }
    if (
      STUDENT_REGISTRATION_STORE.getConfirmPassword !==
      STUDENT_REGISTRATION_STORE.getPassword
    ) {
      setmatchEr(true);
      return;
    }
    handleAPICALL();
  };

  const back = () => {
    backwardAction();
  };

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
            <Text style={styles.header}>Set Password</Text>
            <Text style={styles.title}>{'Enter your app password'}</Text>

            {/* <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry={passwordToggle}
              theme={{
                colors: {
                  primary: passEr || cpassEr ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              outlineColor={passEr ? colors.Tertiary : null}
              style={{...styles.input, marginTop: verticalScale(5)}}
              right={
                <TextInput.Icon
                  name={() => (
                    <Icon
                      name={eyeIcon}
                      size={24}
                      color="#000000" // Set the color explicitly here
                    />
                  )}
                  onPress={() => {
                    setPasswordToggle(!passwordToggle);
                    setEyeIcon(eyeIcon === 'eye' ? 'eye-off' : 'eye');
                  }}
                />
              }
              onChangeText={password =>
                STUDENT_REGISTRATION_STORE.setPassword(password)
              }
            /> */}
            {passEr && <Error text="Enter your new password" />}
            {/* <TextInput
              label="Confirm Password"
              mode="outlined"
              secureTextEntry={true}
              theme={{
                colors: {
                  primary: cpassEr ? colors.Tertiary : 'black',
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              outlineColor={cpassEr ? colors.Tertiary : null}
              style={{...styles.input, marginTop: verticalScale(5)}}
              onChangeText={password =>
                STUDENT_REGISTRATION_STORE.setConfirmPassword(password)
              }
            /> */}
            {cpassEr && <Error text="Enter Confirm Password" />}
            {matchEr && <Error text={PASSWORD_NO_MATCH} />}
          </ScrollView>
          <NextButton handler={register} label="Let's Go" />
          <BackButton handler={back} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Set Password</Text>
          <Text style={styles.title}>{'Enter your app password'}</Text>

          {/* <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry={passwordToggle}
            theme={{
              colors: {
                primary: passEr || cpassEr ? colors.Tertiary : 'black',
              },
            }}
            selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
            outlineColor={passEr ? colors.Tertiary : null}
            style={{...styles.input, marginTop: verticalScale(5)}}
            right={
              <TextInput.Icon
                name={eyeIcon}
                onPress={() => {
                  setPasswordToggle(!passwordToggle);
                  setEyeIcon(eyeIcon === 'eye' ? 'eye-off' : 'eye');
                }}
              />
            }
            onChangeText={password =>
              STUDENT_REGISTRATION_STORE.setPassword(password)
            }
          /> */}
          {passEr && <Error text="Enter your new password" />}
          {/* <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry={true}
            theme={{
              colors: {
                primary: cpassEr ? colors.Tertiary : 'black',
              },
            }}
            selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
            outlineColor={cpassEr ? colors.Tertiary : null}
            style={{...styles.input, marginTop: verticalScale(5)}}
            onChangeText={password =>
              STUDENT_REGISTRATION_STORE.setConfirmPassword(password)
            }
          /> */}
          {cpassEr && <Error text="Enter Confirm Password" />}
          {matchEr && <Error text={PASSWORD_NO_MATCH} />}

          <NextButton handler={register} label="Let's Go" />
          <BackButton handler={back} />
        </View>
      )}
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
    height: HEIGHT - 80,
  },
  input: {
    width: '100%',
  },
  title: {
    fontSize: '18@s',
    color: colors.FontColor,
    color:'#000000',
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
    //color: colors.FontColor,
    color:'#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '40@vs',
  },
  scrollView: {
    width: '100%',

    backgroundColor: colors.regBackground,
  },
});

export default ResetPassword;
