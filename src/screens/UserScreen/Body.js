import { observer } from "mobx-react";
import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { CLUB_USER_STORE } from "../../mobx/CLUB_USER_STORE";
import * as colors from "../../utils/colors";
import {
  FONT_SIZE_USERPAGE_TITLE,
  HorizontalPadding,
} from "../../utils/UI_CONSTANTS";
import PastEventsComponent from "./PastEvents";
import UpcomingEventsComponent from "./UpcomingEvents";

const { width } = Dimensions.get("screen");

const Body = observer(({ functions }) => {
  const scrollView = React.useRef(null);
  const [offset, setOffset] = React.useState(0);

  const goToLive = () => {
    if (scrollView.current != null) {
      CLUB_USER_STORE.setLivePageShow(true);
      scrollView.current.scrollTo({ x: 0, animated: true });
    }
  };

  const goToPast = () => {
    if (scrollView.current != null) {
      CLUB_USER_STORE.setLivePageShow(false);
      scrollView.current.scrollTo({ x: width, animated: true });
    }
  };

  const bgColor = colors.WHITE;

  return (
    <View style={{ backgroundColor: bgColor, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: verticalScale(8),
          marginHorizontal: scale(HorizontalPadding),
        }}
      >
        <Button
          onPress={() => goToLive()}
          color={colors.Accent}
          style={{
            opacity: CLUB_USER_STORE.getLivePageShow ? 1 : 0.35,
            flex: 1,
          }}
          labelStyle={{
            fontWeight: CLUB_USER_STORE.getLivePageShow ? "600" : "normal",
            fontSize: moderateScale(FONT_SIZE_USERPAGE_TITLE),
            textTransform: "none",
          }}
        >
          Live/Upcoming (
          {CLUB_USER_STORE.getUpcomingEvents.length +
            CLUB_USER_STORE.getLiveEvents.length}
          )
        </Button>
        <Button
          onPress={() => goToPast()}
          color={colors.Accent}
          style={{
            opacity: CLUB_USER_STORE.getLivePageShow ? 0.35 : 1,
            flex: 1,
          }}
          labelStyle={{
            fontWeight: CLUB_USER_STORE.getLivePageShow ? "normal" : "600",
            fontSize: moderateScale(FONT_SIZE_USERPAGE_TITLE),
            textTransform: "none",
          }}
        >
          Completed ({CLUB_USER_STORE.getPastEvents.length})
        </Button>
      </View>
      <Divider
        style={{
          left: offset,
          backgroundColor: colors.Accent,
          height: verticalScale(2),
          width: width / 2,
        }}
      />
      <ScrollView
        ref={scrollView}
        style={{ width: width, backgroundColor: colors.USER_PAGE_BG }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          setOffset(offsetX / 2);
        }}
        onScrollEndDrag={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          if (CLUB_USER_STORE.getLivePageShow) {
            if (offsetX <= width / 15) goToLive();
            else goToPast();
          } else {
            if (offsetX <= (14 * width) / 15) goToLive();
            else goToPast();
          }
        }}
      >
        <UpcomingEventsComponent functions={functions} />
        <PastEventsComponent functions={functions} />
      </ScrollView>
    </View>
  );
});

export default Body;
