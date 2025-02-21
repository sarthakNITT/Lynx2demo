import { observer } from "mobx-react";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { STUDENT_DETAILS_STORE } from "../../mobx/STUDENT_DETAILS_STORE";
import * as colors from "../../utils/colors";
import {
  FONT_SIZE_USERPAGE_TITLE,
  HorizontalPadding,
} from "../../utils/UI_CONSTANTS";
import ClubFollowingScreen from "./ClubFollowingScreen";
import InterestedEventsScreen from "./InterestedEventsScreen";

const { width } = Dimensions.get("screen");

const Body = observer(({ navigation, functionCalls }) => {
  const [offset, setOffset] = useState(0);

  const scrollView = React.useRef(null);

  const goToClub = () => {
    if (scrollView.current != null) {
      scrollView.current.scrollTo({ x: 0, animated: true });
      STUDENT_DETAILS_STORE.setClubPageShow(true);
    }
  };

  const goToEvent = () => {
    if (scrollView.current != null) {
      scrollView.current.scrollTo({ x: width, animated: true });
      STUDENT_DETAILS_STORE.setClubPageShow(false);
    }
  };

  const bgColor = colors.WHITE;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: verticalScale(0),
          paddingHorizontal: scale(HorizontalPadding),
          backgroundColor: bgColor,
        }}
      >
        <Button
          onPress={() => goToClub()}
          color={colors.Accent}
          style={{
            opacity: STUDENT_DETAILS_STORE.getClubPageShow ? 1 : 0.35,
            flex: 1,
          }}
          labelStyle={{
            fontWeight: STUDENT_DETAILS_STORE.getClubPageShow
              ? "600"
              : "normal",
            fontSize: moderateScale(FONT_SIZE_USERPAGE_TITLE),
            textTransform: "none",
          }}
        >
          Following ({STUDENT_DETAILS_STORE.getClubs.length})
        </Button>
        <Button
          onPress={() => goToEvent()}
          color={colors.Accent}
          style={{
            opacity: STUDENT_DETAILS_STORE.getClubPageShow ? 0.35 : 1,
            flex: 1,
            color: "black",
          }}
          labelStyle={{
            fontWeight: STUDENT_DETAILS_STORE.getClubPageShow
              ? "normal"
              : "600",
            fontSize: moderateScale(FONT_SIZE_USERPAGE_TITLE),
            textTransform: "none",
          }}
        >
          Interested ({STUDENT_DETAILS_STORE.getInterests.length})
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
        style={{
          width: width,
          backgroundColor: colors.USER_PAGE_BG,
        }}
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
          if (STUDENT_DETAILS_STORE.getClubPageShow) {
            if (offsetX <= width / 15) goToClub();
            else goToEvent();
          } else {
            if (offsetX <= (14 * width) / 15) goToClub();
            else goToEvent();
          }
        }}
      >
        <ClubFollowingScreen
          navigation={navigation}
          goToClub={functionCalls.goToClub}
        />
        <InterestedEventsScreen goToEvent={functionCalls.goToEvent} />
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Body;
