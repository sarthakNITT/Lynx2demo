import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as color from '../../utils/colors';
import {getFormattedDate} from '../../utils/helperFunction/getFormattedDate';
import {getFormattedTime} from '../../utils/helperFunction/getFormattedTime';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';
import ImageView from '../ImageView';
import Text from '../TextComponent';

const ActivityCard = ({
  date,
  title,
  desc,
  imageUrl,
  type,
  sender,
  touch,
  isReminder,
  isOfficial,
}) => {
  const getTimeGap = d => {
    let date = Date.parse(getFormattedDate(d));
    var today = new Date();
    today = Date.parse(getFormattedDate(today));
    let diff = today - date;
    var Difference_In_Days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (Math.floor(Difference_In_Days / 365) >= 1) {
      return Math.floor(Difference_In_Days / 365) + 'yr';
    }
    if (Math.floor(Difference_In_Days / 30) >= 1) {
      return Math.floor(Difference_In_Days / 30) + 'mo';
    }
    if (Math.floor(Difference_In_Days / 7) >= 1) {
      return Math.floor(Difference_In_Days / 7) + 'w';
    }
    if (Difference_In_Days === 0) return 'Today';
    else if (Difference_In_Days === 1) return 'Yesterday';
    else {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      today = new Date();
      var showDate = new Date(d);
      return days[showDate.getDay()];
    }
  };

  // const navigationHandler = () => {
  //   if (type === 'event') {
  //     navigation.push('EventDescriptionScreen', {
  //       eventId: id.event_id,
  //       app: true,
  //     });
  //   } else {
  //     navigation.push('AnnouncementDetail', {
  //       circularId: id.circular_id,
  //     });
  //   }
  // };
  if (isReminder == undefined) {
    isReminder = false;
  }
  if (isOfficial == undefined) {
    isOfficial = false;
  }
  return (
    <View>
      {isReminder ? (
        <View
          style={{
            position: 'absolute',
            paddingHorizontal: scale(3),
            flexDirection: 'row',
            right: scale(9),
            top: verticalScale(1),
            borderRadius: scale(18),
            alignItems: 'center',
          }}>
          <Icon name="hourglass-bottom" color={color.Accent} size={scale(10)} />
          <Text
            style={{
              fontSize: scale(9),
              color: color.GRAY_DARK,
              fontWeight: 'bold',
            }}>
            {' '}
            Reminder
          </Text>
        </View>
      ) : null}
      {isOfficial ? (
        <View
          style={{
            position: 'absolute',
            paddingHorizontal: scale(3),
            flexDirection: 'row',
            right: scale(9),
            top: verticalScale(1),
            borderRadius: scale(18),
            alignItems: 'center',
          }}>
          <Icon name="verified" color={color.Accent} size={scale(12)} />
          <Text
            style={{
              fontSize: scale(9),
              color: color.GRAY_DARK,
              fontWeight: 'bold',
            }}>
            {' '}
            Official
          </Text>
        </View>
      ) : null}
      <View
        style={{
          ...styles.cardLayout,
          paddingTop:
            isReminder || isOfficial ? verticalScale(9.9) : verticalScale(6),
        }}>
        <ImageView style={styles.poster} src={imageUrl} />

        <View style={styles.eventInfo}>
          <Text numberOfLines={2}>
            <Text style={styles.notifier}>{sender}:</Text>
            <Text style={styles.title}> {title}</Text>
            <Text
              style={{
                fontSize: scale(12),
                //fontWeight: 'bold',
                color:'#656565',
                paddingRight: 10,
              }}>
              {'\n'}
              {desc}
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: verticalScale(3),
              
              //alignItems: 'flex-end',
            }}>
            <Text style={{fontSize: scale(12.5),color:'#000000',}}>
              {getFormattedDate(date)} | {getFormattedTime(date)}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                flex: 1,
                fontSize: scale(12),
                fontWeight: '300',
               // color: {colors.BLACK},
                color:'#000000',
              }}>
              {getTimeGap(date)}
            </Text>
          </View>
        </View>
      </View>
      {type === 'event' ? (
        <View style={styles.button}>
          <Button
            onPress={() => {
              touch();
            }}
            mode="outlined"
            color={color.Tertiary}
            style={styles.btn}
            contentStyle={{padding: 0}}
            labelStyle={{fontSize: scale(9), padding: 0, fontWeight: 'bold'}}>
            View event
          </Button>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  cardLayout: {
    flexDirection: 'row',
    paddingHorizontal: scale(HorizontalPadding),
    paddingVertical: verticalScale(9),
  },
  poster: {
    height: '60@s',
    width: '60@s',
    borderRadius: '30@s',
    alignSelf: 'center',
  },
  eventInfo: {
    marginLeft: '9@s',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  notificationView: {
    alignSelf: 'center',
    marginRight: 0,
  },
  button: {
    marginLeft: '79@s',
    paddingBottom: '6@vs',
    //backgroundColor: 'red',
  },
  btn: {
    marginTop: verticalScale(2),
    alignSelf: 'baseline',
  },
  notifier: {
    color: color.Tertiary,
    fontSize: scale(14),
    fontWeight: '500',
  },
  title: {
    color: color.BLACK,
    fontSize: scale(14),
    fontWeight: '400',
  },
});
export default ActivityCard;