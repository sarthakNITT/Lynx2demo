import React, { useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import ListItem from "./circularItem";
import { verticalScale, moderateScale, scale } from "react-native-size-matters";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import Text from "../../components/TextComponent";
import { CLUB_DESCRIPTION_STORE } from "../../mobx/CLUB_DESCRIPTION_STORE";
import * as colors from "../../utils/colors";
import { listScreenStyles } from "./styles";

const CircularView = ({ goToDetail, onRefresh }) => {
  const [timeout, setTimeouts] = useState();
  const [clicked, setClicked] = useState(true);
  const delay = 1000;
  const NoCircularString =
    CLUB_DESCRIPTION_STORE.getData.name + " has not released any circulars yet";
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
  let numberOfCirculars = CLUB_DESCRIPTION_STORE.getCirculars.length;
  if (numberOfCirculars == 0) {
    numberOfCirculars = 1;
  }
  const headerFooterComponent = () => {
    return <View style={{ height: verticalScale(6) }} />;
  };

  const { width } = Dimensions.get("screen");

  return (
    <View
      style={{
        ...listScreenStyles.container,
        width: width,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={CLUB_DESCRIPTION_STORE.getRefresh}
            colors={[colors.Accent]}
            tintColor={colors.Accent}
            onRefresh={onRefresh}
          />
        }
        style={listScreenStyles.listStyle}
        keyExtractor={(item) => item._id}
        data={CLUB_DESCRIPTION_STORE.getCirculars.slice(0, 3)}
        ListHeaderComponent={headerFooterComponent}
        ListFooterComponent={headerFooterComponent}
        ListEmptyComponent={
          <View
            style={{
              backgroundColor: "transparent",
              height: verticalScale(numberOfCirculars * 110),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.BLACK,
                fontWeight: "bold",
                fontSize: scale(16),
                padding: verticalScale(15),
                paddingTop: 0,
                textAlign: "center",
                paddingHorizontal: scale(HorizontalPadding),
              }}
            >
              {NoCircularString}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() =>
              handleClick(() => {
                goToDetail(item._id, "Circular");
              })
            }
          >
            <ListItem circularItem={item} goToDetail={goToDetail} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CircularView;
