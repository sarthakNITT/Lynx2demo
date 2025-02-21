import React, { useState, useEffect, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Modal,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import {
  Activity_detail,
  Activity_time,
  Activity_roll,
  Activity_title,
  EmptyActivity_button,
  ActivityItem_background,
} from "./../../utils/colors";
import { API_STORE } from "../../mobx/API_STORE";

export const Item = memo(
  ({
    title,
    roll,
    hours,
    min,
    message,
    event_imageSource,
    avatar_imageSource,
    event_status,
    links,
  }) => {
    const paddedHours = hours < 10 ? `0${hours}` : hours;
    const paddedMin = min < 10 ? `0${min}` : min;
    const [isModalVisible, setModalVisible] = useState(false);

    if (event_status === true) {
      return (
        <View style={[styles.item, styles.itemContainer]}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: ActivityItem_background,
                marginLeft: scale(10),
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: API_STORE.getCDN + avatar_imageSource }}
                style={{
                  width: "75%",
                  height: moderateScale(40),
                  resizeMode: "cover",
                  borderRadius: 50,
                }}
              />
            </View>
          </View>
          <View style={{ flex: 4.3 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: verticalScale(14),
                  color: Activity_title,
                  fontWeight: "600",
                  // paddingHorizontal: 5,
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontSize: verticalScale(14),
                  color: Activity_roll,
                  fontWeight: "400",
                  marginLeft: scale(4),
                }}
              >
                @{roll}
              </Text>
            </View>
            <View
              style={{
                alignContent: "flex-start",
                marginRight: "4.5%",
                marginTop: moderateScale(4),
              }}
            >
              <Text
                style={{
                  fontSize: verticalScale(14),
                  color: Activity_detail,
                  // paddingHorizontal: 5,
                  fontWeight: "400",
                }}
              >
                {message}
              </Text>
            </View>
            {event_imageSource ? (
              <View
                style={{
                  flex: 1,
                  borderRadius: 12,
                  marginTop: verticalScale(15),
                  marginRight: scale(22),
                  overflow: "hidden",
                }}
              >
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Image
                    source={{
                      uri:
                        API_STORE.getCDN + event_imageSource.file_stored_name,
                    }}
                    style={{
                      width: "100%",
                      height: verticalScale(130),
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={isModalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={{ flex: 1 }}>
                    <Image
                      source={{
                        uri:
                          API_STORE.getCDN + event_imageSource.file_stored_name,
                      }}
                      style={{
                        flex: 1,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                </Modal>
              </View>
            ) : (
              <></>
            )}
            {links && links.length > 0 && (
              <View style={{ marginTop: 10 }}>
                {links.map((link, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => Linking.openURL(link)}
                  >
                    <Text
                      style={{
                        color: "blue",
                        textDecorationLine: "underline",
                      }}
                    >
                      {link}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View
              style={{
                alignItems: "flex-end",
                marginRight: scale(15),
                paddingTop: verticalScale(7),
                marginBottom: verticalScale(10),
              }}
            >
              <Text
                style={{
                  fontSize: verticalScale(11),
                  color: Activity_time,
                  fontWeight: "800",
                }}
              >
                {paddedHours}:{paddedMin}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
);

export const renderEmptyComponent = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: scale(60),
      }}
    >
      <View
        style={{
          marginTop: verticalScale(225),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", fontSize: scale(22) }}>
            There are no live/upcoming events
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: verticalScale(20),
          borderRadius: 25,
          overflow: "hidden",
          marginBottom: verticalScale(313),
        }}
      >
        <Button
          title="See Class Activity"
          onPress={() => navigation.navigate("Class")}
          color={EmptyActivity_button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: ActivityItem_background,
    paddingTop: verticalScale(12),
    // paddingBottom: verticalScale(10),
    // marginVertical: verticalScale(5),
    // marginLeft: scale(19),
    // marginRight: scale(47),
    // borderTopLeftRadius: 14,
    // borderBottomLeftRadius: 6,
    // borderTopRightRadius: 16,
    // borderBottomRightRadius: 16,
    // borderWidth: 0.4,
    // borderColor: '#a5bdcf',
    flexDirection: "row",
  },
  itemContainer: {
    borderTopWidth: 0.4,
    borderColor: "#a5bdcf",
  },
});
