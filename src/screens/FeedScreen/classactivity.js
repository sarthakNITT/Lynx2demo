import React, { useEffect, useState, useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { RefreshControl, SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { API_STORE } from "../../mobx/API_STORE";
import { NO_CLASS_MESSAGES } from "../../utils/ERROR_MESSAGES";
import NoEventScreen from "../../components/NoEventScreen";
import { scale, verticalScale } from "react-native-size-matters";
import { NO_EVENTS } from "../../utils/ERROR_MESSAGES";
import { Item } from "../../components/HomeActivityCard/index";
import { useToast } from "react-native-toast-notifications";
import { USER_STORE } from "../../mobx/USER_STORE";
import { API_FEED_SCREEN_MESSAGES } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors"; 
import { FEEDS_STORE } from "../../mobx/FEEDS_STORE";
import { feedsAPI } from "./feedsAPI";

const ClassActivityScreen = () => {
  const [messageData, setMessageData] = useState([]);
  const [reload, setReload] = useState(false);
  const toast = useToast();
  const onRefresh = useCallback(() => {
    NetInfo.fetch().then((state) => {
      console.log(API_STORE.getBaseUrl + API_FEED_SCREEN_MESSAGES);
      if (state.isConnected) {
        axios
          .get(API_STORE.getBaseUrl + API_FEED_SCREEN_MESSAGES, {
            headers: { token: USER_STORE.getUserToken },
          })
          .then((response) => {
            if (response.status === 200) {
              setMessageData(response.data.message);
            }
          })
          .catch(() => {
            toast.show("Unexpected Error has occurred", { type: "warning" });
          });
      } else {
        toast.show("No Network Connection", { type: "warning" });
      }
    });
    setReload(true);
  }, []);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log(API_STORE.getBaseUrl + API_FEED_SCREEN_MESSAGES);
      if (state.isConnected) {
        axios
          .get(API_STORE.getBaseUrl + API_FEED_SCREEN_MESSAGES, {
            headers: { token: USER_STORE.getUserToken },
          })
          .then((response) => {
            if (response.status === 200) {
              setMessageData(response.data.message);
            }
          })
          .catch(() => {
            toast.show("Unexpected Error has occurred", { type: "warning" });
          });
      } else {
        toast.show("No Network Connection", { type: "warning" });
      }
    });
    setReload(true);
  }, [reload]);

  useEffect(() => {
    //   console.log(messageData);
    console.log("Messages count:", messageData.length);
  }, [messageData]);

  const renderItem = useCallback(({ item, index }) => {
    const dateTime = new Date(item.updatedAt);
    const hours = dateTime.getHours();
    const min = dateTime.getMinutes();
    const date=dateTime.getDate()
    const month=dateTime.getUTCMonth();
    const year= dateTime.getFullYear();

    return (
      <Item
        key={index} // Use numerical increasing keys
        title={item.title}
        roll={item.creator.userId.firstName}
        hours={hours}
        min={min}
        message={item.description}
        event_imageSource={item.documents[0] ? item.documents[0] : null}
        avatar_imageSource={item.creator.userId.pictureUrl}
        event_status={true}
        links={item.links}
        date ={date}
        month={month}
        year={year}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={messageData.slice().reverse()}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()} // Use index as key
          showsVerticalScrollIndicator={false}
          style={{ height: "100%" }}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <NoEventScreen
              errorMessage={NO_CLASS_MESSAGES}
              fullscreen={
                FEEDS_STORE.getData.suggestedEvents == null ||
                FEEDS_STORE.getData.suggestedEvents.length === 0
              }
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={FEEDS_STORE.getRefreshing}
              colors={[colors.Accent]}
              tintColor={colors.Accent}
              onRefresh={onRefresh}
              progressViewOffset={verticalScale(50)}
            />
          }
          bouncesZoom={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ClassActivityScreen;
