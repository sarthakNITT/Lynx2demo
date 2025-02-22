import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Settings,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DeviceInfo from 'react-native-device-info';
import EncryptedStorage from 'react-native-encrypted-storage';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomAlert from '../../components/customAlert';
import ErrorScreen from '../../components/ErrorScreen';
import {API_STORE} from '../../mobx/API_STORE';
import {AUTH_NAV_STORE} from '../../mobx/AUTH_NAV_STORE';
import {BOTTOM_NAV_STORE} from '../../mobx/BOTTOM_NAV_STORE';
import {USER_STORE} from '../../mobx/USER_STORE';

import {
  APP_PLAYSTORE_URL,
  GET_ANDROID_VERSION,
  GET_BASE_CDN,
  GET_BASE_URL,
} from '../../utils/API_CONSTANTS';
import * as color from '../../utils/colors';
import {
  MAINTENANCE,
  NO_NETWORK,
  UNEXPECTED_ERROR,
} from '../../utils/ERROR_MESSAGES';
import {
  CLUB_USER_ID,
  REFRESH_TOKEN,
  USER_TOKEN,
  USER_TYPE,
} from '../../utils/STORAGE_KEYS';
import {STUDENT} from '../../utils/USER_TYPE';

const logo = require('../../res/images/appLogoNoBg.png');
const spiderLogo = require('../../res/images/spiderLogo.png');

async function loadCache() {
  try {
    // DEEP_LINKING_STORE.setAllow(true);

    const userToken = await EncryptedStorage.getItem(USER_TOKEN);
    const userType = await EncryptedStorage.getItem(USER_TYPE);
    const refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN);
    console.log('refresh token: ', refreshToken);
    if (userType === null) {
      userType = '';
    }

    if (userType != STUDENT) {
      const userClubId = await EncryptedStorage.getItem(CLUB_USER_ID);
      USER_STORE.setClubId(userClubId);
    }

    USER_STORE.setUserToken(userToken);
    USER_STORE.setUserType(userType);
    if (refreshToken === null) {
      USER_STORE.setRefreshToken('');
    } else {
      USER_STORE.setRefreshToken(refreshToken);
    }
  } catch (error) {
    USER_STORE.setUserToken(null);
  }
}

