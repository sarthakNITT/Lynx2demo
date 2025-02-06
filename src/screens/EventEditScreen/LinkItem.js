import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Text from "../../components/TextComponent";
import { EVENT_EDIT_STORE } from "../../mobx/EVENT_EDIT_STORE";
import * as color from "../../utils/colors";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";

const LinkItem = ({ item, index }) => {
  return (
    <View style={styles.linkItem}>
      <Text style={styles.linkItemText} numberOfLines={1}>
        {item}
      </Text>
      <TouchableOpacity
        style={styles.deleteItem}
        onPress={() => EVENT_EDIT_STORE.removeLink(index)}
      >
        <MaterialCommunityIcons
          name="trash-can"
          color={color.Tertiary}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  linkItem: {
    flex: 1,
    backgroundColor: color.Primary,
    elevation: 1,
    marginVertical: moderateScale(1),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(HorizontalPadding),
  },
  linkItemText: {
    flex: 1,
    padding: moderateScale(10),
    paddingLeft: moderateScale(5),
    fontSize: scale(14),
    color: color.FontColor,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  deleteItem: {
    padding: moderateScale(5),
    borderRadius: moderateScale(20),
    right: scale(5),
    elevation: 1,
    backgroundColor: color.CreationScreen_DeleteItemBg,
  },
});

export default LinkItem;
