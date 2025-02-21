import { observer } from "mobx-react";
import React, { useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { scale, ScaledSheet } from "react-native-size-matters";
import ImageView from "../../components/ImageView";
import Text from "../../components/TextComponent";
import { EVENT_CREATION_STORE } from "../../mobx/EVENT_CREATION_STORE";
import * as colors from "../../utils/colors";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Images = observer(({ selectImage, deleteImage }) => {
  const scrollview = useRef(null);
  const [imgActive, setimgActive] = useState(0);
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
  const goBack = (index) => {
    if (scrollview.current !== null) {
      scrollview.current.scrollTo({
        x: WIDTH * index,
        animated: true,
      });
    }
  };
  return (
    <View
      style={{
        //backgroundColor: 'blue',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.wrap}>
        <ScrollView
          ref={scrollview}
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {EVENT_CREATION_STORE.getImages.map((e, index) => (
            <View key={index} style={styles.container}>
              {e ? (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Pressable
                    onLongPress={() => {
                      deleteImage(index);
                      goBack(index);
                    }}
                  >
                    <ImageView
                      key={index}
                      resizeMode="cover"
                      style={styles.wrap}
                      src={e.uri}
                    />
                  </Pressable>
                  <View style={styles.wrapCloseButton}>
                    <IconButton
                      icon="close"
                      style={{
                        backgroundColor: colors.Secondary,
                      }}
                      color={colors.Tertiary}
                      size={scale(20)}
                      onPress={() => {
                        deleteImage(index);
                        goBack(index);
                      }}
                    />
                  </View>
                </View>
              ) : EVENT_CREATION_STORE.getImages.length < 11 ? (
                <Button
                  key={index}
                  icon="plus"
                  mode="text"
                  color={colors.BLACK}
                  style={styles.button}
                  onPress={() => selectImage()}
                >
                  Add image
                </Button>
              ) : (
                <Button
                  key={index}
                  mode="text"
                  color={colors.BLACK}
                  style={styles.button}
                >
                  Limit Reached
                </Button>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      {EVENT_CREATION_STORE.getImages.length > 0 ? (
        <View style={styles.wrapDot}>
          {EVENT_CREATION_STORE.getImages.map((e, index) => (
            <Text
              key={index}
              style={imgActive == index ? styles.dotActive : styles.dot}
            >
              ●
            </Text>
          ))}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
});

export default Images;

const styles = ScaledSheet.create({
  wrap: {
    width: WIDTH,
    height: WIDTH,
    //backgroundColor: 'pink',
  },
  wrapDot: {
    position: "relative",
    bottom: 0,
    //backgroundColor: 'red',
    flexDirection: "row",
    marginTop: "3@vs",
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
  button: {
    width: WIDTH,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  wrapCloseButton: {
    position: "absolute",
    top: 0,
    elevation: 1,
    right: 0,
    flexDirection: "row",
  },
});
