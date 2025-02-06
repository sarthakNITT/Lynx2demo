import React from "react";
import { View } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { CALENDAR_STORE } from "../../mobx/CALENDAR_STORE";
import * as color from "../../utils/colors";

const NoEventCard = (props) => {
  return CALENDAR_STORE.getRefreshing ? (
    <></>
  ) : (
    <View style={styles.cardcontainer}>
      <View
        style={{
          width: scale(5),
          backgroundColor: "#444444",
          borderRadius: scale(5),
        }}
      />
      <View style={styles.eventinfo}>
        <Text style={styles.eventName}>No Notice/Event</Text>
      </View>
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
  },
  eventinfo: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-around",
    marginLeft: "5@s",
    marginVertical: "3@vs",
  },
  eventName: {
    fontSize: "16@s",
    fontWeight: "bold",
    color: "black",
  },
});

export default NoEventCard;
