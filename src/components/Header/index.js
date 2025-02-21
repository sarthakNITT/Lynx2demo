import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../utils/colors';
import {
  HeaderHeight,
  HorizontalPadding,
  SHADOW_OPACITY,
} from '../../utils/UI_CONSTANTS';
import Text from '../TextComponent';

const Header = ({props, title = '', func = ''}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (func === '') props.navigation.goBack();
          else func();
        }}>
        {Platform.OS === 'ios' ? (
          <Icon
            name="arrow-back-ios"
            size={HeaderHeight / 1.6}
            color={colors.Tertiary}
          />
        ) : (
          <Icon
            name="arrow-back"
            size={HeaderHeight / 1.6}
            color={colors.Tertiary}
          />
        )}
      </TouchableOpacity>
      <View style={styles.textView}>
        <Text numberOfLines={1} style={styles.headerText}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: verticalScale(HeaderHeight),
    shadowColor: colors.BLACK,
    shadowOpacity: SHADOW_OPACITY,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    backgroundColor: colors.headerBackground,
    paddingHorizontal: scale(HorizontalPadding),
  },
  textView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
    width: '65%',
    textAlign: 'center',
    color: colors.HeaderText,
  },
  button: {
    justifyContent: 'center',
    elevation: 1,
    zIndex: 1,
  },
});

export default Header;
