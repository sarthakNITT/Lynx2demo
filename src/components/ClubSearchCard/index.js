import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {API_STORE} from '../../mobx/API_STORE';
import {NO_IMAGE_URL} from '../../utils/API_CONSTANTS';
import * as color from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import ImageView from '../ImageView';
import Text from '../TextComponent';

const ClubSearchCard = ({clubIconUrl, clubName, clubDescription}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.center}>
          <ImageView
            style={styles.clubIcon}
            PlaceholderContent={<ActivityIndicator color={color.Secondary} />}
            src={
              clubIconUrl === '' ? NO_IMAGE_URL : API_STORE.getCDN + clubIconUrl
            }
            resizeMode="cover"
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.headerText}>{clubName}</Text>
          <Text numberOfLines={2} style={styles.itemText}>
            {clubDescription}
          </Text>
        </View>
      </View>
      <View style={styles.line} />
    </>
  );
};

export default ClubSearchCard;

const styles = StyleSheet.create({
  containerOverall: {
    margin: scale(0),
    flexDirection: 'column',
    flex: 1,
  },

  container: {
    paddingHorizontal: scale(HorizontalPadding),
    flexDirection: 'row',
    paddingVertical: verticalScale(6),
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    height: scale(60),
    width: scale(60),
    marginLeft: scale(5),
    borderRadius: scale(150),
    justifyContent: 'center',
    elevation: 0,
    backgroundColor: color.WHITE,
    color: '#000000',
  },
  clubIcon: {
    justifyContent: 'center',
    width: scale(60),
    height: scale(60),
    color: '#000000',
    backgroundColor: color.WHITE,
    borderRadius: scale(30),
  },

  headerText: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#000000',
  },

  item: {
    flex: 1,
    marginLeft: scale(13),
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#000000',
  },

  itemText: {
    fontSize: scale(12),
    color: '#000000',
  },

  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: scale(5),
    
  },

  line: {
    backgroundColor: color.GRAY_LIGHT,
    margin: moderateScale(0),
    height: verticalScale(1),
    marginHorizontal: scale(10),
    
  },

  followText: {
    fontSize: scale(12),
    //color: color.GRAY_DARK,
    color: '#8a8a8a',
    
  },
});
