import {observer} from 'mobx-react';
import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';
import * as colors from '../../utils/colors';
import {
  CLUB_DESCRIPTION_MAX_SIZE,
  HorizontalPadding,
} from '../../utils/UI_CONSTANTS';

const TEXT_INPUT = ({
  placeholder,
  label,
  icon,
  onTextChange,
  showCharCount,
  charCount,
  value,
  maxLength = 1000,
  keyboardType = 'default',
  multiline = false,
}) => {
  return (
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
  );
};
const MAX_DESCRIPTION_CHAR_LIMIT = CLUB_DESCRIPTION_MAX_SIZE;

const EditDescription = observer(() => {
  return (
    <View>
      <TEXT_INPUT
        label={'Club Description'}
        placeholder={'Club Description'}
        icon={'information'}
        value={EDIT_CLUB_PROFILE_STORE.getClubDescription}
        multiline={true}
        onTextChange={text => {
          EDIT_CLUB_PROFILE_STORE.setClubDescription(text);
        }}
        showCharCount={true}
        charCount={
          MAX_DESCRIPTION_CHAR_LIMIT -
          EDIT_CLUB_PROFILE_STORE.getClubDescription.length
        }
      />
    </View>
  );
});

export default EditDescription;