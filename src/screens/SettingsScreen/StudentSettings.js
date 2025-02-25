import { observer } from "mobx-react";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { Dimensions } from "react-native";

import { HorizontalPadding } from "../../utils/UI_CONSTANTS";

import * as colors from "../../utils/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomAlert from "../../components/customAlert";
import { LogOutHandler } from "../../utils/helperFunction/logOutHandler";
import axios from "axios";
import { API_STORE } from "../../mobx/API_STORE";
import { DELETE_STUDENT_ACCOUNT } from "../../utils/API_CONSTANTS";
import { USER_STORE } from "../../mobx/USER_STORE";
import LoaderPage from "../../components/LoadingScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentSettings = observer(({ navigation }) => {
  const [modalTitle, setModalTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState({});
  const windowHeight = Dimensions.get("window").height;
  const [Loading, setLoading] = useState(false);
  // console.log("token", USER_STORE.getUserToken);
  return (
    <SafeAreaView>
      {Loading ? (
        <>
          <LoaderPage />
        </>
      ) : (
        <>
          <CustomAlert
            title={modalTitle}
            message={modalMessage}
            startDate={""}
            endDate={""}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            buttons={modalButtons}
          />
          <ScrollView>
            <TouchableOpacity
              onPress={() => {
                navigation.push("ManageNotificationsSettings");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: verticalScale(10),
                  margin: scale(5),
                  padding: scale(9),
                  // borderColor: colors.GRAY_DARK,
                  // borderWidth: 1,
                  borderRadius: scale(6),
                  elevation: 1,
                  backgroundColor: colors.WHITE,
                }}
              >
                <Icon
                  name="notifications"
                  size={25}
                  style={{ color: colors.Accent }}
                />
                <Text style={styles.textStyle}>Notification Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalTitle("Delete Account");
                setModalMessage(
                  "Are you sure you want to delete your account?"
                );
                setModalButtons([
                  {
                    text: "NO",
                    func: () => console.log("NO"),
                  },
                  {
                    text: "YES",
                    func: async () => {
                      try {
                        setLoading(true);
                        console.log(
                          API_STORE.getBaseUrl + DELETE_STUDENT_ACCOUNT
                        );
                        const resp = await axios.delete(
                          API_STORE.getBaseUrl + DELETE_STUDENT_ACCOUNT,
                          { headers: { token: USER_STORE.getUserToken } }
                        );
                        console.log("ACTIVE: ", resp.status);
                        if (resp.status == 200) {
                          LogOutHandler();
                        }
                      } catch (error) {
                        console.log(error);
                        setLoading(false);
                        setModalVisible(true);
                        setModalTitle("Error");
                        setModalMessage(
                          "Unexpected Error occurred while trying to delete your account please try again after some time"
                        );
                        setModalButtons([
                          {
                            text: "Try Again Later",
                            func: () => console.log("OK Pressed"),
                          },
                        ]);
                      }
                    },
                    color: "red",
                  },
                ]);
                setModalVisible(true);
              }}
            >
              {Platform.OS === "ios" ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: scale(5),
                    padding: scale(9),
                    // backgroundColor: colors.GRAY_DARK,
                    // borderWidth: 1,
                    // borderRadius: scale(6),
                    marginTop: windowHeight * 0.68,
                    justifyContent: "center",
                    height: windowHeight * 0.12,
                  }}
                >
                  <Icon name="delete" size={25} style={{ color: colors.RED }} />
                  <Text style={{ ...styles.textStyle, color: colors.RED }}>
                    DELETE ACCOUNT
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: scale(5),
                    padding: scale(9),
                    // backgroundColor: colors.GRAY_DARK,
                    // borderWidth: 1,
                    // borderRadius: scale(6),
                    marginTop: windowHeight * 0.75,
                    justifyContent: "center",
                    height: windowHeight * 0.12,
                  }}
                >
                  <Icon name="delete" size={25} style={{ color: colors.RED }} />
                  <Text style={{ ...styles.textStyle, color: colors.RED }}>
                    DELETE ACCOUNT
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: verticalScale(10),
  },
  textStyle: {
    fontSize: moderateScale(18),
    marginHorizontal: scale(HorizontalPadding),
    fontWeight: "bold",
    //added text color manually
    color: "black",
  },
  errorStyle: {
    fontSize: moderateScale(16),
    marginHorizontal: scale(16),
    marginTop: verticalScale(10),
    alignSelf: "center",
  },
});

export default StudentSettings;
