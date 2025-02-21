// import LottieView from "lottie-react-native";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
// import { IconButton, TextInput } from "react-native-paper";
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import { getStatusBarHeight } from "react-native-status-bar-height";
// import Icon from "react-native-vector-icons/MaterialIcons";
import CustomAlert from "../../components/customAlert";
import ErrorScreen from "../../components/ErrorScreen";
import LoaderPage from "../../components/LoadingScreen";
import Text from "../../components/TextComponent";
import { PreventDoubleClickWithOpacity as TouchableOpacity } from "../../components/TouchableOpacity";
import { LOGIN_STORE } from "../../mobx/LOGIN_STORE";
import { RESET_STORE } from "../../mobx/RESET_PASSWORD_STORE";
import lottieFile from "../../res/lottieFiles/loginBackGround.json";
import * as colors from "../../utils/colors";
import { USER_DOESNT_EXIST } from "../../utils/ERROR_MESSAGES";
import { ACCENT_LOTTIE, EXTERNAL_LOTTIE } from "../../utils/LOADING_TYPES";
import { SEEN_INFO } from "../../utils/STORAGE_KEYS";
import {
  loginInfoHeading,
  studentInfoLogin,
} from "../../utils/stringConstants";
// import {clubLogin} from './clubLogin';
import { studentLogin } from "./studentLogin";

// backend
// Connecting with backend
// import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

import { API_STORE } from "../../mobx/API_STORE";
import {
  GET_BASE_CDN,
  GET_BASE_URL,
  isUpdateNeeded,
} from "../../utils/API_CONSTANTS";

//scaling
const height2 = 737.1;
const screenHeight = Dimensions.get("window").height - getStatusBarHeight(true);
export function getHeight(height) {
  return Math.floor((height * screenHeight) / height2);
}

