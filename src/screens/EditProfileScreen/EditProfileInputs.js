import { observer } from "mobx-react";
import moment from "moment";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
// import DatePicker from "react-native-modal-datetime-picker";
import { Divider, TextInput } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { STUDENT_DETAILS_STORE } from "../../mobx/STUDENT_DETAILS_STORE";
import { STUDENT_EDIT_PROFILE_STORE } from "../../mobx/STUDENT_EDIT_PROFILE_STORE";
import * as colors from "../../utils/colors";
import { UTCdate } from "../../utils/helperFunction/getFormattedDate";
import { COUNTRY_DATA } from "../../utils/MODAL_DATABASE";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
const DATE_FORMAT = "MMMM DD, YYYY";

const TEXT_INPUT = ({
  placeholder,
  label,
  icon,
  onTextChange,
  showCharCount,
  charCount,
  value,
  maxLength = 1000,
  keyboardType = "default",
  multiline = false,
  style = {},
  showIcon = true,
  disabled = false,
}) => {
  return (
    <TextInput
      disabled={disabled}
      underlineColor="transparent"
      label={label}
      value={value}
      maxLength={maxLength}
      style={{
        backgroundColor: colors.GRAY_LIGHT,
        borderTopRightRadius: moderateScale(6),
        borderTopLeftRadius: moderateScale(6),
        marginHorizontal: scale(HorizontalPadding),
        marginTop: verticalScale(3),
        ...style,
      }}
      placeholder={placeholder}
      multiline={multiline}
      keyboardType={keyboardType}
      theme={{
        colors: {
          primary: colors.BLACK,
        },
      }}
      selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
      onChangeText={(text) => {
        onTextChange(text);
      }}
      left={
        showIcon ? <TextInput.Icon name={icon} color={colors.Accent} /> : null
      }
      right={
        showCharCount ? (
          <TextInput.Affix
            text={"/" + (maxLength - charCount)}
            textStyle={{
              color:
                maxLength - charCount < 0 ? colors.Tertiary : colors.GRAY_DARK,
            }}
          />
        ) : (
          <></>
        )
      }
    />
  );
};

