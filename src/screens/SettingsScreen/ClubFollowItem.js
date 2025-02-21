import { observer } from "mobx-react";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { toggleSubscriptionApi } from "../../apis/subUnsubClub";
import ImageView from "../../components/ImageView";
import Text from "../../components/TextComponent";
import { API_STORE } from "../../mobx/API_STORE";
import { STUDENT_DETAILS_STORE } from "../../mobx/STUDENT_DETAILS_STORE";
import * as colors from "../../utils/colors";
import { TOAST_ERROR_MESSAGE } from "../../utils/ERROR_MESSAGES";
import { listItemStyles } from "../StudentUserScreen/styles";

const ListItem = observer(({ clubItem, goToClub }) => {
  const imageUrl = API_STORE.getCDN + clubItem.clubId.profilePic;
  const [busy, setBusy] = React.useState(false);

  const toast = useToast();

  const onSuccess = () => {
    setBusy(false);
    STUDENT_DETAILS_STORE.toggleClubSubscription(clubItem.clubId._id);
  };

  const onFailure = () => {
    setBusy(false);
    toast.show(TOAST_ERROR_MESSAGE, { type: "danger" });
  };

  const onBellPress = () => {
    setBusy(true);
    toggleSubscriptionApi(clubItem.clubId._id, onSuccess, onFailure);
  };

  return (
    <TouchableOpacity
      style={listItemStyles.container}
      onPress={() => goToClub(clubItem)}
    >
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
      <View style={{ ...listItemStyles.buttonStyles, right: scale(5) }}>
        {busy ? (
          <ActivityIndicator color={colors.Accent} size={28} />
        ) : (
          <TouchableOpacity disabled={busy} onPress={onBellPress}>
            <MaterialCommunityIcons
              name={clubItem.isSubscribed ? "bell" : "bell-off-outline"}
              size={28}
              color={colors.Accent}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
});

export default ListItem;
