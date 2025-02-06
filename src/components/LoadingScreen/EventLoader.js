import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Dimensions} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EventLoader = () => {
  return (
    <>
      <ContentLoader
        speed={1.5}
        style={{
          marginHorizontal: scale(9),
          backgroundColor: colors.GRAY_LIGHT,
          borderRadius: scale(6),
          marginVertical: verticalScale(3),
        }}
        width={windowWidth * 0.95}
        height={verticalScale(110)}
        backgroundColor={colors.GRAY_MEDIUM}
        foregroundColor="#ecebeb">
        <Rect
          x={verticalScale(110)}
          y={verticalScale(7)}
          rx="4"
          ry="4"
          width={scale(130)}
          height={verticalScale(9)}
        />
        <Rect
          x={verticalScale(110)}
          y={verticalScale(26)}
          rx="4"
          ry="4"
          width={scale(200)}
          height={verticalScale(9)}
        />
        <Rect
          x={scale(5)}
          y={verticalScale(4)}
          rx="6"
          ry="6"
          width={verticalScale(100)}
          height={verticalScale(100)}
        />
        <Rect
          x={verticalScale(110)}
          y={verticalScale(80)}
          rx="4"
          ry="4"
          width={scale(200)}
          height={verticalScale(9)}
        />
      </ContentLoader>
    </>
  );
};

export default EventLoader;
