import {observer} from 'mobx-react';
import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Error from '../../components/Error';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import * as colors from '../../utils/colors';
import {HorizontalPadding} from '../../utils/UI_CONSTANTS';

const TEXT_INPUT = observer(
  ({
    placeholder,
    label,
    icon,
    onTextChange,
    showCharCount = false,
    charCount,
    value,
    maxLength = 1000,
    keyboardType = 'default',
    multiline = false,
    index,
  }) => {
    return (
      <View>
        <TextInput
          underlineColor="transparent"
          label={label}
          value={value}
          maxLength={maxLength}
          style={{
            backgroundColor: colors.GRAY_LIGHT,
            borderTopRightRadius: moderateScale(6),
            borderTopLeftRadius: moderateScale(6),
            marginHorizontal: scale(HorizontalPadding),
            marginTop: verticalScale(3),
          }}
          placeholder={placeholder}
          multiline={multiline}
          keyboardType={keyboardType}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={text => {
            onTextChange(text);
          }}
          left={<TextInput.Icon name={icon} color={colors.Accent} />}
          right={
            showCharCount ? (
              <TextInput.Affix
                text={'/' + charCount}
                textStyle={{
                  color: charCount < 0 ? colors.Tertiary : colors.GRAY_DARK,
                }}
              />
            ) : (
              <></>
            )
          }
        />
        {CLUB_REGISTER_STORE.getLinkError[index] === true && (
          <View
            style={{
              width: '90%',
              marginHorizontal: scale(HorizontalPadding),
              marginBottom: scale(10),
            }}>
            <Error text={'Enter a valid ' + placeholder} />
          </View>
        )}
      </View>
    );
  },
);

const EditClubLinks = observer(() => {
  return (
    <View>
      <TEXT_INPUT
        placeholder={'Website Link'}
        label={'Website Link'}
        value={EDIT_CLUB_PROFILE_STORE.getWebsiteLink}
        icon={'google-chrome'}
        onTextChange={val => {
          EDIT_CLUB_PROFILE_STORE.setWebsiteLink(val);
        }}
        index={0}
      />
      <TEXT_INPUT
        placeholder={'Instagram Link'}
        label={'Instagram Link'}
        value={EDIT_CLUB_PROFILE_STORE.getInstagramLink}
        icon={'instagram'}
        onTextChange={val => {
          EDIT_CLUB_PROFILE_STORE.setInstagramLink(val);
        }}
        index={1}
      />
      <TEXT_INPUT
        placeholder={'Facebook Link'}
        label={'Facebook Link'}
        value={EDIT_CLUB_PROFILE_STORE.getFacebookLink}
        icon={'facebook'}
        onTextChange={val => {
          EDIT_CLUB_PROFILE_STORE.setFacebookLink(val);
        }}
        index={2}
      />
      <TEXT_INPUT
        placeholder={'Youtube Link'}
        label={'Youtube Link'}
        value={EDIT_CLUB_PROFILE_STORE.getYoutubeLink}
        icon={'youtube'}
        onTextChange={val => {
          EDIT_CLUB_PROFILE_STORE.setYoutubeLink(val);
        }}
        index={3}
      />
      <TEXT_INPUT
        placeholder={'LinkedIn Link'}
        label={'LinkedIn Link'}
        value={EDIT_CLUB_PROFILE_STORE.getLinkedInLink}
        icon={'linkedin'}
        onTextChange={val => {
          EDIT_CLUB_PROFILE_STORE.setLinkedInLink(val);
        }}
        index={4}
      />
      <TEXT_INPUT
        placeholder={'Medium Link'}
        label={'Medium Link'}
        value={EDIT_CLUB_PROFILE_STORE.getMediumLink}
        icon={'alpha-m-box'}
        onTextChange={val => {
          EDIT_CLUB_PROFILE_STORE.setMediumLink(val);
        }}
        index={5}
      />
    </View>
  );
});

export default EditClubLinks;