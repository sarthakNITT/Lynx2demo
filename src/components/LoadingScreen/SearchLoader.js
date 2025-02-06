import React from 'react';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {Dimensions} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchLoader = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        style={{
          marginHorizontal: scale(9),
          backgroundColor: colors.GRAY_LIGHT,
          borderRadius: scale(6),
          marginVertical: verticalScale(3),
        }}
        width={windowWidth * 0.95}
        height={verticalScale(70)}
        backgroundColor={colors.GRAY_MEDIUM}
        foregroundColor="#ecebeb">
        <Rect
          x={scale(60)}
          y={verticalScale(15)}
          rx="6"
          ry="6"
          width={windowWidth * 0.65}
          height={verticalScale(6)}
        />
        <Rect
          x={scale(60)}
          y={verticalScale(25)}
          rx="6"
          ry="6"
          width={windowWidth * 0.45}
          height={verticalScale(6)}
        />
        <Rect
          x={scale(60)}
          y={verticalScale(35)}
          rx="6"
          ry="6"
          width={windowWidth * 0.35}
          height={verticalScale(6)}
        />

        <Circle cx={scale(30)} cy={scale(30)} r={scale(25)} />
      </ContentLoader>
    </>
  );
};

export default SearchLoader;
