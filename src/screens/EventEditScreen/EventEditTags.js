import { observer } from "mobx-react";
import React from "react";
import { Dimensions, View } from "react-native";
import { TextInput } from "react-native-paper";
import { verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import { EVENT_EDIT_STORE } from "../../mobx/EVENT_EDIT_STORE";
import * as colors from "../../utils/colors";
import { MAX_EVENT_TAG_COUNT, MAX_TAG_LENGTH } from "../../utils/UI_CONSTANTS";
import styles from "./styles";
import TagItem from "./TagItem";

const WIDTH = Dimensions.get("window").width;

const EventEditTags = observer(() => {
  const toast = useToast();

  return (
    <View style={{ width: WIDTH }}>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Add Tags"
          placeholder={`Event Tags`}
          autoCapitalize="none"
          multiline={true}
          style={styles.textInputStyles}
          value={EVENT_EDIT_STORE.getEditTag}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          onChangeText={(nTag) => EVENT_EDIT_STORE.setEditTag(nTag)}
          left={<TextInput.Icon name={"tag"} color={colors.BLACK} />}
          right={
            <TextInput.Icon
              name={"plus"}
              color={colors.BLACK}
              onPress={() => {
                if (EVENT_EDIT_STORE.getEditTag.trim().length < 2) {
                  toast.show(`Tag length too small`, {
                    type: "warning",
                  });
                  return;
                }

                if (
                  EVENT_EDIT_STORE.getEditTag.trim().length > MAX_TAG_LENGTH
                ) {
                  toast.show(`Max tag length is ${MAX_TAG_LENGTH}`, {
                    type: "danger",
                  });
                  return;
                }

                if (
                  EVENT_EDIT_STORE.getEditTags.length + 1 >
                  MAX_EVENT_TAG_COUNT
                ) {
                  toast.show(`Max tag count is ${MAX_EVENT_TAG_COUNT}`, {
                    type: "danger",
                  });
                  return;
                }
                EVENT_EDIT_STORE.addTag();
              }}
            />
          }
        />
        {(EVENT_EDIT_STORE.getEditTags?.length || 0) > 0 && (
          <View
            style={{
              paddingVertical: verticalScale(4),
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {EVENT_EDIT_STORE.getEditTags.map((item, index) => {
              return <TagItem item={item} index={index} key={index} />;
            })}
          </View>
        )}
        {/* {EVENT_EDIT_STORE.getEditTags.length > 0 && (
          <View
            style={{
              paddingVertical: verticalScale(4),
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {EVENT_EDIT_STORE.getEditTags.map((item, index) => {
              return <TagItem item={item} index={index} key={index} />;
            })}
          </View>
        )} */}
      </View>
    </View>
  );
});

export default EventEditTags;
