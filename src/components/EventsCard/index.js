import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Share, View } from "react-native";
import { IconButton } from "react-native-paper";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/MaterialIcons";
import { toggleInterestedApi } from "../../apis/toggleInterested";
import { API_STORE } from "../../mobx/API_STORE";
import { EVENT_DESCRIPTION_STORE } from "../../mobx/EVENT_DESCRIPTION_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import { getAllStudentDetails } from "../../screens/StudentUserScreen/apiCalls";
import { DEEP_LINK_BASE_URL } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors";
import { TOAST_ERROR_MESSAGE } from "../../utils/ERROR_MESSAGES";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import { STUDENT } from "../../utils/USER_TYPE";
import ImageView from "../ImageView";
import Text from "../TextComponent";

const EventsCard = observer(
  ({
    date,
    time,
    name,
    desc,
    eventImage,
    organizer,
    isLive = false,
    wasInterested = false,
    eventId,
    urlId,
  }) => {
    const [interest, setInterest] = useState(false);
    const toast = useToast();

    const showToast = (msg = "", success = false) => {
      if (msg === "") toast.show(TOAST_ERROR_MESSAGE, { type: "danger" });
      else {
        if (!success) toast.show(msg, { type: "warning" });
        else toast.show(msg, { type: "success", placement: "top" });
      }
    };

    useEffect(() => {
      setInterest(wasInterested);
    }, [wasInterested]);

    const [ApiCall, setApiCall] = useState(false);

    return (
      <View style={styles.card}>
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

        <View
          style={{
            justifyContent: "center",
            elevation: 0,
            backgroundColor: colors.Accent,
            ...styles.image,
          }}
        >
          <ImageView
            src={API_STORE.getCDN + eventImage}
            style={styles.image}
            resizeMode={"cover"}
          />
        </View>
        <View style={styles.cardDetails}>
          <Text numberOfLines={2} style={styles.title}>
            {name}
          </Text>
          <Text style={styles.desc} numberOfLines={1} ellipsizeMode={"tail"}>
            {desc}
          </Text>
          <Text numberOfLines={1} style={styles.date}>
            {date} | {time}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text numberOfLines={1} style={styles.organizer}>
              {organizer}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: verticalScale(0),
              }}
            >
              {USER_STORE.getUserType === STUDENT ? (
                <IconButton
                  onPress={() => {
                    setApiCall(true);
                    toggleInterestedApi(
                      eventId,
                      () => {
                        //feedsAPI(true);

                        getAllStudentDetails(true);
                        setInterest(!interest);
                        EVENT_DESCRIPTION_STORE.reset();
                        // if (!interest) {
                        //   showToast(
                        //     'You will receive notifications and updates from this event!',
                        //     true,
                        //   );
                        // }
                        setApiCall(false);
                      },
                      () => {
                        showToast();
                        setApiCall(false);
                        //failure
                      }
                    );
                  }}
                  color={colors.EventCard_Bookmark}
                  style={styles.icon}
                  icon={interest ? "star" : "star-outline"}
                  disabled={ApiCall}
                />
              ) : (
                <></>
              )}

              <IconButton
                onPress={async () => {
                  try {
                    const result = await Share.share({
                      message: DEEP_LINK_BASE_URL + `/e/${urlId}`,
                      url: DEEP_LINK_BASE_URL + `/e/${urlId}`,
                      title: `${name} by ${organizer}`,
                    });
                  } catch (error) {
                    showToast(error.message);
                  }
                }}
                color={colors.EventCard_ShareIcon}
                style={{ ...styles.icon, marginLeft: scale(2) }}
                icon={"share-variant"}
                disabled={false}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
);

export default EventsCard;

const styles = ScaledSheet.create({
  card: {
    marginVertical: "3@vs",
    marginHorizontal: "5@s",
    display: "flex",
    flexDirection: "row",
    padding: scale(HorizontalPadding),
    backgroundColor: colors.EventCard_Back,
    borderRadius: "8@s",
    elevation: 1,
    alignItems: "center",
  },
  image: {
    width: "100@s",
    marginRight: "5@s",
    height: "100@s",
    borderRadius: "8@s",
    backgroundColor: "white",
  },
  cardDetails: {
    flexGrow: 1,
    width: 0,
    justifyContent: "space-evenly",
    marginHorizontal: scale(5),

    marginTop: verticalScale(3),
  },

  title: {
    marginBottom: "3@vs",
    color: colors.EventCard_Title,
    fontSize: "14@s",
    fontWeight: "bold",
    textAlign: "justify",
  },
  desc: { fontSize: "12@s", fontWeight: "500", textAlign: "justify" ,color:'#e6e6e6'},
  date: {
    fontWeight: "500",
    fontSize: "12@s",
    color: colors.EventCard_Date,
  },
  organizer: {
    color: colors.GRAY_DARK,
    fontSize: "12@s",
    flex: 1,
  },
  icon: {
    marginHorizontal: "6@s",
    marginBottom: "3@vs",
    alignSelf: "flex-end",
  },
  link: {
    color: colors.Primary,
    fontWeight: "600",
  },
});
