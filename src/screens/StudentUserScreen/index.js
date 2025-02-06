import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import ErrorScreen from "../../components/ErrorScreen";
import LoaderPage from "../../components/LoadingScreen";
import { API_STORE } from "../../mobx/API_STORE";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { STUDENT_DETAILS_STORE } from "../../mobx/STUDENT_DETAILS_STORE";
import { ACCENT_STUDENT_USER_LOADER } from "../../utils/LOADING_TYPES";
import {
  FOLLOWING_CLUBS_PROFILE,
  INTERESTED_EVENTS_PROFILE,
} from "../../utils/screenNames";
import { getAllStudentDetails } from "./apiCalls";
import Body from "./StudentUserBody";
import Header from "./StudentUserHeader";
const StudentUserScreen = observer(({ navigation }) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    BOTTOM_NAV_STORE.setTabVisibility(true);
  }

  const studentUsername =
    STUDENT_DETAILS_STORE.getFirstName +
    " " +
    STUDENT_DETAILS_STORE.getLastName;
  const studentRno = STUDENT_DETAILS_STORE.getRollNo;
  const studentDept = STUDENT_DETAILS_STORE.getDepartment;
  const coverPhotoUri = API_STORE.getCDN + STUDENT_DETAILS_STORE.getProfilePic;
  const interests = STUDENT_DETAILS_STORE.getInterests;

  React.useEffect(() => {
    STUDENT_DETAILS_STORE.setIsLoading(true);
    getAllStudentDetails();
  }, []);

  const studentDetails = {
    studentUsername,
    studentRno,
    studentDept,
    coverPhotoUri,
  };

  const goToClub = (club) => {
    navigation.push("ClubDescription", {
      ClubId: club.clubId._id,
      fromScreen: FOLLOWING_CLUBS_PROFILE,
      func: (remove) => {
        if (remove) {
          STUDENT_DETAILS_STORE.removeFollowingClub(club);
        } else {
          STUDENT_DETAILS_STORE.addFollowingClub(club);
        }
      },
    });
  };

  const goToEvent = (event) => {
    navigation.push("EventDescriptionScreen", {
      eventId: event._id,
      app: true,
      fromScreen: INTERESTED_EVENTS_PROFILE,
      func: (remove) => {
        if (remove) {
          STUDENT_DETAILS_STORE.removeInterestedEvent(event);
        } else {
          STUDENT_DETAILS_STORE.addInterestedEvent(event);
        }
      },
    });
    //navigation.push('EventDescription', {data: {EventId: event._id}});
  };

  const functionCalls = {
    goToClub,
    goToEvent,
  };

  return (
    <View style={styles.container}>
      {STUDENT_DETAILS_STORE.isError ? (
        <ErrorScreen
          showIconInButton={false}
          errorMessage={STUDENT_DETAILS_STORE.errorText}
          fn={() => {
            getAllStudentDetails();
          }}
        />
      ) : STUDENT_DETAILS_STORE.isLoading ? (
        <LoaderPage LoadingAccent={ACCENT_STUDENT_USER_LOADER} />
      ) : (
        <>
          <Header studentDetails={studentDetails} navigation={navigation} />
          <Body navigation={navigation} functionCalls={functionCalls} />
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
  },
});

export default StudentUserScreen;
