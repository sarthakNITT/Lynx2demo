import React from "react";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import {RefreshControl} from'react-native';
import { API_STORE } from "../../mobx/API_STORE";
import { NO_CLASS_MESSAGES } from "../../utils/ERROR_MESSAGES";
import { useEffect, useState } from "react";
import NoEventScreen from "../../components/NoEventScreen";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { NO_EVENTS } from "../../utils/ERROR_MESSAGES";
import { Item } from "../../components/HomeActivityCard/index";
import { useToast } from "react-native-toast-notifications";
import { USER_STORE } from "../../mobx/USER_STORE";
import { HeaderHeight, HorizontalPadding } from "../../utils/UI_CONSTANTS";
import { API_FEED_SCREEN_MESSAGES } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors"; 
import { FEEDS_STORE } from "../../mobx/FEEDS_STORE";
import { feedsAPI } from "./feedsAPI";

const ClassActivityScreen = () => {
  const [messageData, setMessageData] = useState([]);
  const [reload, setReload] = useState(false);
  const toast = useToast();
  const onRefresh = React.useCallback(() => {
      // FEEDS_STORE.setRefreshing(true);
      // FEEDS_STORE.setError(false);
      // FEEDS_STORE.setErrorText("");
      // //FEEDS_STORE.setLoading(true);
      // FEEDS_STORE.setSuccess(false);
      // feedsAPI(true);
      NetInfo.fetch().then((state) => {
        console.log(API_STORE.getBaseUrl + API_FEED_SCREEN_MESSAGES);
        if (state.isConnected == true) {
          axios
            .get(API_STORE.getBaseUrl + API_FEED_SCREEN_MESSAGES, {
              headers: {
                token: USER_STORE.getUserToken,
              },
              params: {},
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
          toast.show(NO_NETWORK, { type: "warning" });
        }
      });
      setReload(true);
    }, []);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log(API_STORE.getBaseUrl + API_FEED_SCREEN_MESSAGES);
      if (state.isConnected == true) {
        axios
          .get(API_STORE.getBaseUrl + API_FEED_SCREEN_MESSAGES, {
            headers: {
              token: USER_STORE.getUserToken,
            },
            params: {},
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
        toast.show(NO_NETWORK, { type: "warning" });
      }
    });
    setReload(true);
  }, [reload]);

  useEffect(() => {
    //   console.log(messageData);
    console.log(messageData.length);
  }, [messageData]);

  const renderItem = React.useCallback(({ item }) => {
    const dateTime = new Date(item.updatedAt);
    const hours = dateTime.getHours();
    const min = dateTime.getMinutes();

    return (
      <Item
        title={item.title}
        roll={item.creator.userId.firstName}
        hours={hours}
        min={min}
        message={item.description}
        event_imageSource={item.documents[0] ? item.documents[0] : null}
        avatar_imageSource={item.creator.userId.pictureUrl}
        event_status={true}
        links={item.links}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <FlatList
          // data={messageData.slice().reverse()}
          // renderItem={renderItem}
          // keyExtractor={(item) => item.id}
          // refreshControl={
          //     <RefreshControl
          //         refreshing={FEEDS_STORE.getRefreshing}
          //         colors={[colors.Accent]}
          //         tintColor={colors.Accent}
          //         onRefresh={onRefresh}
          //         progressViewOffset={verticalScale(50)}
          //     />
          // }
          data={
            // ...FEEDS_STORE.getData.liveEvents,
            // ...FEEDS_STORE.getData.upcomingEvents,
            messageData.slice().reverse()
          // renderItem={renderItem}
          // keyExtractor={(item) => item.id}
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ height: "100%" }}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <NoEventScreen
              errorMessage={NO_CLASS_MESSAGES}
              fullscreen={
                FEEDS_STORE.getData.suggestedEvents == null ||
                FEEDS_STORE.getData.suggestedEvents.length == 0
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
    color: "white",
    flex: 1,
  },
});

export default ClassActivityScreen;
