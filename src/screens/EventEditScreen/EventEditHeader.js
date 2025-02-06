import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomAlert from "../../components/customAlert";
import Text from "../../components/TextComponent";
import { EVENT_EDIT_STORE } from "../../mobx/EVENT_EDIT_STORE";
import * as color from "../../utils/colors";
import { HeaderHeight } from "../../utils/UI_CONSTANTS";
import { EditEventApi } from "./EditEventApi";

const EventEditHeader = ({ navigation }) => {
  const conditionChecksPass = () => {
    if (
      EVENT_EDIT_STORE.getTitleError === 1 ||
      EVENT_EDIT_STORE.getDescError === 1
    ) {
      return {
        passed: false,
        reason: "Please fill in all fields",
      };
    } else if (
      EVENT_EDIT_STORE.getTitleError === 2 ||
      EVENT_EDIT_STORE.getDescError === 2
    ) {
      return {
        passed: false,
        reason: "Character limit exceeded",
      };
    } else if (
      EVENT_EDIT_STORE.getEditStartEvent.getTime() >=
      EVENT_EDIT_STORE.getEditEndEvent.getTime()
    ) {
      return {
        passed: false,
        reason: "Start Date/Time must be before end Date/Time",
      };
    } else
      return {
        passed: true,
        reason: "",
      };
  };
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
            setModalMessage("Are you sure you want to discard this event?");
            setModalButtons([
              {
                text: "DISCARD",
                func: () => {
                  EVENT_EDIT_STORE.clearData();
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
      <Text style={styles.headerText}>Edit Event</Text>
      <View style={styles.twoButtonRight}>
        <TouchableOpacity
          onPress={() => {
            const conditionChecker = conditionChecksPass();
            if (!conditionChecker.passed) {
              setModalTitle("Verification");
              setModalMessage(conditionChecker.reason);
              setModalButtons([
                {
                  text: "KEEP EDITING",
                  func: () => console.log("OK Pressed"),
                },
              ]);
              setModalVisible(true);
            } else {
              EditEventApi();
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
    shadowOpacity: 0.26,
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

export default EventEditHeader;
