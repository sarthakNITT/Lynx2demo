import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import CustomAlert from "../../components/customAlert";
import ErrorScreen from "../../components/ErrorScreen";
import LoaderPage from "../../components/LoadingScreen";
import SuccessScreen from "../../components/SuccessScreen";
import { API_STORE } from "../../mobx/API_STORE";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { STUDENT_DETAILS_STORE } from "../../mobx/STUDENT_DETAILS_STORE";
import { STUDENT_EDIT_PROFILE_STORE } from "../../mobx/STUDENT_EDIT_PROFILE_STORE";
import * as colors from "../../utils/colors";
import { NO_NETWORK } from "../../utils/ERROR_MESSAGES";
import {
  isStudentNameValid,
  isValidDOB,
} from "../../utils/helperFunction/FormValidation";
import { ACCENT_LOTTIE } from "../../utils/LOADING_TYPES";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import { getAllStudentDetails } from "../StudentUserScreen/apiCalls";
import { EditProfileAPI } from "./EditProfileAPI";
import EditProfileInputs from "./EditProfileInputs";
import EditProfileScreenHeader from "./EditProfileScreenHeader";
import StudentPhoto from "./StudentPhoto";

const PopulateData = () => {
  STUDENT_EDIT_PROFILE_STORE.setFirstName(STUDENT_DETAILS_STORE.getFirstName);
  STUDENT_EDIT_PROFILE_STORE.setLastName(STUDENT_DETAILS_STORE.getLastName);
  let dob = new Date(STUDENT_DETAILS_STORE.getDob);
  dob.setUTCHours(0);
  dob.setUTCMinutes(0);
  STUDENT_EDIT_PROFILE_STORE.setDOB(dob);
  STUDENT_EDIT_PROFILE_STORE.setAddress(STUDENT_DETAILS_STORE.getAddress);
  STUDENT_EDIT_PROFILE_STORE.setMobile(STUDENT_DETAILS_STORE.getMobileNo);
  STUDENT_EDIT_PROFILE_STORE.setGender(STUDENT_DETAILS_STORE.getGender);
  STUDENT_EDIT_PROFILE_STORE.setAadhar(0);
  STUDENT_EDIT_PROFILE_STORE.setCountryCode(
    STUDENT_DETAILS_STORE.getCountryCode
  );
  if (STUDENT_DETAILS_STORE.getProfilePic === "") {
    STUDENT_EDIT_PROFILE_STORE.setPic(STUDENT_DETAILS_STORE.getProfilePic);
  } else {
    STUDENT_EDIT_PROFILE_STORE.setPic(
      API_STORE.getCDN + STUDENT_DETAILS_STORE.getProfilePic
    );
  }
  console.log("Pop", dob);
};

