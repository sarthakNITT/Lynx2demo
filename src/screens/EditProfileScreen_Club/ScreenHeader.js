import {observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from '../../components/TextComponent';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import * as color from '../../utils/colors';
import {checkClubLinks} from '../../utils/helperFunction/FormValidation';
import {
  CLUB_DESCRIPTION_MAX_SIZE,
  HeaderHeight,
} from '../../utils/UI_CONSTANTS';

const ScreenHeader = observer(
  ({
    handleAPICALL,
    setModalTitle,
    setModalVisible,
    setModalMessage,
    setModalButtons,
    onBackPress,
  }) => {
    console.log(
      EDIT_CLUB_PROFILE_STORE.getClubDescription.trim().length >
        CLUB_DESCRIPTION_MAX_SIZE,
    );
    const toast = useToast();

    return (
      <View style={styles.header}>
        <View style={styles.twoButtonLeft}>
          <TouchableOpacity
            onPress={() => {
              onBackPress();
            }}
            style={styles.button}>
            <Icon
              name="close"
              size={HeaderHeight / 1.6}
              color={color.Tertiary}
              style={{marginLeft: scale(5)}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Edit Profile</Text>
        <View style={styles.twoButtonRight}>
          <TouchableOpacity
            onPress={() => {
              if (
                EDIT_CLUB_PROFILE_STORE.getClubDescription.trim().length === 0
              ) {
                setModalTitle('Verification');
                setModalMessage('Please fill the Club Description');
                setModalButtons([
                  {
                    text: 'KEEP EDITING',
                    func: () => console.log('OK Pressed'),
                  },
                ]);
                setModalVisible(true);
              } else {
                setModalTitle('Update Profile?');
                setModalMessage(
                  'Are you sure you want to update your details?',
                );
                setModalButtons([
                  {
                    text: 'KEEP EDITING',
                    func: () => console.log('OK Pressed'),
                  },
                  {
                    text: 'YES',
                    func: async () => {
                      const er = await checkClubLinks();
                      if (
                        EDIT_CLUB_PROFILE_STORE.getClubDescription.trim()
                          .length > CLUB_DESCRIPTION_MAX_SIZE
                      ) {
                        toast.show('Club description exceeds character limit', {
                          type: 'warning',
                        });
                        return;
                      }
                      if (!er) handleAPICALL();
                    },
                  },
                ]);
                setModalVisible(true);
              }
            }}
            style={styles.button}>
            <Icon
              name="check"
              size={HeaderHeight / 1.6}
              color={color.Green}
              style={{marginRight: scale(5)}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(HeaderHeight),
    shadowColor: color.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    backgroundColor: color.headerBackground,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  twoButtonLeft: {},
  twoButtonRight: {},
});

export default ScreenHeader;