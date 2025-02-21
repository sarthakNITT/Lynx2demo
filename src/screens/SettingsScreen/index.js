import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { USER_STORE } from "../../mobx/USER_STORE";
import { STUDENT } from "../../utils/USER_TYPE";
import ClubSettings from "./ClubSettings";
import StudentSettings from "./StudentSettings";

const SettingsScreen = ({ navigation }) => {
  useEffect(() => {
    BOTTOM_NAV_STORE.setTabVisibility(false);

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      {USER_STORE.getUserType === STUDENT ? (
        <StudentSettings navigation={navigation} />
      ) : (
        <ClubSettings />
      )}
      {/* <StudentSettings /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: moderateScale(18),
    marginHorizontal: scale(16),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(4),
    fontWeight: "500",
  },
});

export default SettingsScreen;
