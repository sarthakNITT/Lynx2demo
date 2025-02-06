import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import * as color from "../../utils/colors";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";

const styles = StyleSheet.create({
  viewScale: {
    paddingHorizontal: scale(HorizontalPadding),
    paddingVertical: verticalScale(4),
  },
  textInputStyles: {
    backgroundColor: color.GRAY_LIGHT,
    borderTopRightRadius: moderateScale(9),
    borderTopLeftRadius: moderateScale(9),
    borderBottomLeftRadius: moderateScale(9),
    borderBottomRightRadius: moderateScale(9),
  },
});

export default styles;
