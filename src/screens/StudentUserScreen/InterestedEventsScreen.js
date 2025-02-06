import { observer } from "mobx-react";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { moderateScale, verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { STUDENT_DETAILS_STORE } from "../../mobx/STUDENT_DETAILS_STORE";
import * as colors from "../../utils/colors";
import { getAllStudentDetails } from "./apiCalls";
import ListItem from "./EventListItem";
import { listScreenStyles } from "./styles";

const headerFooterComponent = () => {
  return <View style={{ height: verticalScale(6) }} />;
};

const { width } = Dimensions.get("screen");

const InterestedEventsScreen = observer(({ goToEvent }) => {
  const onRefresh = () => {
    STUDENT_DETAILS_STORE.setRefresh(true);
    getAllStudentDetails(true);
  };
  const [timeout, setTimeouts] = useState();
  const [clicked, setClicked] = useState(true);
  const delay = 1000;

  const handleClick = (onPress) => {
    if (clicked) {
      onPress();
      setClicked(false);
    }
    clearTimeout(timeout);
    setTimeouts(
      setTimeout(function () {
        setClicked(true);
      }, delay)
    );
  };

  const [click, setClick] = useState(false);
  return (
    <View style={{ ...listScreenStyles.container, width: width }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={STUDENT_DETAILS_STORE.getRefresh}
            colors={[colors.Accent]}
            tintColor={colors.Accent}
            onRefresh={onRefresh}
          />
        }
        style={listScreenStyles.listStyle}
        keyExtractor={(item) => item._id}
        data={STUDENT_DETAILS_STORE.getInterests}
        ListHeaderComponent={headerFooterComponent}
        ListFooterComponent={headerFooterComponent}
        ListEmptyComponent={
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: verticalScale(10),
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(16),
                alignSelf: "center",
              }}
            >
              Click on
            </Text>
            <IconButton
              onPress={() => setClick(!click)}
              icon={click ? "star" : "star-outline"}
              color={colors.Tertiary}
              size={moderateScale(25)}
            />
            <Text
              style={{
                fontSize: moderateScale(16),
                alignSelf: "center",
              }}
            >
              to respond to an event.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() =>
              handleClick(() => {
                goToEvent(item);
              })
            }
          >
            <ListItem eventItem={item} goToEvent={goToEvent} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
});

export default InterestedEventsScreen;
