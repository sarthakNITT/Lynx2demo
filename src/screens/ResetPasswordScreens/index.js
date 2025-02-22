import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {
  moderateScale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
// import ErrorScreen from '../../components/ErrorScreen';
// import LoaderPage from '../../components/LoadingScreen';
// import SuccessScreen from '../../components/SuccessScreen/index';
// import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';
import * as colors from '../../utils/colors';
import ClubEnterOTP from './ClubEnterOTP';
import SetNewPassword from './SetNewPassword';
// import StudentWebmailPassword from './StudentWebmailPassword';
import Username from './Username';

const ResetPasswordScreen = observer(({navigation}) => {
  const ref = useRef(PagerView);
  const buttonForwardAction = () => {
    ref.current.setPage(Page + 1);
  };
  const buttonBackwardAction = () => {
    ref.current.setPage(Page - 1);
    console.log(0);
  };

  const [Page, setPage] = useState(0);

  //disabling back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
                <PagerView
                  style={{flex: 1}}
                  initialPage={Page}
                  scrollEnabled={false}
                  showPageIndicator={false}
                  ref={ref}
                  onPageSelected={event => {
                    setPage(event.nativeEvent.position);
                  }}>
                  <View style={{flex: 1}} key={1}>
                    <Username
                      forward={buttonForwardAction}
                      navigation={navigation}
                    />
                  </View>

                  <View key={2} style={{flex: 1}}>
                    <ClubEnterOTP
                      forwardAction={buttonForwardAction}
                      backwardAction={buttonBackwardAction}
                    />
                  </View>

                  <View key={3} style={{flex: 1}}>
                    <SetNewPassword navigation={navigation} />
                  </View>
                </PagerView>
    </>
  );
});

export default ResetPasswordScreen;

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
