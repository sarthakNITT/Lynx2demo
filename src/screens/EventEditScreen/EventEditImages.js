import { observer } from "mobx-react";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import ImageView from "../../components/ImageView";
import Text from "../../components/TextComponent";
import { API_STORE } from "../../mobx/API_STORE";
import { EVENT_EDIT_STORE } from "../../mobx/EVENT_EDIT_STORE";
import { NO_IMAGE_URL } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const EventEditImages = observer(() => {
  const [imgActive, setimgActive] = useState(0);
  const photos = EVENT_EDIT_STORE.getPhotos || [];
  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.floor(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };

  return (
    <View>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {photos.length === 0 ? (
            <>
              <Image
                resizeMode="contain"
                style={styles.wrap}
                source={{
                  uri: NO_IMAGE_URL,
                }}
              />
            </>
          ) : (
            <></>
          )}
          {photos.map((e, index) => (
            <ImageView
              key={index}
              style={styles.wrap}
              src={API_STORE.getCDN + e}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        {photos.length > 1 ? (
          <View style={styles.wrapDot}>
            {EVENT_EDIT_STORE.getPhotos.map((e, index) => (
              <Text
                key={e}
                style={imgActive == index ? styles.dotActive : styles.dot}
              >
                ●
              </Text>
            ))}
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
});

export default EventEditImages;

const styles = ScaledSheet.create({
  wrap: {
    width: WIDTH,
    height: WIDTH,
    backgroundColor: colors.Secondary,
  },
  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: "3@msr",
    color: colors.EventDescriptionScreen_DotActive,
    fontSize: "15@s",
  },
  dot: {
    margin: "3@msr",
    color: colors.EventDescriptionScreen_DotInactive,
    fontSize: "15@s",
  },
});