const EditProfileInputs = observer(() => {
  const onChangeDate = (newDate) => {
    STUDENT_EDIT_PROFILE_STORE.setDatePicker(false);
    STUDENT_EDIT_PROFILE_STORE.setDOB(moment(newDate).format("YYYY-MM-DD"));
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState(false);
  const HEIGHT = Dimensions.get("window").height;
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              ...styles.modalView,
              height: gender ? HEIGHT / 3 : HEIGHT / 1.8,
            }}
          >
            <FlatList
              data={gender ? ["male", "female"] : COUNTRY_DATA}
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              bouncesZoom={false}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      if (!gender) {
                        STUDENT_EDIT_PROFILE_STORE.setCountryCode(
                          "+" + item.code
                        );
                      } else {
                        STUDENT_EDIT_PROFILE_STORE.setGender(item);
                      }
                      setModalVisible(false);
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        marginVertical: verticalScale(6),
                      }}
                    >
                      {!gender ? (
                        <>
                          <View style={{ width: "80%" }}>
                            <Text>{item.name}</Text>
                          </View>
                          <View style={{ width: "20%" }}>
                            <Text>+{item.code}</Text>
                          </View>
                        </>
                      ) : (
                        <>
                          <View style={{ width: "80%" }}>
                            <Text>{item.toUpperCase()}</Text>
                          </View>
                        </>
                      )}
                    </View>
                    <Divider />
                  </TouchableOpacity>
                </View>
              )}
              numColumns={1}
              keyExtractor={(item, index) => index}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.viewScale}>
        <TextInput
          selection={{ start: 0, end: 0 }}
          disabled={true}
          style={{
            backgroundColor: colors.GRAY_LIGHT,
            borderTopLeftRadius: moderateScale(6),
            borderTopRightRadius: moderateScale(6),
            marginHorizontal: HorizontalPadding,
          }}
          theme={{
            colors: {
              primary: "black",
            },
          }}
          left={
            <TextInput.Icon name="account" size={25} color={colors.GRAY_DARK} />
          }
        >
          Name : {STUDENT_EDIT_PROFILE_STORE.getFirstName}
        </TextInput>
      </View>

      <TouchableOpacity
        onPress={() => {
          setGender(true);
          setModalVisible(true);
        }}
      >
        <View style={styles.viewScale}>
          <TextInput
            selection={{ start: 0, end: 0 }}
            disabled={true}
            style={{
              backgroundColor: colors.GRAY_LIGHT,
              borderTopLeftRadius: moderateScale(6),
              borderTopRightRadius: moderateScale(6),
              marginHorizontal: HorizontalPadding,
              color: "red",
            }}
            theme={{
              colors: {
                primary: "black",
              },
            }}
            left={
              <TextInput.Icon
                name="gender-male-female"
                size={25}
                color={colors.Accent}
              />
            }
          >
            Gender : {STUDENT_EDIT_PROFILE_STORE.getGender.toUpperCase()}
          </TextInput>
        </View>
      </TouchableOpacity>

      <View style={styles.viewScale}>
        <TextInput
          disabled={true}
          selection={{ start: 0, end: 0 }}
          style={{
            backgroundColor: colors.GRAY_LIGHT,
            borderTopLeftRadius: moderateScale(6),
            borderTopRightRadius: moderateScale(6),
            marginHorizontal: HorizontalPadding,
          }}
          theme={{
            colors: {
              primary: "black",
            },
          }}
          left={
            <TextInput.Icon name="book" size={25} color={colors.GRAY_DARK} />
          }
        >
          Department : {STUDENT_DETAILS_STORE.getDepartment}
        </TextInput>
      </View>
      <View style={styles.viewScale}>
        <TouchableOpacity
          onPress={() => STUDENT_EDIT_PROFILE_STORE.setDatePicker(true)}
        >
          <TextInput
            disabled={true}
            style={{
              backgroundColor: colors.GRAY_LIGHT,
              borderTopLeftRadius: moderateScale(6),
              borderTopRightRadius: moderateScale(6),
              marginHorizontal: HorizontalPadding,
            }}
            theme={{
              colors: {
                primary: "black",
              },
            }}
            selectionColor={colors.TEXT_INPUT_SELECTION_COLOR}
            left={
              <TextInput.Icon name="calendar" size={25} color={colors.Accent} />
            }
          >
            Date of Birth: {UTCdate(STUDENT_EDIT_PROFILE_STORE.getDOB)}
          </TextInput>
        </TouchableOpacity>

        {/* {STUDENT_EDIT_PROFILE_STORE.getDatePicker && (
          <DatePicker
            isVisible={STUDENT_EDIT_PROFILE_STORE.getDatePicker}
            date={new Date(STUDENT_EDIT_PROFILE_STORE.getDOB)}
            mode="date"
            timeZoneOffsetInMinutes={0}
            onConfirm={onChangeDate}
            onCancel={() => STUDENT_EDIT_PROFILE_STORE.setDatePicker(false)}
          />
        )} */}
      </View>
      {/* 
      <TEXT_INPUT
        label="Aadhar Number"
        placeholder="Aadhar Number"
        showCharCount={false}
        keyboardType="number-pad"
        maxLength={12}
        value={
          STUDENT_EDIT_PROFILE_STORE.getAadhar != null
            ? STUDENT_EDIT_PROFILE_STORE.getAadhar.toString()
            : ''
        }
        icon={'card-account-details'}
        onTextChange={nAadharNumber => {
          STUDENT_EDIT_PROFILE_STORE.setAadhar(nAadharNumber);
        }}
      /> */}
      <TEXT_INPUT
        label="Address"
        placeholder="Address"
        showCharCount={true}
        icon={"map-marker"}
        multiline={true}
        maxLength={300}
        value={STUDENT_EDIT_PROFILE_STORE.getAddress}
        charCount={STUDENT_EDIT_PROFILE_STORE.getAddress.length}
        onTextChange={(nAddress) => {
          STUDENT_EDIT_PROFILE_STORE.setAddress(nAddress);
        }}
      />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setGender(false);
            setModalVisible(true);
          }}
        >
          <TextInput
            style={{
              backgroundColor: colors.GRAY_LIGHT,
              borderTopRightRadius: moderateScale(0),
              borderTopLeftRadius: moderateScale(6),
              marginLeft: scale(HorizontalPadding),
              marginTop: verticalScale(3),
              borderBottomLeftRadius: 0,
            }}
            disabled={true}
            showCharCount={false}
            value={STUDENT_EDIT_PROFILE_STORE.getCountryCode}
            disableFullscreenUI={true}
            left={
              <TextInput.Icon
                onPress={() => {
                  setGender(false);
                  setModalVisible(true);
                }}
                name={"phone"}
                color={colors.Accent}
              />
            }
          />
        </TouchableOpacity>
        <TEXT_INPUT
          label="Mobile Number"
          placeholder="Mobile Number"
          icon="phone"
          maxLength={14}
          keyboardType="number-pad"
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            marginLeft: scale(5),
            flex: 1,
          }}
          showIcon={false}
          showCharCount={false}
          value={
            STUDENT_EDIT_PROFILE_STORE.getMobile != null
              ? STUDENT_EDIT_PROFILE_STORE.getMobile.toString()
              : ""
          }
          onTextChange={(val) => {
            STUDENT_EDIT_PROFILE_STORE.setMobile(val);
          }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  viewScale: {
    paddingHorizontal: scale(0),
    marginTop: verticalScale(3),
  },
  modalView: {
    marginVertical: scale(12),
    marginHorizontal: scale(8),
    height: Dimensions.get("window").height / 1.8,
    backgroundColor: colors.WHITE,
    opacity: 0.99,
    borderRadius: scale(20),
    padding: scale(15),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },

  modalText: {
    marginBottom: scale(15),
    letterSpacing: 0.7,
    color: colors.GRAY_LIGHT,
    fontSize: scale(16),
    textAlign: "justify",
  },
  modalTitle: {
    fontSize: scale(18),
    color: colors.GRAY_LIGHT,
    fontWeight: "bold",
  },
  closeButton: {
    borderRadius: scale(10),
    padding: scale(8),
    elevation: 2,
    backgroundColor: colors.EventDescriptionScreen_Button,
    marginTop: verticalScale(6),
  },
  textStyle: {
    color: "white",
    fontSize: scale(14),
    paddingHorizontal: scale(18),
    textAlign: "center",
  },
  container: { flex: 1, paddingVertical: verticalScale(4) },
});

export default EditProfileInputs;
