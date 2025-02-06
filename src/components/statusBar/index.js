import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import * as color from '../../utils/colors';
const CustomStatusBar = () => {
  let OS = Platform.OS;
  return (
    <>
      {OS === 'ios' ? (
        <>
          <View
            style={{
              height: getStatusBarHeight(true),
              backgroundColor: color.StatusBar,
            }}
          />
          <StatusBar barStyle="dark-content" />
        </>
      ) : (
        <StatusBar backgroundColor={color.StatusBar} barStyle="dark-content" />
      )}
    </>
  );
};

export default CustomStatusBar;
