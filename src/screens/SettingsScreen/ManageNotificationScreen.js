import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { STUDENT_DETAILS_STORE } from "../../mobx/STUDENT_DETAILS_STORE";
import { NO_FOLLOWED_CLUBS } from "../../utils/ERROR_MESSAGES";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import ClubFollowItem from "./ClubFollowItem";

const ManageNotificationsSettings = observer(({ navigation }) => {
  const goToClub = (club) => {
    navigation.navigate("ClubDescription", { ClubId: club.clubId._id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Manage Notifications</Text>
      <FlatList
        data={STUDENT_DETAILS_STORE.getClubs}
        ListEmptyComponent={
          <Text style={styles.errorStyle}>{NO_FOLLOWED_CLUBS}</Text>
        }
        renderItem={({ item }) => (
          <ClubFollowItem clubItem={item} goToClub={goToClub} />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: moderateScale(18),
    marginHorizontal: scale(HorizontalPadding),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(6),
    fontWeight: "bold",
    // Manually added black text color
    color: "black",
  },
  errorStyle: {
    fontSize: moderateScale(16),
    marginHorizontal: scale(16),
    marginTop: verticalScale(10),
    alignSelf: "center",
    // Manually added black text color
    color: "black",
  },
});

export default ManageNotificationsSettings;
