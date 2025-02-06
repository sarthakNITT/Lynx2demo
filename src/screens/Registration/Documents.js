import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import {TextInput} from 'react-native-paper';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Error from '../../components/Error';
import {STUDENT_REGISTRATION_STORE} from '../../mobx/STUDENT_REGISTRATION_STORE';
import * as colors from '../../utils/colors';
import {isAadharValid} from '../../utils/helperFunction/FormValidation';
import BackButton from './backButton';
import NextButton from './nextButton';

const WIDTH = Dimensions.get('window').width;

const Documents = observer(({scrollViewRef, callback}) => {
  const [AadharError, setAadharError] = useState(false);
  const scroll = () => {
    if (STUDENT_REGISTRATION_STORE.getAadhar === '') {
      setAadharError(false);

      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 3,
          animated: true,
        });
      }
      callback(
        'Profile Picture',
        'Upload your profile photo. This photo will be used by NIT Trichy for official purposes.',
        3,
      );
    } else if (isAadharValid(STUDENT_REGISTRATION_STORE.getAadhar)) {
      setAadharError(false);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          x: WIDTH * 3,
          animated: true,
        });
      }
      callback(
        'Profile Picture',
        'Upload your profile photo. This photo will be used by NIT Trichy for official purposes.',
        3,
      );
    } else {
      setAadharError(true);
    }
  };

  const back = () => {
    callback('Basic Information', 'Enter your date of birth and address', 1);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 1,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Aadhar Number"
        mode="outlined"
        theme={{
          colors: {
            primary: 'black',
          },
        }}
        selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
        keyboardType="numeric"
        value={STUDENT_REGISTRATION_STORE.getAadhar}
        maxLength={12}
        style={styles.inputAd}
        onChangeText={val => {
          STUDENT_REGISTRATION_STORE.setAadhar(val);
        }}
      />
      {AadharError && <Error text="Enter a valid Aadhar Number" />}
      <NextButton handler={scroll} />
      <BackButton handler={back} />
    </SafeAreaView>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: colors.regBackground,
    paddingHorizontal: '20@s',
    alignItems: 'center',
  },
  split: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  inputAd: {width: '100%'},
  passtitle: {
    alignSelf: 'flex-start',
    marginTop: '10@vs',
    color: colors.FontColor,
    fontWeight: 'bold',
  },
  attach: {
    alignSelf: 'flex-start',
    marginTop: '5@vs',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachText: {
    fontSize: scale(13),
    alignSelf: 'center',
    color: colors.regAttach,
  },
  file: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#202020',
    backgroundColor: colors.GRAY_MEDIUM,
    marginTop: '5@vs',
  },
  filename: {
    flex: 1,
    marginHorizontal: scale(10),
    fontSize: scale(14),
  },
});

export default Documents;