async function isUpdateNeeded() {
  try {
    if (Platform.OS === 'ios') {
      const installedVersion = DeviceInfo.getVersion();
      //x.y.z
      console.log('installed version: ', installedVersion);
      return false;
    }
    const installedVersion = DeviceInfo.getVersion();
    //x.y.z
    console.log('installed version: ', installedVersion);

    const resp = await axios.get(GET_ANDROID_VERSION);
    const playStoreVersion = resp.data.trim();
    console.log('playstore Version: ', playStoreVersion);
    //p.q.r

    const install = installedVersion.split('.');
    const update = playStoreVersion.split('.');
    const x = parseInt(install[0]);
    const y = parseInt(install[1]);

    const p = parseInt(update[0]);
    const q = parseInt(update[1]);
    console.log("p,q");
    console.log(p);
    console.log(q);
    console.log(x);
    console.log(y);
    if (x < p || y < q) {
      console.log(x, y, '    ', p, q);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
const SplashScreen = ({navigation, route}) => {
  const [State, setState] = useState(0);
  const [API, setAPI] = useState(0);

  //0 Splash
  //1 error
  //2 maintain
  //3 no net
  const [updateVisible, setUpdateVisible] = useState(false);

  const API_CALL = async () => {
    console.log('Getting base URL');
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      setAPI(3);
      return;
    }
    try {
      const baseUrl = await axios.get(GET_BASE_URL, {}, {timeout: 5000});
      const cdn = await axios.get(GET_BASE_CDN, {}, {timeout: 5000});

      const res = await isUpdateNeeded();
      console.log("the main error is ",res);
      if (res) {
        console.log('UPDATE NEEDED');
        setUpdateVisible(true);
      }

      console.log('Base URl: ', baseUrl.data.trim());
      console.log('CDN: ', cdn.data.trim());

      if (baseUrl.data.trim() === 'maintain') {
        setAPI(2);
        return;
      }

      API_STORE.setBaseUrl(baseUrl.data.trim());
      API_STORE.setCDN(cdn.data.trim());
      console.log("its in this try block");
      setAPI(200);
    } catch (error) {
      console.log(error);
      setAPI(1);
    }
  };

  useEffect(() => {
    API_CALL();

    let isStoreNeedCleaning = false;

    if (Platform.OS === 'ios') {
      if (!Settings.get('hasRunBefore')) {
        Settings.set({hasRunBefore: true});
        isStoreNeedCleaning = true;
      }
      if (isStoreNeedCleaning) {
        EncryptedStorage.clear();
      } else {
        loadCache();
      }
    } else {
      loadCache();
    }

    ID();
  }, []);

  setTimeout(() => {
    console.log("the api in splash screen in first settimeout ", API);
    if (API === 200) {
      console.log('called out');
      console.log(updateVisible);
      if (!updateVisible) {
        AUTH_NAV_STORE.setSplashLoading(false);
        return;
      }
    }
    setState(API);
    //console.log("222");
  }, 2000);

  setTimeout(() => {
    console.log("the state in splash screen second settimeout ", State);
    if (!updateVisible && State === 200) {
      console.log("1");
      AUTH_NAV_STORE.setSplashLoading(false);
    }
  }, 100);
  console.log("state is after setimeout  ",State);
  const ID = () => {
    try {
      USER_STORE.setUniqueId(str);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("the state under id is", State);

  return (
    <>
      <StatusBar
        backgroundColor={'#f3f3f4'}
        hidden={false}
        barStyle="dark-content"
      />
      {State === 0 || State == 200 ? (
        <>
          <CustomAlert
            image={logo}
            title={''}
            message={
              'We have made some changes to improve the app performance. Please update your app to the latest version.'
            }
            startDate={''}
            endDate={''}
            autoDismiss={false}
            modalVisible={State === 200 ? updateVisible : false}
            setModalVisible={setUpdateVisible}
            buttons={[
              {
                text: 'UPDATE',
                func: () => {
                  Linking.openURL(APP_PLAYSTORE_URL);
                  BOTTOM_NAV_STORE.setTabVisibility(true);
                  AUTH_NAV_STORE.setSplashLoading(false);
                },
              },
            ]}
          />

          <View
            style={{
              position: 'absolute',
              top: verticalScale(-55),
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f3f3f4',
            }}>
            <Animatable.Image
              source={logo}
              style={styles.image}
              delay={100}
              animation="fadeIn"></Animatable.Image>

            <Animatable.Image
              source={spiderLogo}
              style={styles.spider}
              delay={200}
              animation="fadeIn"
            />
          </View>
        </>
      ) : (
        <>
          {State === 2 ? (
            <>
              <ErrorScreen
                showIconInButton={false}
                errorMessage={MAINTENANCE}
                lottieFileName="maintenanceLottie"
                showButton={false}
              />
            </>
          ) : (
            <>
              {State === 3 ? (
                <>
                  <ErrorScreen
                    showIconInButton={false}
                    errorMessage={NO_NETWORK}
                    fn={() => {
                      API_CALL();
                    }}
                  />
                </>
              ) : (
                <>
                  <ErrorScreen
                    showIconInButton={false}
                    errorMessage={UNEXPECTED_ERROR}
                    fn={() => {
                      API_CALL();
                    }}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: color.spashScreenBackground,
    alignItems: 'center',
  },
  text: {
    fontSize: scale(24),
    margin: moderateScale(15),
    lineHeight: verticalScale(30),
    color: color.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'normal',
    width: scale(250),
    marginTop: verticalScale(-9),
  },
  image: {
    width: moderateScale(270),
    height: moderateScale(270),
  },
  spider: {
    height: scale(50),
    width: scale(100),
    position: 'absolute',
    bottom: scale(24),
  },
});

export default SplashScreen;