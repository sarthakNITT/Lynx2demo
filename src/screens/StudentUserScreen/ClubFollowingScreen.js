import { observer } from "mobx-react";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { STUDENT_DETAILS_STORE } from "../../mobx/STUDENT_DETAILS_STORE";
import * as colors from "../../utils/colors";
import { NO_FOLLOWED_CLUBS } from "../../utils/ERROR_MESSAGES";
import { getAllStudentDetails } from "./apiCalls";
import ListItem from "./ClubListItem";
import { listScreenStyles } from "./styles";

const headerFooterComponent = () => {
  return <View style={{ height: verticalScale(6) }} />;
};

const { width } = Dimensions.get("screen");

const ClubFollowingScreen = observer(({ navigation, goToClub }) => {
  const onRefresh = () => {
    STUDENT_DETAILS_STORE.setRefresh(true);
    getAllStudentDetails(true);
  };
  const [refreshList, setRefreshList] = useState(false);
  const refreshFlat = (r) => {
    setRefreshList(r);
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
              }}
            >
              {NO_FOLLOWED_CLUBS}
            </Text>
            <View style={{ alignItems: "baseline", alignSelf: "center" }}>
              <Button
                mode={"text"}
                color={colors.Tertiary}
                onPress={() => {
                  navigation.navigate("Search", {
                    screen: "SearchScreen",
                    params: {
                      screen: "Clubs",
                      params: { searchText: "" },
                    },
                  });
                }}
              >
                Explore Clubs
              </Button>
            </View>
          </View>
        }
        keyExtractor={(item) => item.clubId._id}
        data={STUDENT_DETAILS_STORE.getClubs}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() =>
              handleClick(() => {
                goToClub(item);
              })
            }
          >
            <ListItem
              clubItem={item}
              goToClub={goToClub}
              refreshFlat={refreshFlat}
            />
          </TouchableOpacity>
        )}
        extraData={refreshList}
      />
    </View>
  );
});

export default ClubFollowingScreen;
