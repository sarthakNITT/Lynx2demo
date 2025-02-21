import React from 'react';
import {View} from 'react-native';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {API_STORE} from '../../mobx/API_STORE';
import * as colors from '../../utils/colors';
import {getFormattedDate} from '../../utils/helperFunction/getFormattedDate';
import {getFormattedTime} from '../../utils/helperFunction/getFormattedTime';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import ImageView from '../ImageView';
import Text from '../TextComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AcademicSearchCard = ({title, desc, url, name, date, isOfficial}) => {
  if (isOfficial == undefined || isOfficial == null) {
    isOfficial = false;
  }
  return (
    <View style={styles.card}>
      {isOfficial ? (
        <View
          style={{
            position: 'absolute',
            paddingHorizontal: scale(3),
            flexDirection: 'row',
            right: scale(3),
            top: verticalScale(3),
            borderRadius: scale(18),
            alignItems: 'center',
          }}>
          <Icon name="verified" color={colors.Accent} size={scale(12)} />
        </View>
      ) : null}
      <ImageView
        src={API_STORE.getCDN + url}
        style={styles.poster}
        resizeMode={'cover'}
      />
      <View
        style={{
          flex: 1,
          marginLeft: scale(HorizontalPadding),

          marginTop: isOfficial ? verticalScale(9) : verticalScale(3),
        }}>
        <Text numberOfLines={3}>
          <Text numberOfLines={1} style={styles.notifier}>
            {name}
          </Text>
          <Text style={styles.notifier}>: </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: scale(12),
              fontWeight: '500',
              textTransform: 'uppercase',
            }}>
            {title}
          </Text>
          <Text>{'\n'}</Text>
          <Text
            style={{
              flexShrink: 1,
              marginRight: scale(HorizontalPadding),
              fontSize: scale(12),
              fontWeight: '300',
            }}>
            {desc}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: scale(12),
            textAlign: 'right',
            marginRight: scale(2),
            color: colors.GRAY_DARK,
          }}>
          {getFormattedDate(date)} | {getFormattedTime(date)}
        </Text>
      </View>
    </View>
  );
};

export default AcademicSearchCard;

const styles = ScaledSheet.create({
  card: {
    paddingVertical: '6@msr',
    paddingHorizontal: '1@msr',
    display: 'flex',
    flexDirection: 'column',
    flexDirection: 'row',
    paddingHorizontal: scale(HorizontalPadding),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cardDetails: {
    margin: '5@s',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    marginBottom: '3@s',
    color: '#000000',
    fontSize: '16@msr',
    fontWeight: 'bold',
  },
  desc: {},
  poster: {
    height: '60@s',
    width: '60@s',
    borderRadius: '30@s',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  notifier: {
    color: colors.Tertiary,
    fontSize: scale(14),
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
