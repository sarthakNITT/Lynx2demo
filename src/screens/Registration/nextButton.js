import React from 'react';
import { Button } from 'react-native';
// import {Button} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import * as colors from '../../utils/colors';

const NextButton = ({handler, label = 'Next'}) => {
  return (
    <Button
      style={styles.next}
      mode="contained"
      onPress={handler}
      labelStyle={{color: colors.regNext}}>
      {label}
    </Button>
  );
};

export default NextButton;

const styles = ScaledSheet.create({
  next: {
    position: 'absolute',
    bottom: '27@vs',
    right: '27@vs',
    backgroundColor: colors.regAttach,
  },
});
