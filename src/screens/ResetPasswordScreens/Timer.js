import React, {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import Text from '../../components/TextComponent';
import {RESET_STORE} from '../../mobx/RESET_PASSWORD_STORE';

const Timer = () => {
  const TIMERSTATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
    //In Seconds
    INITIAL_COUNT: 600,
  };

  const appState = useRef(AppState.currentState);

  const secondsRemainingRef = useRef();
  secondsRemainingRef.current = RESET_STORE.getSecondsRemaining;
  const stateRef = useRef();
  stateRef.current = RESET_STORE.getTimerStatus;

  var appLeavingTime;

  const calculateDiff = timeElapsed => {
    // console.log(timeElapsed);
    if (stateRef.current === TIMERSTATUS.STARTED) {
      if (timeElapsed < secondsRemainingRef.current) {
        RESET_STORE.setSecondsRemaining(
          (secondsRemainingRef.current - timeElapsed).toFixed(0),
        );
      } else {
        RESET_STORE.setSecondsRemaining(0);
      }
    }
  };

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');
  //       // console.log(
  //       //   'Time of leaving App ' + appLeavingTime.toLocaleTimeString(),
  //       // );
  //       // console.log('Time of Entering App ' + new Date().toLocaleTimeString());
  //       const timeElapsed =
  //         (new Date().getTime() - appLeavingTime.getTime()) / 1000;
  //       calculateDiff(timeElapsed);
  //     } else {
  //       appLeavingTime = new Date();
  //       console.log('App has gone to the background!');
  //     }
  //     appState.current = nextAppState;

  //     //console.log('AppState', appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        const timeElapsed = appLeavingTime
          ? (new Date().getTime() - appLeavingTime.getTime()) / 1000
          : 0;
        calculateDiff(timeElapsed);
      } else {
        appLeavingTime = new Date();
        console.log('App has gone to the background!');
      }
      appState.current = nextAppState;
    });
  
    return () => {
      subscription.remove();
    };
  }, []);
  

  useInterval(
    () => {
      if (RESET_STORE.getSecondsRemaining > 0) {
        RESET_STORE.setSecondsRemaining(RESET_STORE.getSecondsRemaining - 1);
      } else {
        RESET_STORE.setTimerStatus(TIMERSTATUS.STOPPED);
        RESET_STORE.setResendButton(true);
      }
    },
    RESET_STORE.getTimerStatus === TIMERSTATUS.STARTED ? 1000 : null,
    // passing null stops the interval
  );
  return <Text></Text>;
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Timer;
