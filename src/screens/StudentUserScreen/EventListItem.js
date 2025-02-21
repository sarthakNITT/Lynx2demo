import React from "react";
import { View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import ImageView from "../../components/ImageView";
import Text from "../../components/TextComponent";
import { API_STORE } from "../../mobx/API_STORE";
import { listItemStyles } from "./styles";

const ListItem = ({ eventItem, goToEvent }) => {
  const imageUrl = API_STORE.getCDN + eventItem.poster;

  return (
    <View style={listItemStyles.container}>
      <View style={listItemStyles.viewStyle}>
        <ImageView
          src={imageUrl}
          style={listItemStyles.imageStyle}
          resizeMode={"cover"}
        />
        <View style={{ flex: 1 }}>
          <Text style={listItemStyles.textStyle} numberOfLines={2}>
            {eventItem.title}
          </Text>
          <Text
            style={{
              ...listItemStyles.textStyle,
              fontSize: moderateScale(14),
              fontWeight: "normal",
              marginTop: verticalScale(2),
              color: "black",
            }}
          >
            {eventItem.clubName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ListItem;
