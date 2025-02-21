import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import { EVENT_EDIT_STORE } from "../../mobx/EVENT_EDIT_STORE";
import * as colors from "../../utils/colors";
import { isValidLink } from "../../utils/helperFunction/FormValidation";
import { MAX_EVENT_LINK_COUNT } from "../../utils/UI_CONSTANTS";
import LinkItem from "./LinkItem";
import styles from "./styles";

const EventEditLinks = observer(() => {
  const toast = useToast();

  return (
    <View>
      <View style={styles.viewScale}>
        <TextInput
          underlineColor="transparent"
          label="Event Links"
          placeholder={`Event Links`}
          style={styles.textInputStyles}
          value={EVENT_EDIT_STORE.getEditLink}
          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
          theme={{
            colors: {
              primary: colors.BLACK,
            },
          }}
          onChangeText={(nLink) => EVENT_EDIT_STORE.setEditLink(nLink)}
          left={<TextInput.Icon name={"link"} color={colors.BLACK} />}
          right={
            <TextInput.Icon
              name={"plus"}
              color={colors.BLACK}
              onPress={async () => {
                if (
                  EVENT_EDIT_STORE.getEditLinks.length > MAX_EVENT_LINK_COUNT
                ) {
                  toast.show("Maximum link count reached", { type: "warning" });
                  return;
                }

                const res = await isValidLink(
                  EVENT_EDIT_STORE.getEditLink.trim()
                );
                if (!res) {
                  toast.show("Not a valid link", {
                    type: "danger",
                  });
                  return;
                }
                EVENT_EDIT_STORE.addLink();
              }}
            />
          }
        />
        {(EVENT_EDIT_STORE.getEditLinks?.length || 0) > 0 && (
          <View style={{ paddingVertical: verticalScale(4) }}>
            {EVENT_EDIT_STORE.getEditLinks.map((link, index) => {
              return <LinkItem item={link} index={index} key={index} />;
            })}
          </View>
        )}
      </View>
    </View>
  );
});

export default EventEditLinks;
