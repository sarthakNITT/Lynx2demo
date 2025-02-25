import React from "react";
import { View } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImageView from "../../components/ImageView";
import Text from "../../components/TextComponent";
import { PreventDoubleClickWithOpacity as TouchableOpacity } from "../../components/TouchableOpacity";
import { API_STORE } from "../../mobx/API_STORE";
import * as color from "../../utils/colors";
import * as colors from "../../utils/colors";
import { getFormattedDate } from "../../utils/helperFunction/getFormattedDate";
import { getFormattedTime } from "../../utils/helperFunction/getFormattedTime";
import { isLive } from "../../utils/helperFunction/isLive";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import LiveEventComponent from "./LiveEventComponent";

const RecentEventCard = ({ eventItem, functions }) => {
  const formattedDate = getFormattedDate(eventItem.startDate);
  const formattedTime = getFormattedTime(eventItem.startDate);
  const liveCheck = isLive(eventItem.startDate, eventItem.endDate);
  return (
    <TouchableOpacity
      style={styles.cardLayout}
      onPress={() => {
        functions.onEventClick(eventItem.EventId);
      }}
    >
      {liveCheck ? (
        <>
          <View style={styles.container}>
            <Icon
              name={"circle"}
              size={scale(10)}
              style={{ color: colors.EventCard_IsLive }}
            />
            <Text
              style={{
                fontSize: scale(9),
                color: colors.GRAY_DARK,
                fontWeight: "bold",
              }}
            >
              {" "}
              LIVE
            </Text>
          </View>
        </>
      ) : null}
      <ImageView
        style={styles.poster}
        src={API_STORE.getCDN + eventItem.poster}
        resizeMode={"cover"}
      />
      <View style={styles.eventInfo}>
        <Text
          style={{
            fontSize: scale(14),
            fontWeight: "bold",
            paddingRight: scale(10),
            color:'#000000',
          }}
          numberOfLines={1}
        >
          {eventItem.Title}
        </Text>

        <Text style={{ fontSize: scale(12),color:'#000000', }}>
          {formattedDate} | {formattedTime}
        </Text>
      </View>
      <View style={styles.notificationView}>
        <LiveEventComponent
          isLive={liveCheck}
          onDeletePress={() => {
            functions.onDeleteClick(eventItem.EventId, eventItem.Title);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  cardLayout: {
    flexDirection: "row",
    padding: "10@ms",
    marginTop: "10@vs",
    borderColor: "grey",
    borderWidth: "0.5@s",
    borderRadius: "5@s",
    marginHorizontal: scale(HorizontalPadding),
    backgroundColor: color.WHITE,
  },
  poster: {
    height: "60@msr",
    width: "60@msr",
    borderRadius: "4@sr",
    backgroundColor: "white",
  },
  eventInfo: {
    marginLeft: "10@s",
    justifyContent: "space-evenly",
    flex: 1,
  },
  notificationView: {
    alignSelf: "center",
    marginRight: 0,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: scale(6),
    top: scale(3),
  },
});
export default RecentEventCard;
