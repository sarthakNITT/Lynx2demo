import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import ImageView from "../../components/ImageView";
import Text from "../../components/TextComponent";
import { PreventDoubleClickWithOpacity as TouchableOpacity } from "../../components/TouchableOpacity";
import { ANNOUNCEMENT_DETAILS_STORE } from "../../mobx/ANNOUNCEMENT_DETAILS_STORE";
import { API_STORE } from "../../mobx/API_STORE";
import { getFormattedDate } from "../../utils/helperFunction/getFormattedDate";
import { getFormattedTime } from "../../utils/helperFunction/getFormattedTime";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";

const CreatorDetails = observer(({ navigation }) => {
  // ANNOUNCEMENT_DETAILS_STORE.getData.club.profilePic =
  //   ANNOUNCEMENT_DETAILS_STORE.getData.club.profilePic || "";
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: scale(HorizontalPadding),
        paddingTop: verticalScale(HorizontalPadding),
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ ...styles.image, elevation: 0 }}
        onPress={() => {
          navigation.navigate(
            "ClubDescription",
            { ClubId: ANNOUNCEMENT_DETAILS_STORE.getData.club._id },
            { initial: false }
          );
        }}
      >
        <ImageView
          src={
            API_STORE.getCDN +
            ANNOUNCEMENT_DETAILS_STORE.getData.club.profilePic
          }
          style={styles.image}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
      <View style={{ marginHorizontal: scale(10) }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              "ClubDescription",
              { ClubId: ANNOUNCEMENT_DETAILS_STORE.getData.club._id },
              { initial: false }
            );
          }}
        >
          <Text numberOfLines={3} style={styles.clubName}>
            {ANNOUNCEMENT_DETAILS_STORE.getData.club.name}
          </Text>
        </TouchableOpacity>

        <Text style={styles.time}>
          {getFormattedDate(ANNOUNCEMENT_DETAILS_STORE.getData.createdAt)} |{" "}
          {getFormattedTime(ANNOUNCEMENT_DETAILS_STORE.getData.createdAt)}
        </Text>
      </View>
    </View>
  );
});

export default CreatorDetails;

const styles = StyleSheet.create({
  image: {
    height: scale(70),
    width: scale(70),
    borderRadius: scale(35),
  },

  time: {
    fontSize: scale(14),
    fontWeight: "500",
    color: "black",
  },
  clubName: {
    fontSize: scale(16),
    fontWeight: "bold",
    paddingBottom: verticalScale(6),
    color: "black",
  },
});
