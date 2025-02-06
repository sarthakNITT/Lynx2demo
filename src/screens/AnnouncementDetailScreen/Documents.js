import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import { API_STORE } from "../../mobx/API_STORE";
import { API_GET_IMAGE, NO_IMAGE_URL } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";

const pdf = require("../../res/images/pdf.png");
const doc = require("../../res/images/doc.png");

const DisplayDocument = ({ data, navigation }) => {
  const type = data.mimetype.split("/");

  return (
    <>
      {type[0] === "image" ? (
        <TouchableOpacity
          style={{
            alignItems: "center",
            elevation: 1,
            width: scale(150),
            borderRadius: moderateScale(12),
            marginHorizontal: verticalScale(5),
            marginTop: verticalScale(15),
          }}
          onPress={() => {
            navigation.push("ImageScreen", {
              imgUrl: data.file_stored_name
                ? API_STORE.getCDN + data.file_stored_name
                : NO_IMAGE_URL,
            });
          }}
        >
          <Image
            style={{
              width: scale(150),
              height: scale(150),
              // borderTopLeftRadius: moderateScale(12),
              // borderTopRightRadius: moderateScale(12),
              borderRadius: moderateScale(6),
              backgroundColor: "white",
              //marginVertical: verticalScale(10),
            }}
            resizeMode="cover"
            source={{
              uri: data.file_stored_name
                ? API_GET_IMAGE + data.file_stored_name
                : NO_IMAGE_URL,
            }}
          />
        </TouchableOpacity>
      ) : (
        <>
          {type[1] === "pdf" ? (
            <>
              <TouchableOpacity
                style={{
                  alignItems: "center",

                  width: scale(150),
                  marginTop: verticalScale(15),
                  borderRadius: moderateScale(12),
                  marginHorizontal: verticalScale(5),
                }}
                onPress={() => {
                  try {
                    Linking.openURL(API_STORE.getCDN + data.file_stored_name);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Image
                  style={{
                    width: scale(150),
                    height: scale(150),
                    marginVertical: verticalScale(10),
                  }}
                  resizeMode="contain"
                  source={pdf}
                />
                <Text numberOfLines={1} style={styles.documentName}>
                  {data.originalname}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  alignItems: "center",

                  width: scale(150),
                  marginTop: verticalScale(15),
                  marginHorizontal: verticalScale(5),
                  borderRadius: moderateScale(12),
                }}
                onPress={() => {
                  try {
                    Linking.openURL(API_STORE.getCDN + data.file_stored_name);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Image
                  style={{
                    width: scale(148),
                    height: scale(150),
                    marginVertical: verticalScale(10),
                  }}
                  resizeMode="contain"
                  source={doc}
                />
                <Text numberOfLines={1} style={styles.documentName}>
                  {data.originalname}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </>
  );
};
const Documents = ({ docs, navigation }) => {
  return (
    <View style={{ alignContent: "center", alignItems: "center" }}>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "300",
          fontSize: scale(18),
          paddingVertical: verticalScale(10),
          textDecorationLine: "underline",
          color: colors.Accent,
        }}
      >
        Attachments
      </Text>
      {docs.map((item, index) => {
        return (
          <DisplayDocument navigation={navigation} key={index} data={item} />
        );
      })}
    </View>
  );
};

export default Documents;

const styles = StyleSheet.create({
  documentName: {
    fontSize: scale(11),
    fontWeight: "300",
    marginTop: verticalScale(-6),
    paddingBottom: verticalScale(3),
    paddingHorizontal: scale(HorizontalPadding),
  },
  imageName: {
    fontSize: scale(11),
    fontWeight: "300",
    paddingTop: verticalScale(3),
    paddingBottom: verticalScale(3),
    paddingHorizontal: scale(HorizontalPadding),
  },
});
