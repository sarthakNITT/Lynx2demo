import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ImageView from "../../components/ImageView";
import Text from "../../components/TextComponent";
import { API_STORE } from "../../mobx/API_STORE";
import { NO_IMAGE_URL } from "../../utils/API_CONSTANTS";
import { WHITE } from "../../utils/colors";
import ModalContent from "../UserScreen/ModalContent";
import * as colors from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentUserHeader = ({ studentDetails, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalScreen}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{ height: "100%" }} />
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <ModalContent
              ModalVisible={setModalVisible}
              navigation={navigation}
            />
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{ marginRight: scale(6) }}
          onPress={() => navigation.push("QRScreen")}
        >
          <Icon name="qr-code" size={scale(28)} style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <SimpleLineIcons
            name="options-vertical"
            size={scale(21)}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.userStyle}>
        <View style={{ ...styles.imageStyle, elevation: 0 }}>
          <ImageView
            style={styles.imageStyle}
            src={
              studentDetails.coverPhotoUri !== API_STORE.getCDN
                ? studentDetails.coverPhotoUri
                : NO_IMAGE_URL
            }
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailsBorder}>
          <View style={styles.textBorder}>
            <Text
              style={{
                ...styles.textStyle,
                fontWeight: "bold",
                fontSize: moderateScale(18),
              }}
            >
              {studentDetails.studentUsername}
            </Text>
          </View>
          {/* <Divider style={styles.divider} /> */}
          <View style={styles.textBorder}>
            <Text style={styles.textStyle}>{studentDetails.studentRno}</Text>
          </View>
          {/* <Divider style={styles.divider} /> */}
          <View style={styles.textBorder}>
            <Text numberOfLines={2} style={styles.textStyle}>
              {studentDetails.studentDept}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.push("SecurityScreen")}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: scale(5),
            borderRadius: scale(5),
            borderWidth: 0.5,
            marginTop: verticalScale(10),
            borderColor: colors.GRAY_DARK,
          }}
        >
          <Image
            style={{
              width: scale(30),
              height: scale(30),
              resizeMode: "contain",
            }}
            source={require("../../res/images/secureIcon.png")}
          />
          <Text
            style={{
              fontSize: moderateScale(16),
              fontWeight: "500",
              letterSpacing: 0.3,
              //manually added black color
              color: "black",
            }}
          >
            {"  "}
            Lynx Authenticator
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
    backgroundColor: WHITE,
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
  },
  userStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyle: {
    borderRadius: moderateScale(100),
    width: moderateScale(100),
    height: moderateScale(100),
  },
  detailsBorder: {
    flex: 1,
    marginStart: scale(20),
  },
  textBorder: {
    marginVertical: verticalScale(1),
    marginStart: scale(8),
  },
  textStyle: {
    fontSize: moderateScale(16),
    //added colour manually
    color: "black",
  },
  divider: {
    backgroundColor: "black",
  },
  iconStyle: {
    alignSelf: "flex-end",
    //manually added color
    color: "black",
  },
  modalScreen: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    width: "100%",
    bottom: "0%",
    position: "absolute",
  },
});

export default StudentUserHeader;
