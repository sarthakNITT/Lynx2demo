import { observer } from "mobx-react";
import React from "react";
import { Dimensions, FlatList, RefreshControl, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { CLUB_USER_STORE } from "../../mobx/CLUB_USER_STORE";
import * as colors from "../../utils/colors";
import { NO_EVENTS_CLUBS } from "../../utils/ERROR_MESSAGES";
import RecentEventsCard from "./RecentEventCard";

const headerFooterComponent = () => {
  return <View style={{ height: verticalScale(6) }} />;
};

const { width } = Dimensions.get("screen");

const UpcomingEventsComponent = observer(({ functions }) => {
  return (
    <View style={{ flex: 1, width: width }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={CLUB_USER_STORE.getRefresh}
            colors={[colors.Accent]}
            tintColor={colors.Accent}
            onRefresh={functions.onRefresh}
          />
        }
        ListHeaderComponent={headerFooterComponent}
        ListFooterComponent={headerFooterComponent}
        ListEmptyComponent={
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: moderateScale(16),
                marginHorizontal: scale(16),
                marginTop: verticalScale(10),
                alignSelf: "center",
                color:'#000000',
              }}
            >
              {NO_EVENTS_CLUBS}
            </Text>
          </View>
        }
        data={[
          ...CLUB_USER_STORE.getLiveEvents,
          ...CLUB_USER_STORE.getUpcomingEvents,
        ]}
        renderItem={({ item }) => (
          <RecentEventsCard eventItem={item} functions={functions} />
        )}
      />
    </View>
  );
});

export default UpcomingEventsComponent;
