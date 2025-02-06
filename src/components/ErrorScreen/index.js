import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import errorLottie from '../../res/lottieFiles/errorLottie.json';
import maintenanceLottie from '../../res/lottieFiles/maintenance.json';
import noNetLottie from '../../res/lottieFiles/noNet.json';
import * as colors from '../../utils/colors';
import {NO_NETWORK, UNEXPECTED_ERROR} from '../../utils/ERROR_MESSAGES';
import {ICON_SIZE_LARGE} from '../../utils/UI_CONSTANTS';
import Text from '../TextComponent';
import {PreventDoubleClickWithOpacity as TouchableOpacity} from '../TouchableOpacity';

const ErrorScreen = ({
  showButton = true,
  errorMessage = UNEXPECTED_ERROR,
  buttonText = 'TRY AGAIN',
  showIconInButton = true,
  icon = 'keyboard-arrow-left',
  lottieFileName = 'errorLottie',
  fn = () => {},
}) => {
  const backPress = () => {
    fn();
  };

  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) setSTATE(0);
  };

  setTimeout(toggler, 50);

  const getLottie = () => {
    if (errorMessage === NO_NETWORK) {
      console.log('Error Message', errorMessage);
      return noNetLottie;
    }
    if (lottieFileName === 'maintenanceLottie') return maintenanceLottie;
    return errorLottie;
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <LottieView
        style={{marginBottom: verticalScale(50)}}
        source={getLottie()}
        speed={0.99}
        resizeMode="contain"
        autoPlay
        loop
      />
      <Text
        allowFontScaling={false}
        style={{
          textAlign: 'center',
          fontSize: scale(17),
          marginHorizontal: scale(12),
          textTransform: 'uppercase',
          fontWeight: '500',

          marginTop: verticalScale(200),
        }}>
        {errorMessage}
      </Text>
      {showButton ? (
        <TouchableOpacity
          style={{
            padding: scale(9),
            paddingRight: scale(18),
            borderRadius: scale(24),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            position: 'absolute',
            backgroundColor: colors.Tertiary,
            bottom: verticalScale(50),
          }}
          onPress={backPress}>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: scale(24),
              alignItems: 'center',
            }}>
            {showIconInButton ? (
              <Icon
                name={icon}
                color={colors.Primary}
                size={scale(ICON_SIZE_LARGE)}
                style={{marginRight: scale(6)}}
              />
            ) : (
              <View style={{width: scale(8)}} />
            )}

            <Text
              allowFontScaling={false}
              style={{
                fontSize: scale(17),
                color: 'white',

                fontWeight: 'bold',
              }}>
              {buttonText}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ErrorScreen;