const LoginScreen = observer(({ navigation }) => {
  // Connecting with backend:
  // function to connect it with backend
  const [apiStatus, setAPI] = useState(0);
  const [updateVisible, setUpdateVisible] = useState(false);

  const API_CALL = async () => {
    console.log("API_CALL invoked");

    // Check network connectivity
    // const netInfo = await NetInfo.fetch();
    // console.log("Network Info:", netInfo);

    // if (!netInfo.isConnected) {
    //   console.log("Not connected to the internet");
    //   setAPI(3);
    //   return;
    // }

    try {
      console.log("Connected to the internet");

      // Fetch base URL
      console.log("Fetching base URL...");
      const baseUrlResponse = await axios.get(
        GET_BASE_URL,
        {},
        { timeout: 5000 }
      );
      console.log("Base URL response:", baseUrlResponse);

      // Fetch CDN URL
      console.log("Fetching CDN URL...");
      const cdnResponse = await axios.get(GET_BASE_CDN, {}, { timeout: 5000 });
      console.log("CDN response:", cdnResponse);

      // Check if update is needed
      console.log("Checking if update is needed...");
      // const updateNeeded = await isUpdateNeeded();
      // console.log('Update needed:', updateNeeded);

      // if (updateNeeded) {
      // console.log('Update required. Displaying update modal.');
      // setUpdateVisible(true);
      // }

      const baseUrl = baseUrlResponse.data.trim();
      const cdnUrl = cdnResponse.data.trim();

      console.log("Base URL:", baseUrl);
      console.log("CDN URL:", cdnUrl);

      // Handle maintenance mode
      if (baseUrl === "maintain") {
        console.log("Maintenance mode detected");
        setAPI(2);
        return;
      }

      // Set API store values
      console.log("Setting API store values...");
      API_STORE.setBaseUrl(baseUrl);
      API_STORE.setCDN(cdnUrl);

      // Success
      console.log("API setup completed successfully");
      setAPI(200);
    } catch (error) {
      console.error("Error during API call:", error);
      setAPI(1);
    }
  };
  useEffect(() => {
    console.log("Calling API_CALL in useEffect");
    API_CALL();
  }, []);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState();
  const [eyeIcon, setEyeIcon] = useState("eye-off");
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const onLogin = () => {
    LOGIN_STORE.setErrorText("");

    //checking if user is purely numbers
    if (user != "" && user.match(/^[0-9]+$/) == null) {
      //if not purely numbers then check if '@' is present (of form a@b where len a/b >=1)
      if (!user.slice(user.slice(1, user.length - 1)).includes("@")) {
        LOGIN_STORE.setError(true);
        LOGIN_STORE.setErrorText("Invalid Username");
        return;
      }
      let email = user.trim();
      clubLogin(email, password);
    } else {
      if (user.length < 9 || user.length > 9) {
        LOGIN_STORE.setErrorText("Invalid Roll Number");
        LOGIN_STORE.setError(true);
        return;
      }
      let rollNo = parseInt(user);
      studentLogin(rollNo, password);
    }
  };

  useEffect(() => {
    const checkSeenInfo = async () => {
      const seenInfo = await EncryptedStorage.getItem(SEEN_INFO);
      if (seenInfo === "true") {
        return;
      }
      setModalVisible(true);
    };

    checkSeenInfo();
  }, []);

  //Warning- UseEffect must not return anything besides a function which is used for cleanup
  // useEffect(async () => {
  //   const seenInfo = await EncryptedStorage.getItem(SEEN_INFO);
  //   if (seenInfo === 'true') {
  //     return;
  //   }
  //   setModalVisible(true);
  // }, []);

  return (
    <SafeAreaView>
      {LOGIN_STORE.getLoading ? (
        <>
          <LoaderPage
            LoadingAccent={ACCENT_LOTTIE}
            LoaderLottieType={EXTERNAL_LOTTIE}
          />
        </>
      ) : (
        <>
          {LOGIN_STORE.getError ? (
            <>
              {LOGIN_STORE.getErrorText === USER_DOESNT_EXIST ? (
                <ErrorScreen
                  errorMessage={LOGIN_STORE.getErrorText}
                  fn={() => {
                    LOGIN_STORE.setErrorText("");
                    LOGIN_STORE.setError(false);
                    navigation.push("Register");
                  }}
                  buttonText={"SIGN UP"}
                  showIconInButton={false}
                />
              ) : (
                <ErrorScreen
                  errorMessage={LOGIN_STORE.getErrorText}
                  fn={() => {
                    LOGIN_STORE.setErrorText("");
                    LOGIN_STORE.setError(false);
                  }}
                />
              )}
            </>
          ) : (
            <>
              <View style={styles.container}>
                <View>
                  <ScrollView keyboardShouldPersistTaps="always">
                    <View style={styles.headerTextContainer}>
                      <Text style={styles.loginText}>Login</Text>
                      {/* <IconButton
                        icon={"information-outline"}
                        onPress={() => {
                          setModalVisible(true);
                        }}
                      /> */}
                    </View>

                    <CustomAlert
                      title={loginInfoHeading}
                      message={studentInfoLogin}
                      startDate={""}
                      endDate={""}
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      buttons={[
                        {
                          text: `Don't show again`,
                          styles: {
                            color: "red",
                          },
                          func: async () => {
                            await EncryptedStorage.setItem(SEEN_INFO, "true");
                          },
                        },
                        {
                          text: "Okay",
                          func: async () => {
                            return;
                          },
                        },
                      ]}
                    />

                    <View style={{ marginBottom: verticalScale(55) }}>
                      <View style={styles.textInput}>
                        {/* <TextInput
                          label="Username"
                          placeholder="Enter your username"
                          mode="outlined"
                          value={user}
                          autoCapitalize="none"
                          style={{ backgroundColor: "white" }}
                          theme={{
                            colors: {
                              primary: "black",
                            },
                          }}
                          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                          onChangeText={(user) => {
                            setUser(user);
                          }}
                        /> */}
                      </View>
                      <View style={styles.textInput}>
                        {/* <TextInput
                          autoCorrect={false}
                          label="Password"
                          placeholder="Enter your password"
                          style={{ backgroundColor: "white" }}
                          mode="outlined"
                          autoComplete={"off"}
                          autoCapitalize="none"
                          secureTextEntry={passwordToggle}
                          theme={{
                            colors: {
                              primary: "black",
                            },
                          }}
                          selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
                          // right={
                            // <TextInput.Icon
                            //   name={eyeIcon}
                            //   onPress={() => {
                            //     setPasswordToggle(!passwordToggle);
                            //     setEyeIcon(
                            //       eyeIcon === "eye" ? "eye-off" : "eye"
                            //     );
                            //   }}
                            // />
                          // }
                          value={password}
                          onChangeText={(password) => setPassword(password)}
                        /> */}
                        <TouchableOpacity
                          onPress={() => {
                            navigation.push("Register");
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: scale(14),

                              marginTop: verticalScale(6),
                            }}
                          >
                            <Text
                              style={{
                                // added color style to view the text, text not visible otherwise
                                color: "black",
                              }}
                            >
                              Don't have an account?
                            </Text>

                            <Text
                              style={{
                                color: colors.Contrary,
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              Sign Up
                            </Text>
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.push("Reset");
                            RESET_STORE.setStudentToken("");
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: scale(14),

                              marginTop: verticalScale(6),
                            }}
                          >
                            <Text
                              style={{
                                // added color style to view the text, text not visible otherwise
                                color: "black",
                              }}
                            >
                              Forgot Password?
                            </Text>

                            <Text
                              style={{
                                color: "darkgreen",
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              Reset
                            </Text>
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.loginBtnView}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: colors.Tertiary,
                            borderRadius: verticalScale(22),
                          }}
                          onPress={() => {
                            onLogin(user);
                          }}
                        >
                          {/* <Icon
                            name="chevron-right"
                            size={verticalScale(44)}
                            color={colors.WHITE}
                          /> */}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </View>
                {/* {Platform.OS === "android" ? (
                  <LottieView
                    style={{
                      //height and width added to view animation
                      width: "100%",
                      height: scale(350),
                      marginTop: getHeight(10),
                    }}
                    source={lottieFile}
                    resizeMode="contain"
                    progress={1}
                    autoPlay
                    loop
                  />
                ) : (
                  <LottieView
                    style={{
                      //height and width added to view animation
                      width: "100%",
                      height: scale(350),
                      marginTop: getHeight(85),
                    }}
                    source={lottieFile}
                    resizeMode="contain"
                    progress={1}
                    autoPlay
                    loop
                  />
                )} */}
              </View>
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
});

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: "20@vs",
    justifyContent: "space-between",
    marginHorizontal: "15@s",

    marginRight: "15@s",
  },
  loginText: {
    padding: "10@msr",
    fontSize: "25@s",
    fontWeight: "bold",
    color: "black",
    marginLeft: "0@s",
  },
  textInput: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  loginBtnView: {
    justifyContent: "flex-end",
    alignItems: "flex-end",

    paddingHorizontal: moderateScale(20),
  },
});

export default LoginScreen;
