import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { moderateScale, scale, ScaledSheet } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { API_STORE } from "../../mobx/API_STORE";
import { NO_IMAGE_URL } from "../../utils/API_CONSTANTS";
import * as color from "../../utils/colors";
import { getFormattedDate } from "../../utils/helperFunction/getFormattedDate";
import { getFormattedTime } from "../../utils/helperFunction/getFormattedTime";

const EventCard = (props) => {
  const eventData = props.data;
  // console.log('Event Card' + JSON.stringify(eventData));
  const sameDay =
    getFormattedDate(eventData.startDate) ===
    getFormattedDate(eventData.endDate);
  return (
    <View style={styles.cardcontainer}>
      <View
        style={{
          width: scale(6),
          backgroundColor: color.EventCard_Bar,
          borderRadius: scale(5),
        }}
      />
      <View style={styles.eventinfo}>
        <Text style={styles.eventName} numberOfLines={1}>
          {eventData.Title}
        </Text>
        {sameDay ? (
          <Text style={styles.time}>
            From {getFormattedTime(eventData.startDate)} to{" "}
            {getFormattedTime(eventData.endDate)}
          </Text>
        ) : (
          <Text style={styles.time}>
            From {getFormattedTime(eventData.startDate)}
          </Text>
        )}
      </View>
      <Avatar.Image
        size={moderateScale(50)}
        style={styles.profImg}
        source={
          eventData.Club.profilePic == null
            ? { uri: NO_IMAGE_URL }
            : { uri: API_STORE.getCDN + eventData.Club.profilePic }
        }
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  cardcontainer: {
    flexDirection: "row",
    borderColor: color.cardborder,
    borderWidth: "1@s",
    borderRadius: "5@s",
    marginTop: "5@vs",
    padding: "5@s",
    marginHorizontal: "10@s",
    backgroundColor: color.EventCard_Back,
  },
  eventinfo: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-around",
    marginLeft: "5@s",
  },
  profImg: {
    alignSelf: "center",
    backgroundColor: color.EventCard_imgbck,
    marginRight: "5@s",
  },
  eventName: {
    fontSize: "16@s",
    fontWeight: "bold",
  },
  time: {
    fontSize: "13@s",
  },
});

export default EventCard;
