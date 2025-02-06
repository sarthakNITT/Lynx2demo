import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import { scale, verticalScale } from "react-native-size-matters";
import noEventLottie from "../../res/lottieFiles/noEventLottie.json";

const NoEventScreen = ({ errorMessage, fullscreen = false }) => {
  const [STATE, setSTATE] = useState(1);
  const toggler = () => {
    //force reload as there is a bug in the LF library
    if (STATE) setSTATE(0);
  };

  setTimeout(toggler, 50);

  return (
    <>
      {fullscreen ? (
        <>
          <View
            style={{
              height: "55%",
              width: "100%",
              alignSelf: "center",
              flexDirection: "column",
              backgroundColor: "transparent",
              flex: 1,
              marginTop: verticalScale(100),
            }}
          >
            <LottieView
              style={{
                marginBottom: verticalScale(0),
                alignSelf: "center",
                marginTop: 0,
                height: "95%",
                width: "100%",
              }}
              source={noEventLottie}
              speed={0.99}
              resizeMode="contain"
              autoPlay
              loop={false}
            />
            <Animatable.Text
              allowFontScaling={false}
              delay={800}
              animation="fadeIn"
              style={{
                textAlign: "center",
                fontSize: scale(16),
                marginHorizontal: scale(12),
                textTransform: "uppercase",
                fontWeight: "500",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              {errorMessage}
            </Animatable.Text>
          </View>
        </>
      ) : (
        <View
          style={{
            height: "55%",
            width: "100%",
            alignSelf: "center",
            flexDirection: "column",
            backgroundColor: "transparent",
            flex: 1,
          }}
        >
          <LottieView
            style={{
              marginBottom: verticalScale(0),
              alignSelf: "center",
              marginTop: 0,
              height: "95%",
              width: "100%",
            }}
            source={noEventLottie}
            speed={0.99}
            resizeMode="contain"
            autoPlay
            loop={false}
          />
          <Animatable.Text
            delay={800}
            animation="fadeIn"
            allowFontScaling={false}
            style={{
              textAlign: "center",
              fontSize: scale(16),
              marginHorizontal: scale(12),
              textTransform: "uppercase",
              fontWeight: "500",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            {errorMessage}
          </Animatable.Text>
        </View>
      )}
    </>
  );
};

export default NoEventScreen;
