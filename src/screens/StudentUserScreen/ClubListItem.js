import React, { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import ImageView from "../../components/ImageView";
import Text from "../../components/TextComponent";
import { API_STORE } from "../../mobx/API_STORE";
import { TOAST_ERROR_MESSAGE } from "../../utils/ERROR_MESSAGES";
import { listItemStyles } from "./styles";

const ListItem = ({ clubItem, goToClub, refreshFlat }) => {
  const [follow, setFollow] = useState(true);
  const [apiCall, setApiCall] = useState(false);
  const imageUrl = API_STORE.getCDN + clubItem.clubId.profilePic;

  const toast = useToast();

  const showToast = () => {
    toast.show(TOAST_ERROR_MESSAGE, { type: "danger" });
  };

  return (
    <View style={listItemStyles.container}>
      <View style={listItemStyles.viewStyle}>
        <ImageView
          src={imageUrl}
          style={listItemStyles.imageStyle}
          resizeMode={"cover"}
        />
        <Text numberOfLines={2} style={listItemStyles.textStyle}>
          {clubItem.clubId.name}
        </Text>
      </View>
      <View style={listItemStyles.buttonStyles}></View>
    </View>
  );
};

export default ListItem;
