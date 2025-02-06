import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
//import getColors from 'react-native-image-colors';
import { Button, IconButton } from "react-native-paper";
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/Ionicons";
import { toggleFollowApi } from "../../apis/followUnfollowApi";
import ImageView from "../../components/ImageView";
import LoaderPage from "../../components/LoadingScreen";
import Text from "../../components/TextComponent";
import { API_STORE } from "../../mobx/API_STORE";
import { CLUB_DESCRIPTION_STORE } from "../../mobx/CLUB_DESCRIPTION_STORE";
import { EVENT_DESCRIPTION_STORE } from "../../mobx/EVENT_DESCRIPTION_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import { API_GET_IMAGE, NO_IMAGE_URL } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors";
import { TOAST_ERROR_MESSAGE } from "../../utils/ERROR_MESSAGES";
import { openLink } from "../../utils/helperFunction/openLink";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import { HorizontalPadding, ICON_SIZE_LARGE } from "../../utils/UI_CONSTANTS";
import { STUDENT } from "../../utils/USER_TYPE";
import { ANNOUNCEMENT_DETAILS_STORE } from "../../mobx/ANNOUNCEMENT_DETAILS_STORE";
import {getAllStudentDetails} from '../StudentUserScreen/apiCalls';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ClubDescriptionHeader = observer(
  ({ name, followers, url, email, description, navigation, route }) => {
    //color picker takes time hence we need to keep the loading screen on
    const [coverColor, setCoverColor] = useState("NA");
    const [ApiCall, setApiCall] = useState(false);
    const toast = useToast();

    const showToast = () => {
      toast.show(TOAST_ERROR_MESSAGE, { type: "danger" });
    };

    const getColors1 = async (URL) => {
      // try {
      //   const result = await getColors(URL, {
      //     fallback: colors.Primary,
      //     cache: false,
      //     key: 'unique_key',
      //   });
      //   switch (result.platform) {
      //     case 'android':
      //       return {cover: result.darkMuted, icon: result.lightMuted};

      //     case 'ios':
      //       return {cover: result.background, icon: result.primary};

      //     default:
      //       return {cover: colors.Primary, icon: colors.Secondary};
      //   }
      // } catch (e) {
      //   console.log('ERRORRRRRRRR');
      //   return {cover: 'black', icon: colors.Secondary};
      // }
      return { cover: "black", icon: colors.Secondary };
    };
    console.log("url is ", url);
    console.log(
      "announcement is",
      ANNOUNCEMENT_DETAILS_STORE.getData.club.profilePic
    );
    useEffect(() => {
      Image.getSize(
        url ? API_STORE.getCDN + url : NO_IMAGE_URL,
        (width, height) => {
          getColors1(url ? API_STORE.getCDN + url : NO_IMAGE_URL).then(
            (res) => {
              if (res.cover === "#000000") {
                res.cover = res.icon;
              }
              setCoverColor(res.cover);
            }
          );
        }
      );
    }, [url]);

    return coverColor === "NA" ? (
      <>
        <View
          style={{
            height: windowHeight - verticalScale(45),
            alignItems: "center",
            justifyContent: "center",
            width: windowWidth,
          }}
        >
          <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
        </View>
      </>
    ) : (
      <View style={{ backgroundColor: colors.WHITE }}>
        <View
          style={{
            backgroundColor: coverColor,
            height: verticalScale(81),
          }}
        ></View>
        <Pressable
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("ImageScreen", {
              imgUrl: url ? API_STORE.getCDN + url : NO_IMAGE_URL,
            });
          }}
        >
          <View style={styles.imageView}>
            <ImageView
              //src={url}
              src={url ? API_STORE.getCDN + url : NO_IMAGE_URL}
              style={styles.image}
              resizeMode={"cover"}
            />
          </View>
        </Pressable>
        <View
          style={{
            paddingTop: verticalScale(12),
            marginHorizontal: scale(HorizontalPadding),
            paddingBottom: verticalScale(10),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text
              style={{
                ...styles.name,
                maxWidth: "90%",
                textTransform: "uppercase",
              }}
            >
              {name}
            </Text>

            <IconButton
              onPress={() => {
                Linking.openURL("mailto:" + email);
              }}
              size={20}
              color={colors.Tertiary}
              icon={"message-outline"}
            />
          </View>
          <Text style={styles.followers}>{followers} followers</Text>
          <Text
            style={{
              ...styles.text,

              fontSize: scale(14),
              lineHeight: verticalScale(25),
              fontWeight: "300",
            }}
          >
            {description}
          </Text>
          <View
            style={{
              paddingTop: verticalScale(10),
              flexDirection: "row",
              alignItems: "center",
              justifyContent:
                USER_STORE.getUserType === STUDENT
                  ? "space-between"
                  : "flex-end",
            }}
          >
            {USER_STORE.getUserType === STUDENT ? (
              <>
                <Button
                  disabled={ApiCall}
                  loading={ApiCall}
                  onPress={() => {
                    setApiCall(true);
                    toggleFollowApi(
                      CLUB_DESCRIPTION_STORE.getID,
                      () => {
                        getAllStudentDetails(true);
                        setApiCall(false);
                        console.log(
                          "from event: ",
                          CLUB_DESCRIPTION_STORE.getFromEventScreen
                        );

                        if (CLUB_DESCRIPTION_STORE.getIsFollowingClub) {
                          CLUB_DESCRIPTION_STORE.setDecrementFollower();

                          if (CLUB_DESCRIPTION_STORE.getFromEventScreen) {
                            EVENT_DESCRIPTION_STORE.setDecrementFollower();
                          } else {
                            // An event from this club is opened by user previously
                            try {
                              if (
                                EVENT_DESCRIPTION_STORE.getData.club.id ===
                                CLUB_DESCRIPTION_STORE.getID
                              ) {
                                EVENT_DESCRIPTION_STORE.setDecrementFollower();
                              }
                            } catch {
                              console.log(
                                "catch error in event follow update from club"
                              );
                            }
                          }
                        } else {
                          CLUB_DESCRIPTION_STORE.setIncrementFollower();

                          if (CLUB_DESCRIPTION_STORE.getFromEventScreen) {
                            EVENT_DESCRIPTION_STORE.setIncrementFollower();
                          } else {
                            // An event from this club is opened by user previously
                            try {
                              if (
                                EVENT_DESCRIPTION_STORE.getData.club.id ===
                                CLUB_DESCRIPTION_STORE.getID
                              ) {
                                EVENT_DESCRIPTION_STORE.setIncrementFollower();
                              }
                            } catch {
                              console.log(
                                "catch error in event follow update from club"
                              );
                            }
                          }
                        }

                        CLUB_DESCRIPTION_STORE.setIsFollowingClub(
                          !CLUB_DESCRIPTION_STORE.getIsFollowingClub
                        );

                        if (CLUB_DESCRIPTION_STORE.getFromEventScreen)
                          EVENT_DESCRIPTION_STORE.setIsFollowingClub(
                            CLUB_DESCRIPTION_STORE.getIsFollowingClub
                          );
                        else {
                          // An event from this club is opened by user previously
                          try {
                            if (
                              EVENT_DESCRIPTION_STORE.getData.club.id ===
                              CLUB_DESCRIPTION_STORE.getID
                            ) {
                              EVENT_DESCRIPTION_STORE.setIsFollowingClub(
                                CLUB_DESCRIPTION_STORE.getIsFollowingClub
                              );
                            }
                          } catch {
                            console.log(
                              "catch error in event follow button update from club"
                            );
                          }
                        }
                      },
                      () => {
                        showToast();

                        setApiCall(false);
                      }
                    );
                  }}
                  mode="outlined"
                  color={colors.EventDescriptionScreen_Follow}
                  labelStyle={{
                    fontSize: scale(14),
                    padding: 0,
                    fontWeight: "bold",
                    color: '#1d2d44'
                  }}
                  style={{ alignSelf: "baseline" }}
                >
                  {CLUB_DESCRIPTION_STORE.getIsFollowingClub
                    ? "Following"
                    : "Follow"}
                </Button>
              </>
            ) : (
              <></>
            )}
            <View style={styles.icons}>
              {CLUB_DESCRIPTION_STORE.getData.links.website ? (
                <TouchableOpacity
                  style={styles.iconTouch}
                  onPress={() => {
                    openLink(
                      CLUB_DESCRIPTION_STORE.getData.links.website.trim()
                    );
                  }}
                >
                  <Icon
                    style={styles.icon}
                    color={colors.ClubDescriptionScreen_ICON}
                    name="logo-chrome"
                    size={moderateScale(ICON_SIZE_LARGE)}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}

              {CLUB_DESCRIPTION_STORE.getData.links.linkedin ? (
                <TouchableOpacity
                  style={styles.iconTouch}
                  onPress={() => {
                    openLink(
                      CLUB_DESCRIPTION_STORE.getData.links.linkedin.trim()
                    );
                  }}
                >
                  <Icon
                    style={styles.icon}
                    color={colors.ClubDescriptionScreen_ICON}
                    name="logo-linkedin"
                    size={moderateScale(ICON_SIZE_LARGE)}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
              {CLUB_DESCRIPTION_STORE.getData.links.instagram ? (
                <TouchableOpacity
                  style={styles.iconTouch}
                  onPress={() => {
                    openLink(
                      CLUB_DESCRIPTION_STORE.getData.links.instagram.trim()
                    );
                  }}
                >
                  <Icon
                    style={styles.icon}
                    color={colors.ClubDescriptionScreen_ICON}
                    name="logo-instagram"
                    size={moderateScale(ICON_SIZE_LARGE)}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
              {CLUB_DESCRIPTION_STORE.getData.links.facebook ? (
                <TouchableOpacity
                  style={styles.iconTouch}
                  onPress={() => {
                    openLink(
                      CLUB_DESCRIPTION_STORE.getData.links.facebook.trim()
                    );
                  }}
                >
                  <Icon
                    style={styles.icon}
                    color={colors.ClubDescriptionScreen_ICON}
                    name="logo-facebook"
                    size={moderateScale(ICON_SIZE_LARGE)}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
              {CLUB_DESCRIPTION_STORE.getData.links.medium ? (
                <TouchableOpacity
                  style={styles.iconTouch}
                  onPress={() => {
                    openLink(
                      CLUB_DESCRIPTION_STORE.getData.links.medium.trim()
                    );
                  }}
                >
                  <Entypo
                    name="medium"
                    size={moderateScale(ICON_SIZE_LARGE + 3)}
                    color={colors.ClubDescriptionScreen_ICON}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
              {CLUB_DESCRIPTION_STORE.getData.links.youtube ? (
                <TouchableOpacity
                  style={styles.iconTouch}
                  onPress={() => {
                    openLink(
                      CLUB_DESCRIPTION_STORE.getData.links.youtube.trim()
                    );
                  }}
                >
                  <Entypo
                    name="youtube"
                    size={moderateScale(ICON_SIZE_LARGE + 2)}
                    color={colors.ClubDescriptionScreen_ICON}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
);

export default ClubDescriptionHeader;

const styles = ScaledSheet.create({
  text: {
    fontSize: "14@s",
    color: colors.BLACK,
  },
  imageView: {
    width: "120@s",
    height: "120@s",
    marginTop: "-67@vs",
    borderRadius: "60@s",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(HorizontalPadding),
    elevation: 1,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  image: {
    width: "120@s",
    height: "120@s",
    borderRadius: "60@s",
    justifyContent: "center",
    borderColor: colors.Primary,
    backgroundColor: "white",
  },
  numbers: {
    color: colors.WHITE,
    fontSize: "18@s",
    fontWeight: "bold",
  },
  name: {
    fontSize: "18@s",
    fontWeight: "500",
    color: colors.BLACK,
  },
  email: {
    fontSize: "15@s",
    fontWeight: "bold",
    color: colors.BLACK,
  },
  icon: {
    paddingLeft: "5@s",
  },
  modalScreen: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.57)",
  },
  followers: {
    color: colors.Tertiary,
    paddingTop: "5@vs",
    fontWeight: "bold",
  },
  modalView: {
    backgroundColor: colors.WHITE,
    height: "200@vs",
    width: "100%",
    bottom: "0%",
    position: "absolute",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: scale(15),

    alignItems: "center",
  },
});
