import React from "react";
import { View } from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API_STORE } from "../../mobx/API_STORE";
import { NO_IMAGE_URL } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors";
import ImageView from "../ImageView";
import Text from "../TextComponent";

const cardDimensions = 123;
const SuggestedEventCard = ({
  eventImage = NO_IMAGE_URL,
  eventName = "NA",
  organizer = "NA",
  isLive = false,
}) => {
  return (
    <View style={styles.card}>
      {isLive ? (
        <View
          style={{
            position: "absolute",
            elevation: 1,
            right: scale(3),
            top: verticalScale(3),
          }}
        >
          <Icon
            name="circle"
            color={colors.EventCard_IsLive}
            size={scale(10)}
          />
        </View>
      ) : (
        <></>
      )}
      <ImageView
        src={API_STORE.getCDN + eventImage}
        style={styles.image}
        resizeMode={"cover"}
      />
      <Text numberOfLines={1} style={styles.title}>
        {eventName}
      </Text>
      <Text numberOfLines={1} style={styles.organizer}>
        {organizer}
      </Text>
    </View>
  );
};

export default SuggestedEventCard;

const styles = ScaledSheet.create({
  card: {
    width: scale(cardDimensions),
    backgroundColor: colors.EventCard_Back,
    alignItems: "center",
    marginBottom: "9@vs",
    borderRadius: "8@s",
    paddingBottom: "8@vs",
    elevation: 1,
  },
  image: {
    width: scale(cardDimensions),
    backgroundColor: "white",
    height: scale(cardDimensions),
    backgroundColor: "white",
    borderTopLeftRadius: "8@s",
    borderTopRightRadius: "8@s",
  },
  title: {
    color: colors.EventCard_Title,
    fontSize: "14@s",
    fontWeight: "bold",
    width: "90%",
    textAlign: "justify",
  },
  organizer: {
    color: colors.GRAY_DARK,
    fontSize: "12@s",
    flex: 1,
    width: "90%",
  },
});
