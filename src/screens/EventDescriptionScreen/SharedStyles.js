import { scale, ScaledSheet } from "react-native-size-matters";
import * as colors from "../../utils/colors";

const sharedStyles = ScaledSheet.create({
  fragment: {
    paddingHorizontal: scale(0),
    paddingBottom: "10@vs",
  },
  title: {
    paddingVertical: "6@vs",
    fontSize: "18@s",
    fontWeight: "bold",
    // backgroundColor: 'red',
    color: colors.EventDescriptionScreen_Title,
  },
  url: {
    paddingBottom: "6@vs",
    color: colors.EventDescriptionScreen_url,
    fontSize: "12@s",
  },
});
export default sharedStyles;
