import React from "react";
import { SectionList, View, Dimensions } from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { CLUB_DESCRIPTION_STORE } from "../../mobx/CLUB_DESCRIPTION_STORE";
import * as colors from "../../utils/colors";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import EventCard from "./UpcomingEventCard";
import { listScreenStyles } from "./styles";
const EventsView = ({
  liveEventArray,
  upcomingEventArray,
  goToDetail,
  numberOfCirculars,
}) => {
  if (numberOfCirculars > 3) {
    numberOfCirculars = 3;
  } else if (numberOfCirculars == 0) {
    numberOfCirculars = 1;
  }
  const NoEventString =
    CLUB_DESCRIPTION_STORE.getData.name + " has no upcoming events scheduled";
  const { width } = Dimensions.get("screen");
  const sections =
    upcomingEventArray.length === 0 && liveEventArray.length === 0
      ? []
      : [
          {
            title: "Live Events",
            isLive: true,
            data: liveEventArray.slice(),
          },
          {
            title: "Upcoming Events",
            isLive: false,
            data: upcomingEventArray.slice(),
          },
        ];

  return (
    <View
      style={{
        ...listScreenStyles.container,
        width: width,
      }}
    >
      <View style={styles.card}>
        <SectionList
          sections={sections}
          ListEmptyComponent={
            <View
              style={{
                backgroundColor: "transparent",
                height: verticalScale(numberOfCirculars * 110),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ ...styles.emptyArray }}>{NoEventString}</Text>
            </View>
          }
          renderItem={({ item, section }) => (
            <View
              style={{
                marginHorizontal: scale(HorizontalPadding),
              }}
            >
              <EventCard
                isLive={section.isLive}
                name={item.Title}
                url={item.poster}
                description={item.Description}
                date={item.startDate}
                eventId={item.EventId}
                goToDetail={goToDetail}
              />
            </View>
          )}
          renderSectionHeader={({ section }) => <></>}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ padding: verticalScale(6) }} />}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          bouncesZoom={false}
        />
      </View>
    </View>
  );
};

export default EventsView;

const styles = ScaledSheet.create({
  card: {
    backgroundColor: "transparent",
    color: colors.BLACK,
  },
  emptyArray: {
    color: colors.BLACK,
    fontWeight: "bold",
    fontSize: "16@s",
    padding: "15@vs",
    textAlign: "center",

    paddingHorizontal: scale(HorizontalPadding),
  },
  head: {
    color: colors.BLACK,
    fontWeight: "bold",
    fontSize: "18@s",
    padding: "10@vs",
    paddingHorizontal: scale(HorizontalPadding),
  },
});
