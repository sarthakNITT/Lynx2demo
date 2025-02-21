import { observer } from "mobx-react";
import React from "react";
import { Share, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import Text from "../../components/TextComponent";
import { ANNOUNCEMENT_DETAILS_STORE } from "../../mobx/ANNOUNCEMENT_DETAILS_STORE";
import { DEEP_LINK_BASE_URL } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors";
import Links from "../EventDescriptionScreen/Links";
import Documents from "./Documents";

const AnnouncementDetail = observer(({ navigation }) => {
  const toast = useToast();

  const showToast = (msg) => {
    toast.show(msg, { type: "warning" });
  };

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: verticalScale(10),
        }}
      >
        <Text style={styles.title}>
          {ANNOUNCEMENT_DETAILS_STORE.getData.title}
        </Text>
        {ANNOUNCEMENT_DETAILS_STORE.getData.urlId ? (
          <IconButton
            onPress={async () => {
              try {
                const result = await Share.share({
                  message:
                    DEEP_LINK_BASE_URL +
                    `/c/${ANNOUNCEMENT_DETAILS_STORE.getData.urlId}`,
                  url:
                    DEEP_LINK_BASE_URL +
                    `/c/${ANNOUNCEMENT_DETAILS_STORE.getData.urlId}`,
                  title: `${ANNOUNCEMENT_DETAILS_STORE.getData.title} by ${ANNOUNCEMENT_DETAILS_STORE.getData.club.name}`,
                });
              } catch (error) {
                showToast(error.message);
              }
            }}
            icon={"share-variant"}
            color={colors.EventCard_ShareIcon}
          />
        ) : null}
      </View>
      <Text style={styles.text}>
        {ANNOUNCEMENT_DETAILS_STORE.getData.description}
      </Text>
      {ANNOUNCEMENT_DETAILS_STORE.getData.links.length > 0 ? (
        <View style={{ paddingBottom: verticalScale(10) }}>
          <Links links={ANNOUNCEMENT_DETAILS_STORE.getData.links} />
        </View>
      ) : (
        <></>
      )}
      {ANNOUNCEMENT_DETAILS_STORE.getData.documents.length > 0 ? (
        <Documents
          navigation={navigation}
          docs={ANNOUNCEMENT_DETAILS_STORE.getData.documents}
        />
      ) : (
        <></>
      )}
      <View style={{ height: verticalScale(25) }} />
    </View>
  );
});

export default AnnouncementDetail;

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    width: "100%",
    backgroundColor: colors.WHITE,
    padding: moderateScale(9),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  text: {
    fontSize: scale(14),
    lineHeight: verticalScale(25),
    fontWeight: "300",
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(0),
    color: '#808080',
  },
  title: {
    fontSize: scale(18),
    paddingTop: 0,
    fontWeight: "bold",
    backgroundColor: colors.WHITE,
    marginTop: verticalScale(0),
    color: colors.EventDescriptionScreen_Title,
    maxWidth: "90%",
  },
});
