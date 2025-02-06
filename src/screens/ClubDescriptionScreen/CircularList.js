import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import Header from "../../components/Header";
import {
  FlatList,
  View,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import ListItem from "./circularItem";
import { verticalScale, moderateScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import LoaderPage from "../../components/LoadingScreen";
import { CLUB_DESCRIPTION_STORE } from "../../mobx/CLUB_DESCRIPTION_STORE";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import * as colors from "../../utils/colors";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import { listScreenStyles } from "./styles";
import { clubDescriptionAPI } from "./clubDescriptionAPI";

const CircularList = observer(({ navigation }) => {
  const [timeout, setTimeouts] = useState();
  const [clicked, setClicked] = useState(true);
  const delay = 1000;
  const NoCircularString =
    CLUB_DESCRIPTION_STORE.getData.name + " has no circulars";
  const onRefresh = React.useCallback(() => {
    PAGE_NUMBER = 0;
    CLUB_DESCRIPTION_STORE.setRefreshing(true);
    CLUB_DESCRIPTION_STORE.setError(false);
    CLUB_DESCRIPTION_STORE.setErrorText("");
    CLUB_DESCRIPTION_STORE.setLoading(false);
    CLUB_DESCRIPTION_STORE.setSuccess(false);

    clubDescriptionAPI(true);
  }, []);

  const goToDetail = (Id, type) => {
    navigation.push("AnnouncementDetail", {
      circularId: Id,
    });
  };

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

  const headerFooterComponent = () => {
    return <View style={{ height: verticalScale(6) }} />;
  };

  const { width } = Dimensions.get("screen");

  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(false);
  }

  return (
    <>
      {CLUB_DESCRIPTION_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : (
        <>
          <View
            style={{
              ...listScreenStyles.container,
              width: width,
            }}
          >
            <Header
              props={{ navigation: navigation }}
              title={
                CLUB_DESCRIPTION_STORE.getLoading
                  ? ""
                  : CLUB_DESCRIPTION_STORE.getData.name
              }
              func={() => {
                navigation.pop();
              }}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={CLUB_DESCRIPTION_STORE.getRefreshing}
                  colors={[colors.Accent]}
                  tintColor={colors.Accent}
                  onRefresh={onRefresh}
                />
              }
              style={listScreenStyles.listStyle}
              keyExtractor={(item) => item._id}
              data={CLUB_DESCRIPTION_STORE.getCirculars}
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
                    {NoCircularString}
                  </Text>
                </View>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() =>
                    handleClick(() => {
                      goToDetail(item._id, "");
                    })
                  }
                >
                  <ListItem circularItem={item} goToDetail={goToDetail} />
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      )}
    </>
  );
});

export default CircularList;
