import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {PreventDoubleClickWithOpacity as TouchableOpacity} from '../../components/TouchableOpacity';
import successLottie from '../../res/lottieFiles/success.json';
import * as colors from '../../utils/colors';
import {ICON_SIZE_LARGE} from '../../utils/UI_CONSTANTS';
import Text from '../TextComponent';

const SuccessScreen = ({
  showButton = true,
  buttonText = 'NEXT',
  showRightIconInButton = false,
  showLeftIconInButton = false,
  iconRight = 'keyboard-arrow-right',
  iconLeft = 'keyboard-arrow-left',
  fn = () => {},
  isResetPass = false,
  automatic = false,
}) => {
  const backPress = () => {
    if (isResetPass) {
      fn.pop();
    } else {
      fn();
    }
  };

  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) setSTATE(0);
  };

  setTimeout(toggler, 50);
  // if (automatic) {
  //   setTimeout(fn, 2000);
  // }
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
        source={successLottie}
        speed={2}
        resizeMode="contain"
        autoPlay
        loop={false}
      />

      {showButton ? (
        <Animatable.View
          animation={'fadeIn'}
          delay={1150}
          style={{
            position: 'absolute',
            bottom: verticalScale(50),
            alignSelf: 'center',
            justifyContent: 'center',
            width: '50%',
            paddingHorizontal: scale(18),
          }}>
          <TouchableOpacity
            style={{
              borderRadius: scale(24),
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: scale(9),
              width: '100%',
              backgroundColor: colors.Accent,
            }}
            onPress={backPress}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: scale(24),
                alignItems: 'center',
              }}>
              {showLeftIconInButton ? (
                <Icon
                  name={iconLeft}
                  color={colors.Primary}
                  size={scale(ICON_SIZE_LARGE)}
                  style={{marginRight: scale(6)}}
                />
              ) : (
                <View style={{width: scale(8)}} />
              )}
              <Text
                style={{
                  fontSize: scale(16),
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {buttonText}
              </Text>
              {showRightIconInButton ? (
                <Icon
                  name={iconRight}
                  color={colors.Primary}
                  size={scale(ICON_SIZE_LARGE)}
                  style={{marginLeft: scale(6)}}
                />
              ) : (
                <View style={{width: scale(8)}} />
              )}
            </View>
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SuccessScreen;
