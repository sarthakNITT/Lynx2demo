import React, {useState} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

// For TouchableWithoutFeedback
export const PreventDoubleClickWithoutFeedBack = props => {
  const [timeout, setTimeouts] = useState();
  const [clicked, setClicked] = useState(true);
  const delay = 1000;

  const handleClick = () => {
    if (clicked) {
      props.onPress();
      setClicked(false);
    }
    clearTimeout(timeout);
    setTimeouts(
      setTimeout(function () {
        setClicked(true);
      }, delay),
    );
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleClick();
      }}>
      {props.children}
    </TouchableWithoutFeedback>
  );
};

// For TouchableOpacity
export const PreventDoubleClickWithOpacity = props => {
  const [timeout, setTimeouts] = useState();
  const [clicked, setClicked] = useState(true);
  const delay = 1000;

  const handleClick = () => {
    if (clicked) {
      props.onPress();
      setClicked(false);
    }
    clearTimeout(timeout);
    setTimeouts(
      setTimeout(function () {
        setClicked(true);
      }, delay),
    );
  };
  return (
    <TouchableOpacity
      style={props.style}
      onPress={() => {
        handleClick();
      }}>
      {props.children}
    </TouchableOpacity>
  );
};
