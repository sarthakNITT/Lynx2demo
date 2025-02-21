import React from "react";
import { View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import Text from "../../components/TextComponent";
import * as colors from "../../utils/colors";
import { isComplete } from "../../utils/helperFunction/isComplete";
import { isLive } from "../../utils/helperFunction/isLive";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";

const UI = ({ text, color }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "flex-end",
        marginHorizontal: scale(HorizontalPadding),
        elevation: 1,
        top: verticalScale(4),
        position: "absolute",
        right: scale(9),

        //marginTop: verticalScale(-6),
      }}
    >
      <Icon name="circle" color={color} size={scale(10)} />
      <Text
        style={{
          fontSize: scale(12),
          color: colors.GRAY_DARK,
          textTransform: "uppercase",
        }}
      >
        {" "}
        {text}
      </Text>
    </View>
  );
};
const EventStatusTag = ({ startTime, endTime }) => {
  return (
    <View>
      {isLive(startTime, endTime) ? (
        <>
          <UI text={"Live"} color={colors.LIVE} />
        </>
      ) : (
        <>
          {isComplete(startTime, endTime) ? (
            <>
              <UI text={"Completed"} color={colors.CLOSED} />
            </>
          ) : (
            <UI text={"Upcoming"} color={colors.UPCOMING} />
          )}
        </>
      )}
    </View>
  );
};

export default EventStatusTag;
