import { observer } from "mobx-react";
import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/MaterialIcons";
import { toggleInterestedApi } from "../../apis/toggleInterested";
import Text from "../../components/TextComponent";
import { EVENT_DESCRIPTION_STORE } from "../../mobx/EVENT_DESCRIPTION_STORE";
import { FEEDS_STORE } from "../../mobx/FEEDS_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import * as colors from "../../utils/colors";
import { HeaderHeight, HorizontalPadding } from "../../utils/UI_CONSTANTS";
import { ADMIN, CLUB, STUDENT } from "../../utils/USER_TYPE";
import { getAllStudentDetails } from "../StudentUserScreen/apiCalls";

export const isAuthorized = () => {
  if (
    (USER_STORE.getUserType === CLUB || USER_STORE.getUserType === ADMIN) &&
    EVENT_DESCRIPTION_STORE.getData &&
    USER_STORE.getClubId === EVENT_DESCRIPTION_STORE.getData.club.id
  ) {
    return true;
  }
  return false;
};
const EventDescriptionHeader = observer(({ navigation, route }) => {
  console.log(EVENT_DESCRIPTION_STORE.getData.club.id);

  const toast = useToast();
  const [disable, setDisable] = useState(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.button}
        disabled={EVENT_DESCRIPTION_STORE.getInterestedApi}
        onPress={() => {
          navigation.goBack();
          //we can't use here pop cause if this screen was open form a notifications then there will be no nav screen in the bottom of this screen
        }}
      >
        {Platform.OS === "ios" ? (
          <Icon
            name="arrow-back-ios"
            size={HeaderHeight / 1.6}
            color={colors.Tertiary}
          />
        ) : (
          <Icon
            name="arrow-back"
            size={HeaderHeight / 1.6}
            color={colors.Tertiary}
          />
        )}
      </TouchableOpacity>
      <View style={styles.textView}>
        <Text numberOfLines={1} style={styles.headerText}>
          {EVENT_DESCRIPTION_STORE.getData.Title}
        </Text>
      </View>
      {USER_STORE.getUserType === STUDENT ? (
        <IconButton
          onPress={() => {
            if (!disable) {
              EVENT_DESCRIPTION_STORE.setInterestedApi(true);
              setDisable(true);
              toggleInterestedApi(
                EVENT_DESCRIPTION_STORE.getID,
                () => {
                  FEEDS_STORE.setInterested(
                    !EVENT_DESCRIPTION_STORE.getWasStudentInterested,
                    EVENT_DESCRIPTION_STORE.getID
                  );
                  EVENT_DESCRIPTION_STORE.setWasStudentInterested(
                    !EVENT_DESCRIPTION_STORE.getWasStudentInterested
                  );

                  getAllStudentDetails(true);

                  EVENT_DESCRIPTION_STORE.setInterestedApi(false);
                  setDisable(false);
                },
                () => {
                  toast.show("Failed to process your request!", {
                    type: "danger",
                  });

                  EVENT_DESCRIPTION_STORE.setInterestedApi(false);
                  setDisable(false);
                }
              );
            } else {
              EVENT_DESCRIPTION_STORE.setInterestedApi(false);
              setDisable(false);
            }
          }}
          disabled={disable}
          icon={
            EVENT_DESCRIPTION_STORE.getWasStudentInterested
              ? "star"
              : "star-outline"
          }
          color={colors.Tertiary}
          style={{ ...styles.button, elevation: 0 }}
        />
      ) : (
        <>
          {isAuthorized() ? (
            <>
              <IconButton
                onPress={() => {
                  navigation.navigate("EventEditScreen");
                }}
                disabled={false}
                icon={"border-color"}
                color={colors.Tertiary}
                style={{
                  ...styles.button,
                  elevation: 0,
                }}
              />
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: verticalScale(HeaderHeight + 2),
    shadowColor: "#000000",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    paddingBottom: verticalScale(2),
    paddingHorizontal: scale(HorizontalPadding),
    justifyContent: "space-between",
    alignItems: "center",
  },
  textView: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  headerText: {
    alignSelf: "center",
    fontSize: scale(16),
    fontWeight: "bold",
    width: "65%",
    textAlign: "center",
    color: "#000000",
  },
  button: {
    justifyContent: "center",
    elevation: 1,
    zIndex: 1,
    shadowColor: "#000000",
  },
});

export default EventDescriptionHeader;
