/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Text from "../../components/TextComponent";
import * as colors from "../../utils/colors";

const FileItem = ({ item, deleteItem }) => {
  return (
    <View style={styles.fileItem}>
      <Text style={styles.fileItemText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteItem}
        onPress={() => deleteItem(item.uri)}
      >
        <MaterialCommunityIcons
          name="trash-can"
          color={colors.Tertiary}
          size={scale(21)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    flex: 1,
    backgroundColor: colors.CreationScreen_FileItemBg,
    margin: moderateScale(5),
    marginHorizontal: scale(20),
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    borderRadius: moderateScale(9),
  },
  fileItemText: {
    padding: moderateScale(20),
    paddingVertical: verticalScale(10),
    fontSize: scale(12),
    color: colors.CreationScreen_FileItemText,
    marginRight: scale(40),
  },
  deleteItem: {
    padding: moderateScale(5),
    borderRadius: scale(20),
    right: scale(20),
    position: "absolute",
    backgroundColor: colors.CreationScreen_DeleteItemBg,
  },
});

export default FileItem;
