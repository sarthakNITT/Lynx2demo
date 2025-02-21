import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as colors from "../../utils/colors";
import { ICON_SIZE } from "../../utils/UI_CONSTANTS";

const LiveEventComponent = ({ isLive, onDeletePress }) => {
  return (
    <TouchableOpacity onPress={onDeletePress}>
      <Icon
        name={"delete"}
        size={scale(ICON_SIZE)}
        style={{ color: colors.Tertiary }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    fontSize: scale(9),
    marginHorizontal: scale(2),
    fontWeight: "bold",
    color: colors.GRAY_DARK,
  },
});

export default LiveEventComponent;