const EditProfileScreen = observer(({ navigation }) => {
  const toast = useToast();

  const handleApiCall = () => {
    if (!isStudentNameValid(STUDENT_EDIT_PROFILE_STORE.getFirstName)) {
      toast.show("Enter a valid name", { type: "warning" });
      return;
    }

    if (!isValidDOB(STUDENT_EDIT_PROFILE_STORE.getDOB)) {
      toast.show("Enter a valid date of birth", { type: "warning" });
      return;
    }
    STUDENT_EDIT_PROFILE_STORE.setErrorText(null);
    const formData = new FormData();
    formData.append("first_name", STUDENT_EDIT_PROFILE_STORE.getFirstName);
    formData.append("last_name", STUDENT_EDIT_PROFILE_STORE.getLastName);
    formData.append("department", STUDENT_EDIT_PROFILE_STORE.getDepartment);
    formData.append("address", STUDENT_EDIT_PROFILE_STORE.getAddress);
    formData.append("mobile_no", STUDENT_EDIT_PROFILE_STORE.getMobile);
    formData.append("countryCode", STUDENT_EDIT_PROFILE_STORE.getCountryCode);
    formData.append("dob", STUDENT_EDIT_PROFILE_STORE.getDOB + "");
    formData.append("gender", STUDENT_EDIT_PROFILE_STORE.getGender.trim());

    // Append profile image if it exists
    if (STUDENT_EDIT_PROFILE_STORE.getPic !== "") {
      if (
        STUDENT_EDIT_PROFILE_STORE.getPic ===
        API_STORE.getCDN + STUDENT_DETAILS_STORE.getProfilePic
      ) {
        console.log("Not updating profile Pic");
      } else {
        console.log("Updating profile Pic");

        const image = STUDENT_EDIT_PROFILE_STORE.getImage;
        const file = {
          uri: image.uri,
          type: image.type || "image/jpeg",
          name: image.name || "profile.jpg",
        };

        formData.append("profileImg", file);
      }
    }


  //   const formData = new FormData();
  //   formData.append("first_name", STUDENT_EDIT_PROFILE_STORE.getFirstName);
  //   formData.append("last_name", STUDENT_EDIT_PROFILE_STORE.getLastName);
  //   formData.append("department", STUDENT_EDIT_PROFILE_STORE.getDepartment);
  //   formData.append("address", STUDENT_EDIT_PROFILE_STORE.getAddress);
  //   // formData.append('aadhar_no', STUDENT_EDIT_PROFILE_STORE.getAadhar);
  //   console.log(STUDENT_EDIT_PROFILE_STORE.getDOB + "");
  //   formData.append("mobile_no", STUDENT_EDIT_PROFILE_STORE.getMobile);
  //   formData.append("countryCode", STUDENT_EDIT_PROFILE_STORE.getCountryCode);
  //   formData.append("dob", STUDENT_EDIT_PROFILE_STORE.getDOB + "");
  //   formData.append("gender", STUDENT_EDIT_PROFILE_STORE.getGender.trim());
  //   console.log("pic:", STUDENT_EDIT_PROFILE_STORE.getPic);
  //   if (STUDENT_EDIT_PROFILE_STORE.getPic !== "") {
  //     if (
  //       STUDENT_EDIT_PROFILE_STORE.getPic ===
  //       API_STORE.getCDN + STUDENT_DETAILS_STORE.getProfilePic
  //     ) {
  //       console.log("Not updating profile Pic");
  //       formData.append("profileImg", "");
  //     } else {
  //       console.log("Updating profile Pic");
  //       console.log(
  //         // STUDENT_EDIT_PROFILE_STORE.getPic,
  //         STUDENT_DETAILS_STORE.getProfilePic
  //       );
  //       formData.append("profileImg", {
  //         uri: STUDENT_EDIT_PROFILE_STORE.getImage.uri,
  //         type: "image/jpeg",
  //         name: STUDENT_EDIT_PROFILE_STORE.getImage.name,
  //       });
  //     }
  //   }

    EditProfileAPI(formData);
  };

  function toggleTab(tabShow) {
    BOTTOM_NAV_STORE.setTabVisibility(tabShow);
  }

  useEffect(() => {
    STUDENT_EDIT_PROFILE_STORE.setSuccess(false);
    PopulateData();
    toggleTab(false);
    const backPress = BackHandler.addEventListener("backPress", onBackPress);

    return () => {
      backPress.remove();
    };
  }, []);

  const [modalTitle, setModalTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState({});

  const onBackPress = () => {
    setModalTitle("Confirmation");
    setModalMessage("Are you sure you want to discard unsaved changes?");
    setModalButtons([
      {
        text: "DISCARD",
        func: () => {
          toggleTab(true);
          navigation.goBack();
        },
      },
      {
        text: "KEEP EDITING",
        func: () => console.log("OK Pressed"),
      },
    ]);
    setModalVisible(true);
    return true;
  };

  return (
    <>
      {STUDENT_EDIT_PROFILE_STORE.getLoading ? (
        <LoaderPage LoadingAccent={ACCENT_LOTTIE} />
      ) : (
        <>
          {STUDENT_EDIT_PROFILE_STORE.getError ? (
            <ErrorScreen
              showIconInButton={false}
              errorMessage={STUDENT_EDIT_PROFILE_STORE.getErrorText}
              fn={() => {
                if (STUDENT_EDIT_PROFILE_STORE.getErrorText === NO_NETWORK) {
                  handleApiCall();
                } else {
                  STUDENT_EDIT_PROFILE_STORE.setErrorText("");
                  STUDENT_EDIT_PROFILE_STORE.setError(false);
                }
              }}
            />
          ) : (
            <>
              {STUDENT_EDIT_PROFILE_STORE.getSuccess ? (
                <SuccessScreen
                  buttonText={"BACK"}
                  showLeftIconInButton={true}
                  text="Profile Details Updated Successfully"
                  fn={() => {
                    STUDENT_EDIT_PROFILE_STORE.reset();
                    STUDENT_DETAILS_STORE.setRefresh(true);
                    getAllStudentDetails(true);
                    //CLUB_USER_STORE.setRefresh(true);
                    navigation.pop();
                  }}
                />
              ) : (
                <>
                  <SafeAreaView style={styles.container}>
                    <CustomAlert
                      title={modalTitle}
                      message={modalMessage}
                      startDate={""}
                      endDate={""}
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      buttons={modalButtons}
                    />
                    <EditProfileScreenHeader
                      navigation={navigation}
                      isValid={
                        STUDENT_EDIT_PROFILE_STORE.getAddress.length >= 0 &&
                        STUDENT_EDIT_PROFILE_STORE.getFirstName.length > 0
                      }
                      handleApiCall={handleApiCall}
                    />
                    {Platform.OS === "ios" ? (
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        onScroll={() => {
                          Keyboard.dismiss();
                        }}
                      >
                        <StudentPhoto />
                        <EditProfileInputs />
                        {/* <View style={{height: verticalScale(350)}} /> */}
                      </ScrollView>
                    ) : (
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                      >
                        <StudentPhoto />
                        <EditProfileInputs />
                        {/* <View style={{height: verticalScale(350)}} /> */}
                      </ScrollView>
                    )}
                  </SafeAreaView>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.Secondary,
  },
  viewScale: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
  },
  divider: {
    height: verticalScale(2),
    backgroundColor: colors.GRAY_MEDIUM,
  },
  buttonViewTheme: {
    fontSize: 16,
    padding: moderateScale(8),
    backgroundColor: colors.CreationScreen_Button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextTheme: {
    fontSize: 16,
    marginLeft: scale(10),
    color: colors.CreationScreen_ButtonText,
  },
  footer: {
    flexDirection: "row",
    paddingVertical: verticalScale(5),
  },
  twoButtonContainer: {
    flexDirection: "row",
  },
  twoButtonLeft: {
    flex: 1,
    paddingRight: scale(5),
    paddingLeft: scale(20),
    paddingVertical: verticalScale(5),
  },
  twoButtonRight: {
    flex: 1,
    paddingRight: scale(20),
    paddingLeft: scale(5),
    paddingVertical: verticalScale(5),
  },
  uploadButton: {
    backgroundColor: colors.Tertiary,
    borderRadius: moderateScale(6),
    marginVertical: verticalScale(9),
    marginHorizontal: HorizontalPadding,
  },
});

export default EditProfileScreen;
