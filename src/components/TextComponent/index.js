import React from 'react';
import {Text as TEXT} from 'react-native';

const Text = props => {
  return (
    <TEXT
      allowFontScaling={false}
      numberOfLines={props.numberOfLines}
      style={props.style}>
      {props.children}
    </TEXT>
  );
};

export default Text;
