import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { verticalScale } from "react-native-size-matters";
import Error from "../../components/Error";
import { EVENT_EDIT_STORE } from "../../mobx/EVENT_EDIT_STORE";
import * as colors from "../../utils/colors";
import styles from "./styles";

const EventEditInput = observer(() => {
  return (
    <View style={{ marginTop: verticalScale(4) }}>
      {/* EVENT TITLE */}
      <View style={styles.viewScale}>
        <TextInput
          style={styles.textInputStyles}
          underlineColor="transparent"
          label="Event Title"
          multiline={true}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          placeholder={`Event Title`}
          value={EVENT_EDIT_STORE.getEditTitle}
          onChangeText={(nTitle) => EVENT_EDIT_STORE.setEditTitle(nTitle)}
          left={<TextInput.Icon name={"lead-pencil"} color={colors.Accent} />}
          right={
            <TextInput.Affix
              text={"/" + EVENT_EDIT_STORE.getCharLeftTitle}
              textStyle={{
                color:
                  EVENT_EDIT_STORE.getCharLeftTitle < 0
                    ? colors.Tertiary
                    : colors.GRAY_DARK,
              }}
            />
          }
        />
        {EVENT_EDIT_STORE.getTitleError === 1 && (
          <Error text="Please fill in the Title" />
        )}
        {EVENT_EDIT_STORE.getTitleError === 2 && (
          <Error text="Exceeds Word Limit" />
        )}
      </View>

      {/* EVENT DESCRIPTION */}
      <View style={styles.viewScale}>
        <TextInput
          style={styles.textInputStyles}
          underlineColor="transparent"
          label="Event Description"
          placeholder={`Event Description`}
          value={EVENT_EDIT_STORE.getEditDesc}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={(nDesc) => EVENT_EDIT_STORE.setEditDesc(nDesc)}
          multiline={true}
          left={<TextInput.Icon name={"text-subject"} color={colors.BLACK} />}
          right={
            <TextInput.Affix
              text={"/" + EVENT_EDIT_STORE.getCharLeftDesc}
              textStyle={{
                color:
                  EVENT_EDIT_STORE.getCharLeftDesc < 0
                    ? colors.Tertiary
                    : colors.GRAY_DARK,
              }}
            />
          }
        />
        {EVENT_EDIT_STORE.getDescError === 1 && (
          <Error text="Please fill in the Description" />
        )}
        {EVENT_EDIT_STORE.getDescError === 2 && (
          <Error text="Exceeds Word Limit" />
        )}
      </View>
    </View>
  );
});

export default EventEditInput;
