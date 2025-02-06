import React from 'react';
import {Button} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';

const BackButton = ({handler}) => {
  return (
    <Button
      style={styles.back}
      mode="outline"
      onPress={handler}
      labelStyle={{color: colors.regAttach}}
      icon="chevron-left">
      Back
    </Button>
  );
};

export default BackButton;

const styles = ScaledSheet.create({
  back: {
    position: 'absolute',
    bottom: '20@vs',
    left: '10@vs',
  },
});
