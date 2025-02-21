import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {View,Dimensions} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import errorLottie from '../../res/lottieFiles/errorLottie.json';
import { getStatusBarHeight } from "react-native-status-bar-height";
import * as colors from '../../utils/colors';
import {UNEXPECTED_ERROR} from '../../utils/ERROR_MESSAGES';
import {ICON_SIZE_LARGE} from '../../utils/UI_CONSTANTS';
import Text from '../TextComponent';
import {PreventDoubleClickWithOpacity as TouchableOpacity} from '../TouchableOpacity';
import notFoundLottie from '../../res/lottieFiles/NotFound.json';
const height2 = 737.1;
const screenHeight = Dimensions.get("window").height - getStatusBarHeight(true);
export function getHeight(height) {
  return Math.floor((height * screenHeight) / height2);
}
const NotFoundErrorScreen = ({
  showButton = true,
  errorMessage = UNEXPECTED_ERROR,
  buttonText = 'TRY AGAIN',
  showIconInButton = true,
  icon = 'keyboard-arrow-left',
  lottieFileName = 'errorLottie',
  RollNumber,
  errorMessage2,
  email,
  fn = () => {},
  onPressMessage2 = () => {},
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
    if (lottieFileName === 'notFound') return notFoundLottie;

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
        
        style={{
                             
                              width: "100%",
                              height: scale(250),
                              marginTop: getHeight(0),
                            }}
        source={getLottie()}
        speed={0.99}
        resizeMode="contain"
        autoPlay
        loop
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: scale(17),
          marginHorizontal: scale(12),
          textTransform: 'uppercase',
          color: colors.Tertiary,
          fontWeight: '500',
          marginTop: verticalScale(100),
        }}>
        {RollNumber}
      </Text>
      <Text
        allowFontScaling={false}
        style={{
          textAlign: 'center',
          fontSize: scale(17),
          marginHorizontal: scale(12),
          textTransform: 'uppercase',
          fontWeight: '500',
          marginTop: verticalScale(21),
        }}>
        {errorMessage}
      </Text>
      <TouchableOpacity onPress={onPressMessage2}>
        <Text
          allowFontScaling={false}
          style={{
            textAlign: 'center',
            fontSize: scale(12),
            marginHorizontal: scale(14),

            fontWeight: '300',
            marginTop: verticalScale(30),
          }}>
          {errorMessage2}{' '}
          <Text style={{fontWeight: '500', textDecorationLine: 'underline'}}>
            {email}
          </Text>
        </Text>
      </TouchableOpacity>
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
            bottom: verticalScale(30),
          }}
          onPress={backPress}>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: scale(24),
              alignItems: 'center',
            }}>
            {/* {showIconInButton ? (
              <Icon
                name={icon}
                color={colors.Primary}
                size={scale(ICON_SIZE_LARGE)}
                style={{marginRight: scale(6)}}
              />
            ) : (
              <View style={{width: scale(8)}} />
            )} */}

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

export default NotFoundErrorScreen;
