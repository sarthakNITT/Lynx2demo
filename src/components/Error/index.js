import React from 'react';
import {View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
// import Icon from 'react-native-vector-icons/AntDesign';
import * as colors from '../../utils/colors';
import Text from '../TextComponent';

const Error = ({text}) => {
  return (
    <View style={styles.container}>
      {/* <Icon
        name="exclamationcircle"
        color={colors.Tertiary}
        size={moderateScale(14)}
      /> */}
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
  },
  errorText: {
    color: colors.Tertiary,
    marginLeft: '5@s',
    fontSize: '12@s',
  },
});

export default Error;
