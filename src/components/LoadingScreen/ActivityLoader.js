import React from 'react';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {Dimensions} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ActivityLoader = () => {
  return (
    <ContentLoader
      speed={1.5}
      style={{
        marginHorizontal: scale(HorizontalPadding),
        backgroundColor: colors.GRAY_MEDIUM,
        marginVertical: verticalScale(6),
        paddingVertical: verticalScale(3),
        borderRadius: scale(6),
      }}
      width={windowWidth * 0.95}
      height={verticalScale(100)}
      foregroundColor="#ecebeb">
      <Rect x="52" y="12" rx="4" ry="4" width="88" height="6" />
      <Rect x="52" y="30" rx="4" ry="4" width="52" height="6" />
      <Rect
        x={scale(6)}
        y="56"
        rx="4"
        ry="4"
        width={windowWidth * 0.85}
        height="6"
      />
      <Rect
        x={scale(6)}
        y="72"
        rx="4"
        ry="4"
        width={windowWidth * 0.75}
        height="6"
      />
      <Rect
        x={scale(6)}
        y="88"
        rx="4"
        ry="4"
        width={windowWidth * 0.55}
        height="6"
      />
      <Circle cx="25" cy="25" r="20" />
    </ContentLoader>
  );
};

export default ActivityLoader;
