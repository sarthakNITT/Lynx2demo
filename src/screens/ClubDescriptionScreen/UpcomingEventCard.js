import React from "react";
import { View } from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImageView from "../../components/ImageView";
import Text from "../../components/TextComponent";
import { PreventDoubleClickWithOpacity as TouchableOpacity } from "../../components/TouchableOpacity";
import { API_STORE } from "../../mobx/API_STORE";
import * as colors from "../../utils/colors";
import { getFormattedDate } from "../../utils/helperFunction/getFormattedDate";
import { getFormattedTime } from "../../utils/helperFunction/getFormattedTime";

const EventCard = ({
  isLive,
  name,
  date,
  description,
  url,
  eventId,
  goToDetail,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        goToDetail(eventId, "Event");
      }}
    >
      <View style={styles.cardLayout}>
        {isLive ? (
          <View
            style={{
              position: "absolute",
              paddingHorizontal: scale(3),
              flexDirection: "row",
              right: scale(9),
              top: verticalScale(1),
              borderRadius: scale(18),
              alignItems: "center",
            }}
          >
            <Icon
              name="circle"
              color={colors.EventCard_IsLive}
              size={scale(10)}
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
        ) : (
          <></>
        )}
        <ImageView
          style={styles.poster}
          src={API_STORE.getCDN + url}
          resizeMode={"cover"}
        />
        <View style={styles.eventInfo}>
          <Text
            style={{
              fontSize: scale(14),
              fontWeight: "bold",
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: scale(12),
              fontWeight: "400",
            }}
            numberOfLines={1}
          >
            {description}
          </Text>
          <Text style={{ fontSize: scale(12) }}>
            {getFormattedDate(date)} | {getFormattedTime(date)}
          </Text>
        </View>
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
  },
  poster: {
    height: "60@msr",
    width: "60@msr",
    borderRadius: "2@sr",
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
});
export default EventCard;
