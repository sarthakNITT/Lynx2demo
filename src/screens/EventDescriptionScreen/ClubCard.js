import { observer } from "mobx-react";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import { toggleFollowApi } from "../../apis/followUnfollowApi";
import Text from "../../components/TextComponent";
import { PreventDoubleClickWithOpacity as TouchableOpacity } from "../../components/TouchableOpacity";
import { API_STORE } from "../../mobx/API_STORE";
import { CLUB_DESCRIPTION_STORE } from "../../mobx/CLUB_DESCRIPTION_STORE";
import { EVENT_DESCRIPTION_STORE } from "../../mobx/EVENT_DESCRIPTION_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import * as colors from "../../utils/colors";
import { TOAST_ERROR_MESSAGE } from "../../utils/ERROR_MESSAGES";
import * as USER_TYPE from "../../utils/USER_TYPE";
import { getAllStudentDetails } from "../StudentUserScreen/apiCalls";

const WIDTH = Dimensions.get("window").width;

const ClubCard = observer(({ name, imgID, navigation, clubID, route }) => {
  const toast = useToast();

  const showToast = () => {
    toast.show(TOAST_ERROR_MESSAGE, { type: "danger" });
  };
  const [ApiCall, setApiCall] = useState(false);
  return (
    <View
      style={{
        paddingTop: verticalScale(15),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (!route.params.fromClubDescription) {
            navigation.push("ClubDescription", {
              ClubId: clubID,
              eventId: route.params.eventId,
              fromEventDescription: true,
            });
          } else {
            navigation.pop();
          }
        }}
      >
        <Card.Cover
          source={{ uri: API_STORE.getCDN + imgID.trim() }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.cardDetails}>
        <TouchableOpacity
          onPress={() => {
            if (!route.params.fromClubDescription) {
              navigation.push("ClubDescription", {
                ClubId: clubID,
                eventId: route.params.eventId,
                fromEventDescription: true,
              });
            } else {
              navigation.pop();
            }
          }}
        >
          <Text numberOfLines={2} style={styles.title}>
            {name}
          </Text>
        </TouchableOpacity>
        <Text style={styles.followers}>
          {EVENT_DESCRIPTION_STORE.getData.club.followers} FOLLOWERS
        </Text>
      </View>
      {
        USER_STORE.getUserType === USER_TYPE.STUDENT && (
          // route.params.fromScreen !== INTERESTED_EVENTS_PROFILE ? (
          <Button
            mode="outlined"
            disabled={ApiCall}
            loading={ApiCall}
            onPress={() => {
              setApiCall(true);
              toggleFollowApi(
                clubID,
                () => {
                  //success callback
                  getAllStudentDetails(true);
                  if (EVENT_DESCRIPTION_STORE.getIsFollowingClub) {
                    EVENT_DESCRIPTION_STORE.setDecrementFollower();
                    if (route.params.fromClubDescription) {
                      CLUB_DESCRIPTION_STORE.setDecrementFollower();
                      CLUB_DESCRIPTION_STORE.setIsFollowingClub(false);
                    }
                  } else {
                    EVENT_DESCRIPTION_STORE.setIncrementFollower();
                    if (route.params.fromClubDescription) {
                      CLUB_DESCRIPTION_STORE.setIncrementFollower();
                      CLUB_DESCRIPTION_STORE.setIsFollowingClub(true);
                    }
                  }
                  EVENT_DESCRIPTION_STORE.setIsFollowingClub(
                    !EVENT_DESCRIPTION_STORE.getIsFollowingClub
                  );
                  setApiCall(false);
                },
                () => {
                  //failure callback
                  showToast();
                  setApiCall(false);
                }
              );
            }}
            color={colors.EventDescriptionScreen_Follow}
            textColor="#000000"
            labelStyle={{ fontSize: scale(10), padding: 0, fontWeight: "bold" }}
            style={{ alignSelf: "center"}}
          >
            {EVENT_DESCRIPTION_STORE.getIsFollowingClub
              ? "Following"
              : "Follow"}
          </Button>
        )
        // ) : null
      }
    </View>
  );
});

export default ClubCard;

const styles = ScaledSheet.create({
  image: {
    marginTop: "5@s",
    width: "80@s",
    marginBottom: "5@s",
    marginRight: "5@s",
    height: "80@s",
    borderRadius: "40@s",
    elevation: 1,
    shadowColor: "black",

  },
  title: {
    //color: colors.EventCard_Title,
    color:'#000000',
    fontSize: "16@s",
    fontWeight: "bold",
  },
  cardDetails: {
    flexGrow: 1,
    width: 0,
    margin: "5@s",
    marginRight: 0,
    justifyContent: "center",
    marginRight: "5@s",
  },
  followers: {
    color: colors.Tertiary,
    fontSize: scale(10),
    fontWeight: "bold",
    marginBottom: "3@vs",
    
  },
});
