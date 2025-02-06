import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import * as color from "../../utils/colors";
import * as uiConstants from "../../utils/UI_CONSTANTS";

export const listItemStyles = StyleSheet.create({
  cardLayout: {
    flexDirection: "row",

    paddingHorizontal: scale(uiConstants.HorizontalPadding),
    paddingVertical: verticalScale(9),
  },
  container: {
    flexDirection: "row",
    backgroundColor: color.WHITE,
    alignItems: "center",
    marginHorizontal: scale(uiConstants.HorizontalPadding),
    marginVertical: verticalScale(3),
    padding: moderateScale(10),
    borderRadius: moderateScale(6),
    elevation: 2,
  },
  textStyle: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    flex: 1,
    marginEnd: scale(8),
  },
  buttonStyles: {
    //flex: 1,
  },
  viewStyle: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyle: {
    borderRadius: moderateScale(9),
    justifyContent: "center",
    alignSelf: "center",
    width: moderateScale(50),
    height: moderateScale(50),
    marginRight: scale(10),
  },
  eventInfo: {
    marginLeft: scale(9),
    justifyContent: "space-evenly",
    flex: 1,
  },
  notificationView: {
    alignSelf: "center",
    marginRight: 0,
  },
  button: {
    marginLeft: scale(79),
    paddingBottom: verticalScale(6),
    //backgroundColor: 'red',
  },
  btn: {
    marginTop: verticalScale(2),
    alignSelf: "baseline",
  },
  notifier: {
    color: color.Tertiary,
    fontSize: scale(14),
    fontWeight: "500",
  },
  title: {
    color: color.BLACK,
    fontSize: scale(14),
    fontWeight: "400",
  },
});

export const listScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: verticalScale(uiConstants.HeaderHeight),
    shadowColor: color.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    backgroundColor: color.WHITE,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: color.WHITE,
  },
  headerText: {
    alignSelf: "center",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});
