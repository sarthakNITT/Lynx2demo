import React from 'react';
import {View} from 'react-native';
import {moderateScale, scale, ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import Text from '../TextComponent';

const HelperText = ({text, style = {}}) => {
  return (
    <View style={{...styles.container, ...style}}>
      <Icon name="infocirlce" color={colors.Accent} size={moderateScale(14)} />
      <Text style={styles.errorText}>{text}</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '5@vs',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginHorizontal: scale(HorizontalPadding),
  },
  errorText: {
    color: colors.Accent,
    marginLeft: '5@s',
    fontSize: '12@s',
  },
});

export default HelperText;
