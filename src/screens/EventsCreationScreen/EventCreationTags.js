import { observer } from "mobx-react";
import React from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import Error from "../../components/Error";
import { EVENT_CREATION_STORE } from "../../mobx/EVENT_CREATION_STORE";
import * as colors from "../../utils/colors";
import { isValidLink } from "../../utils/helperFunction/FormValidation";
import { eventCreation_ImageTitle } from "../../utils/stringConstants";
import {
  HorizontalPadding,
  MAX_EVENT_LINK_COUNT,
  MAX_EVENT_TAG_COUNT,
  MAX_TAG_LENGTH,
} from "../../utils/UI_CONSTANTS";
import { addEvent } from "./EventCreationAPI";
import EventCreationTagItem from "./EventCreationTagItem";
import LinkItem from "./LinkItem";
import textInputStyles from "./textInputStyles";

const WIDTH = Dimensions.get("window").width;

const EventCreationTag = observer(({ scrollViewRef, callback }) => {
  //handling scroll
  const createEvent = () => {
    addEvent();
  };
  const toast = useToast();

  const back = () => {
    callback(eventCreation_ImageTitle, 4);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * 3,
        animated: true,
      });
      Keyboard.dismiss();
    }
  };

  return (
    <>
      {Platform.OS === "ios" ? (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            onScroll={() => {
              Keyboard.dismiss();
            }}
            scrollEventThrottle={10}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.viewScale}>
              <TextInput
                underlineColor="transparent"
                label="Add Tags"
                style={textInputStyles.textInputStyle}
                placeholder="Add Tags"
                autoCapitalize="none"
                multiline={false}
                keyboardType="default"
                value={EVENT_CREATION_STORE.getTag}
                theme={{
                  colors: {
                    primary: colors.BLACK,
                  },
                }}
                selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                onChangeText={(nTag) => {
                  EVENT_CREATION_STORE.setTag(nTag);
                }}
                left={<TextInput.Icon name={"tag"} color={colors.BLACK} />}
                right={
                  <TextInput.Icon
                    name={"plus"}
                    color={colors.BLACK}
                    onPress={() => {
                      if (EVENT_CREATION_STORE.getTag.trim().length < 2) {
                        toast.show(`Tag length too small`, {
                          type: "warning",
                        });
                        return;
                      }
                      if (
                        EVENT_CREATION_STORE.getTag.trim().length >
                        MAX_TAG_LENGTH
                      ) {
                        toast.show(`Max tag length is ${MAX_TAG_LENGTH}`, {
                          type: "danger",
                        });
                        return;
                      }
                      if (
                        EVENT_CREATION_STORE.getTags.length + 1 >
                        MAX_EVENT_TAG_COUNT
                      ) {
                        toast.show(`Max tag count is ${MAX_EVENT_TAG_COUNT}`, {
                          type: "warning",
                        });
                        return;
                      } else if (EVENT_CREATION_STORE.getTag.trim() !== "")
                        EVENT_CREATION_STORE.addTag();
                    }}
                  />
                }
              />
              {EVENT_CREATION_STORE.getTags.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {EVENT_CREATION_STORE.getTags.map((item, index) => {
                    return (
                      <View key={index}>
                        <EventCreationTagItem item={item} index={index} />
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
            <View style={styles.viewScale}>
              <TextInput
                underlineColor="transparent"
                style={textInputStyles.textInputStyle}
                label="Event Links"
                placeholder="Event Links"
                value={EVENT_CREATION_STORE.getLink}
                theme={{
                  colors: {
                    primary: colors.BLACK,
                  },
                }}
                selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                onChangeText={(nLinks) => EVENT_CREATION_STORE.setLink(nLinks)}
                left={<TextInput.Icon name={"link"} color={colors.BLACK} />}
                right={
                  <TextInput.Icon
                    name={"plus"}
                    color={colors.BLACK}
                    onPress={async () => {
                      if (EVENT_CREATION_STORE.getLink.trim() === "") {
                        toast.show("Not a valid link", {
                          type: "danger",
                        });
                        return;
                      }
                      if (
                        EVENT_CREATION_STORE.getLinks.length + 1 >
                        MAX_EVENT_LINK_COUNT
                      ) {
                        toast.show("Maximum link count reached", {
                          type: "warning",
                        });
                        return;
                      }

                      const res = await isValidLink(
                        EVENT_CREATION_STORE.getLink.trim()
                      );
                      if (!res) {
                        toast.show("Not a valid link", {
                          type: "danger",
                        });
                        return;
                      }
                      EVENT_CREATION_STORE.addLink();
                    }}
                  />
                }
              />
              {EVENT_CREATION_STORE.getLinks.length > 0 && (
                <View style={styles.viewScale}>
                  <FlatList
                    data={EVENT_CREATION_STORE.getLinks}
                    renderItem={(props) => (
                      <LinkItem index={props.index} item={props.item} />
                    )}
                  />
                </View>
              )}
              {EVENT_CREATION_STORE.errorText != null && (
                <Error text={EVENT_CREATION_STORE.errorText} />
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.viewScale}>
            <TextInput
              underlineColor="transparent"
              label="Add Tags"
              style={textInputStyles.textInputStyle}
              placeholder="Add Tags"
              autoCapitalize="none"
              multiline={false}
              keyboardType="default"
              value={EVENT_CREATION_STORE.getTag}
              theme={{
                colors: {
                  primary: colors.BLACK,
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              onChangeText={(nTag) => {
                EVENT_CREATION_STORE.setTag(nTag);
              }}
              left={<TextInput.Icon name={"tag"} color={colors.BLACK} />}
              right={
                <TextInput.Icon
                  name={"plus"}
                  color={colors.BLACK}
                  onPress={() => {
                    if (EVENT_CREATION_STORE.getTag.trim().length < 2) {
                      toast.show(`Tag length too small`, {
                        type: "warning",
                      });
                      return;
                    }
                    if (
                      EVENT_CREATION_STORE.getTag.trim().length > MAX_TAG_LENGTH
                    ) {
                      toast.show(`Max tag length is ${MAX_TAG_LENGTH}`, {
                        type: "danger",
                      });
                      return;
                    }
                    if (
                      EVENT_CREATION_STORE.getTags.length + 1 >
                      MAX_EVENT_TAG_COUNT
                    ) {
                      toast.show(`Max tag count is ${MAX_EVENT_TAG_COUNT}`, {
                        type: "warning",
                      });
                      return;
                    } else if (EVENT_CREATION_STORE.getTag.trim() !== "")
                      EVENT_CREATION_STORE.addTag();
                  }}
                />
              }
            />
            {EVENT_CREATION_STORE.getTags.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {EVENT_CREATION_STORE.getTags.map((item, index) => {
                  return (
                    <View key={index}>
                      <EventCreationTagItem item={item} index={index} />
                    </View>
                  );
                })}
              </View>
            )}
          </View>
          <View style={styles.viewScale}>
            <TextInput
              underlineColor="transparent"
              style={textInputStyles.textInputStyle}
              label="Event Links"
              placeholder="Event Links"
              value={EVENT_CREATION_STORE.getLink}
              theme={{
                colors: {
                  primary: colors.BLACK,
                },
              }}
              selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
              onChangeText={(nLinks) => EVENT_CREATION_STORE.setLink(nLinks)}
              left={<TextInput.Icon name={"link"} color={colors.BLACK} />}
              right={
                <TextInput.Icon
                  name={"plus"}
                  color={colors.BLACK}
                  onPress={async () => {
                    if (EVENT_CREATION_STORE.getLink.trim() === "") {
                      toast.show("Not a valid link", {
                        type: "danger",
                      });
                      return;
                    }
                    if (
                      EVENT_CREATION_STORE.getLinks.length + 1 >
                      MAX_EVENT_LINK_COUNT
                    ) {
                      toast.show("Maximum link count reached", {
                        type: "warning",
                      });
                      return;
                    }

                    const res = await isValidLink(
                      EVENT_CREATION_STORE.getLink.trim()
                    );
                    if (!res) {
                      toast.show("Not a valid link", {
                        type: "danger",
                      });
                      return;
                    }
                    EVENT_CREATION_STORE.addLink();
                  }}
                />
              }
            />
            {EVENT_CREATION_STORE.getLinks.length > 0 && (
              <View style={styles.viewScale}>
                <FlatList
                  data={EVENT_CREATION_STORE.getLinks}
                  renderItem={(props) => (
                    <LinkItem index={props.index} item={props.item} />
                  )}
                />
              </View>
            )}
            {EVENT_CREATION_STORE.errorText != null && (
              <Error text={EVENT_CREATION_STORE.errorText} />
            )}
          </View>
        </View>
      )}

      {/* Navigation Buttons */}
      <Button
        style={styles.next}
        mode="contained"
        labelStyle={{ color: colors.regNext }}
        onPress={createEvent}
      >
        Create Event
      </Button>
      <Button
        style={styles.back}
        mode="outline"
        onPress={back}
        labelStyle={{ color: colors.regAttach }}
        icon="chevron-left"
      >
        Back
      </Button>
    </>
  );
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    paddingHorizontal: scale(HorizontalPadding),
  },
  textInputStyle: {
    backgroundColor: colors.GRAY_LIGHT,
    borderTopRightRadius: moderateScale(9),
    borderTopLeftRadius: moderateScale(9),
    borderBottomLeftRadius: moderateScale(9),
    borderBottomRightRadius: moderateScale(9),
  },
  flatListStyle: {
    flexDirection: "row",
    paddingHorizontal: scale(4),
    marginBottom: verticalScale(8),
    flexWrap: "wrap",
  },
  next: {
    position: "absolute",
    bottom: "20@vs",
    right: "20@vs",
    backgroundColor: colors.regAttach,
  },
  back: {
    position: "absolute",
    bottom: "20@vs",
    left: "10@vs",
  },
  viewScale: {
    paddingVertical: verticalScale(4),
  },
});

export default EventCreationTag;
