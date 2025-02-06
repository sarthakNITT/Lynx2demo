import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { listItemStyles } from "./styles";
import * as colors from "../../utils/colors";
import { getFormattedDate } from "../../utils/helperFunction/getFormattedDate";
import { getFormattedTime } from "../../utils/helperFunction/getFormattedTime";

const ListItem = ({ circularItem, goToDetail }) => {
  const imageUrl = ""; // API_STORE.getCDN + circularItem.urlId;

  const getTimeGap = (d) => {
    let date = Date.parse(getFormattedDate(d));
    var today = new Date();
    today = Date.parse(getFormattedDate(today));
    let diff = today - date;
    var Difference_In_Days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (Math.floor(Difference_In_Days / 365) >= 1) {
      return Math.floor(Difference_In_Days / 365) + "yr";
    }
    if (Math.floor(Difference_In_Days / 30) >= 1) {
      return Math.floor(Difference_In_Days / 30) + "mo";
    }
    if (Math.floor(Difference_In_Days / 7) >= 1) {
      return Math.floor(Difference_In_Days / 7) + "w";
    }
    if (Difference_In_Days === 0) return "Today";
    else if (Difference_In_Days === 1) return "Yesterday";
    else {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      today = new Date();
      var showDate = new Date(d);
      return days[showDate.getDay()];
    }
  };

  return (
    <View style={listItemStyles.container}>
      {circularItem.isOfficial ? (
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
          <Icon name="verified" color={colors.Accent} size={scale(12)} />
          <Text
            style={{
              fontSize: scale(9),
              color: colors.GRAY_DARK,
              fontWeight: "bold",
            }}
          >
            {" "}
            Official
          </Text>
        </View>
      ) : null}

      <View
        style={{
          ...listItemStyles.cardLayout,
          paddingTop: circularItem.isOfficial
            ? verticalScale(9.9)
            : verticalScale(6),
        }}
      >
        <View style={listItemStyles.eventInfo}>
          <Text numberOfLines={2}>
            <Text style={listItemStyles.title}>{circularItem.title}</Text>
            <Text
              style={{
                fontSize: scale(12),
                //fontWeight: 'bold',
                color:'#656565',
                paddingRight: 10,
              }}
            >
              {"\n"}
              {circularItem.description}
            </Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              color:'#e6e6e6',
              paddingTop: verticalScale(3),
              //alignItems: 'flex-end',
            }}
          >
            <Text style={{ fontSize: scale(12.5) ,color:'#808080'}}>
              {getFormattedDate(circularItem.createdAt)} |{" "}
              {getFormattedTime(circularItem.createdAt)}
            </Text>
            <Text
              style={{
                textAlign: "right",
                flex: 1,
                backgroundColor: "white",
                fontSize: scale(13),
                fontWeight: "300",
                color:'#000000'
              }}
            >
              {getTimeGap(circularItem.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListItem;
