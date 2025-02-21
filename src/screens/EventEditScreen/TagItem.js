import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { EVENT_EDIT_STORE } from "../../mobx/EVENT_EDIT_STORE";
import * as color from "../../utils/colors";

const TagItem = ({ item, index }) => {
  return (
    <View style={styles.container}>
      <Chip
        style={{
          backgroundColor: color.EventDescriptionScreen_TagBackGround,
          marginTop: verticalScale(3),
        }}
        textStyle={{
          fontSize: scale(12),
          color: color.EventDescriptionScreen_TagText,
        }}
        ellipsizeMode="tail"
        numberOfLines={1}
        onClose={() => EVENT_EDIT_STORE.removeTag(index)}
      >
        {item}
      </Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(2),
  },
});

export default TagItem;
