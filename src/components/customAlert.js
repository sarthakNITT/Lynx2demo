import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import * as colors from '../utils/colors';
import ImageView from './ImageView';
import Text from './TextComponent';

const CustomAlert = props => {
  const androidDefaults = {
    container: {
      backgroundColor:
        (props.android &&
          props.android.container &&
          props.android.container.backgroundColor) ||
        colors.WHITE,
    },

    title: {
      color:
        (props.android && props.android.title && props.android.title.color) ||
        colors.BLACK,

      fontSize:
        (props.android &&
          props.android.title &&
          props.android.title.fontSize) ||
        scale(16 + 2),
      fontWeight:
        (props.android &&
          props.android.title &&
          props.android.title.fontWeight) ||
        'bold',
    },
    message: {
      color:
        (props.android &&
          props.android.message &&
          props.android.message.color) ||
        colors.BLACK,

      fontSize:
        (props.android &&
          props.android.message &&
          props.android.message.fontSize) ||
        scale(16),
      fontWeight:
        (props.android &&
          props.android.message &&
          props.android.message.fontWeight) ||
        'normal',
      paddingTop: props.title ? null : verticalScale(10),
    },
    button: {
      color: colors.Tertiary,
      // fontFamily: FONT,
      fontSize: scale(16 - 2),
      fontWeight: '500',
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
    },
  };

  const AndroidButtonBox = () => {
    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(1);
    const buttonProps =
      props.buttons && props.buttons.length > 0 ? props.buttons : [{}];

    return (
      <View
        key="button-box"
        style={[
          styles.androidButtonGroup,
          {
            flexDirection: buttonLayoutHorizontal === 1 ? 'row' : 'column',
          },
        ]}
        onLayout={e => {
          if (e.nativeEvent.layout.height > verticalScale(60))
            setButtonLayoutHorizontal(0);
        }}>
        {buttonProps.map((item, index) => {
          if (item === null) return null;
          if (index > 2) return null;
          const alignSelfProperty =
            buttonProps.length > 2 &&
            index === 0 &&
            buttonLayoutHorizontal === 1
              ? 'flex-start'
              : 'flex-end';
          let defaultButtonText = 'OK';
          if (buttonProps.length > 2) {
            if (index === 0) defaultButtonText = 'ASK ME LATER';
            else if (index === 1) defaultButtonText = 'CANCEL';
          } else if (buttonProps.length === 2 && index === 0)
            defaultButtonText = 'CANCEL';
          return (
            <View
              key={index}
              style={[
                styles.androidButton,
                index === 0 && buttonLayoutHorizontal === 1 ? {flex: 1} : {},
              ]}>
              <Pressable
                disabled={item.disabled ? item.disabled : false}
                onPress={() => {
                  props.setModalVisible(false);
                  if (item.func && typeof item.func === 'function') item.func();
                }}
                style={[
                  {
                    alignSelf: alignSelfProperty,
                  },
                ]}>
                <View
                  style={[
                    styles.androidButtonInner,
                    {
                      backgroundColor:
                        (item.styles && item.styles.backgroundColor) ||
                        androidDefaults.button.backgroundColor,
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        (item.styles && item.styles.color) ||
                        androidDefaults.button.color,
                      fontFamily:
                        (item.styles && item.styles.fontFamily) ||
                        androidDefaults.button.fontFamily,
                      fontSize:
                        (item.styles && item.styles.fontSize) ||
                        androidDefaults.button.fontSize,
                      fontWeight:
                        (item.styles && item.styles.fontWeight) ||
                        androidDefaults.button.fontWeight,
                      textTransform:
                        (item.styles && item.styles.textTransform) ||
                        androidDefaults.button.textTransform,
                    }}>
                    {item.text || defaultButtonText}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <Modal
      key="modal"
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}>
      <Pressable
        style={[styles.androidBackdrop, styles.backdrop]}
        onPress={() => {
          if (props.autoDismiss === false) {
            return;
          }
          props.setModalVisible(false);
        }}
      />
      <View style={styles.alertBox}>
        <View style={[styles.androidAlertBox, androidDefaults.container]}>
          {props.image ? (
            <ImageView
              style={{
                height: scale(75),
                width: scale(75),
                marginVertical: verticalScale(10),
                alignSelf: 'center',
                marginBottom: 0,
              }}
              src={props.image}></ImageView>
          ) : null}
          {props.title ? (
            <Text style={[styles.androidTitle, androidDefaults.title]}>
              {props.title}
            </Text>
          ) : null}
          {props.startDate == '' ? null : props.startDate == props.endDate ? (
            <Text style={[styles.androidMessage2]}>
              {props.startDate || ''}
            </Text>
          ) : (
            <Text style={[styles.androidMessage2]}>
              {props.startDate || ''} - {props.endDate || ''}
            </Text>
          )}

          <Text style={[styles.androidMessage, androidDefaults.message]}>
            {props.message || ''}
          </Text>
          <AndroidButtonBox />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: scale(10),
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  androidBackdrop: {
    backgroundColor: '#232f34',
    opacity: 0.4,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidAlertBox: {
    maxWidth: 300,
    width: '100%',
    margin: scale(48),
    elevation: 24,
    borderRadius: 10,
  },
  androidTitle: {
    margin: scale(24),
    marginBottom: scale(4),
  },
  androidMessage: {
    marginLeft: scale(24),
    marginRight: scale(24),
    marginBottom: verticalScale(10),
  },
  androidMessage2: {
    marginLeft: scale(24),
    marginRight: scale(24),
    fontSize: scale(12),
  },
  androidButtonGroup: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: verticalScale(8),
    marginLeft: scale(24),
  },
  androidButton: {
    marginRight: scale(8),
  },
  androidButtonInner: {
    padding: scale(10),
  },
});
export default CustomAlert;
