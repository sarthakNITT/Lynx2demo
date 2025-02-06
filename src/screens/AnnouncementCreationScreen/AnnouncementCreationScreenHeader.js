import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomAlert from "../../components/customAlert";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import * as color from "../../utils/colors";
import { HeaderHeight, SHADOW_OPACITY } from "../../utils/UI_CONSTANTS";
import { clearData } from "./createAnnouncementApi";

const AnnouncementCreationScreenHeader = ({
  navigation,
  validLength,
  createAnnouncement,
}) => {
  //const dispatch = useDispatch();

  function toggleTab(tabShow) {
    BOTTOM_NAV_STORE.setTabVisibility(tabShow);
  }
  const [modalTitle, setModalTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState({});

  return (
    <View style={styles.header}>
      <CustomAlert
        title={modalTitle}
        message={modalMessage}
        startDate={""}
        endDate={""}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        buttons={modalButtons}
      />
      <View style={styles.twoButtonLeft}>
        <TouchableOpacity
          onPress={() => {
            setModalTitle("Confirmation");
            setModalMessage(
              "Are you sure you want to discard this announcement?"
            );
            setModalButtons([
              {
                text: "DISCARD",
                func: () => {
                  clearData();
                  toggleTab(true);
                  navigation.pop();
                },
              },
              {
                text: "KEEP EDITING",
                func: () => console.log("OK Pressed"),
              },
            ]);
            setModalVisible(true);
          }}
          style={styles.button}
        >
          <Icon
            name="close"
            size={HeaderHeight / 1.6}
            color={color.Tertiary}
            style={{ marginLeft: scale(5) }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Create Announcement</Text>
      <View style={styles.twoButtonRight}>
        <TouchableOpacity
          onPress={() => {
            console.log("Create pressed");
            if (!validLength) {
              setModalTitle("Max Length Reached");
              setModalMessage("The text entered exceeds the maximum length");
              setModalButtons([
                {
                  text: "CLOSE",
                  func: () => console.log("OK Pressed"),
                },
              ]);
              setModalVisible(true);
            } else {
              createAnnouncement();
              //toggleTab(true); To be enabled after implementing save
            }
          }}
          style={styles.button}
        >
          <Icon
            name="check"
            size={HeaderHeight / 1.6}
            color={color.Green}
            style={{ marginRight: scale(5) }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: verticalScale(HeaderHeight),
    shadowColor: color.BLACK,
    shadowOpacity: SHADOW_OPACITY,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6,
    zIndex: 6,
    backgroundColor: color.WHITE,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: color.WHITE,
  },
  headerText: {
    alignSelf: "center",
    fontSize: scale(16),
    fontWeight: "bold",
  },
  twoButtonLeft: {},
  twoButtonRight: {},
});

export default AnnouncementCreationScreenHeader;
