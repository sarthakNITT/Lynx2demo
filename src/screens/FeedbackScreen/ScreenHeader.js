import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomAlert from "../../components/customAlert";
import Text from "../../components/TextComponent";
import * as color from "../../utils/colors";
import { CHECK_VALUES_ENTERED } from "../../utils/ERROR_MESSAGES";
import { HeaderHeight } from "../../utils/UI_CONSTANTS";

const ScreenHeader = ({
  modalTitle,
  modalVisible,
  modalMessage,
  modalButtons,
  isValid,
  handleApiCall,
  onBackPress,
  setModalTitle,
  setModalVisible,
  setModalMessage,
  setModalButtons,
}) => {
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
            onBackPress();
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
      <Text style={styles.headerText}>Feedback</Text>
      <View style={styles.twoButtonRight}>
        <TouchableOpacity
          onPress={() => {
            if (!isValid) {
              setModalTitle("Verification");
              setModalMessage(CHECK_VALUES_ENTERED);
              setModalButtons([
                {
                  text: "KEEP EDITING",
                  func: () => console.log("OK Pressed"),
                },
              ]);
              setModalVisible(true);
            } else {
              //toggleTab(true); To be enabled after implementing save
              setModalTitle("Verification");
              setModalMessage("Submit Feedback?");
              setModalButtons([
                {
                  text: "KEEP EDITING",
                  func: () => console.log("OK Pressed"),
                },
                {
                  text: "YES",
                  func: () => handleApiCall(),
                },
              ]);
              setModalVisible(true);
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
    backgroundColor: color.headerBackground,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    alignSelf: "center",
    fontSize: scale(16),
    fontWeight: "bold",
  },
  twoButtonLeft: {},
  twoButtonRight: {},
});

export default ScreenHeader;
