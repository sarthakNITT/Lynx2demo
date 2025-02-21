import React from 'react';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {Dimensions} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../../utils/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StudentUserLoader = () => {
  return (
    <ContentLoader
      speed={1.75}
      style={{marginHorizontal: scale(9), marginVertical: verticalScale(9)}}
      width={windowWidth * 0.95}
      height={windowHeight}
      backgroundColor={colors.GRAY_MEDIUM}
      foregroundColor="#ecebeb">
      <Circle cx={scale(50)} cy={scale(50)} r={scale(36)} />
      <Rect
        x="0"
        y="0"
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(190)}
      />
      <Rect
        x="0"
        y={verticalScale(200)}
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(60)}
      />
      <Rect
        x="0"
        y={verticalScale(270)}
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(60)}
      />
      <Rect
        x="0"
        y={verticalScale(340)}
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(60)}
      />
      <Rect
        x="0"
        y={verticalScale(410)}
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(60)}
      />
      <Rect
        x="0"
        y={verticalScale(480)}
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(60)}
      />
      <Rect
        x="0"
        y={verticalScale(550)}
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(60)}
      />
      <Rect
        x="0"
        y={verticalScale(620)}
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(60)}
      />
      <Rect
        x="0"
        y={verticalScale(690)}
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(60)}
      />
      <Rect
        x="0"
        y={verticalScale(760)}
        rx="6"
        ry="6"
        width={windowWidth * 0.95}
        height={verticalScale(60)}
      />
    </ContentLoader>
  );
};

export default StudentUserLoader;
