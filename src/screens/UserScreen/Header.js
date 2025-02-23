import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePalette from "@somesoap/react-native-image-palette";
import ImageView from "../../components/ImageView";
import LoaderPage from "../../components/LoadingScreen";
import Text from "../../components/TextComponent";
import { API_STORE } from "../../mobx/API_STORE";
import { NO_IMAGE_URL } from "../../utils/API_CONSTANTS";
import * as colors from "../../utils/colors";
import { ACCENT_STUDENT_USER_LOADER } from "../../utils/LOADING_TYPES";
import { HorizontalPadding, NUMBER_OF_LINES } from "../../utils/UI_CONSTANTS";
import ModalContent from "./ModalContent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Header = ({ name, followers, url, description, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coverColor, setCoverColor] = useState(colors.Primary); // Default color
  const [coverIconColor, setCoverIconColor] = useState(colors.BLACK);
  const [showMoreText, setShowMoreText] = useState(true);
  const [moreText, setMoreText] = useState("more");
  const [numberOfLines, setNumberOfLines] = useState(NUMBER_OF_LINES);
  const [showingMore, setShowingMore] = useState(false);

  const onShowMorePressed = () => {
    setMoreText(showingMore ? "more" : "less");
    setNumberOfLines(showingMore ? NUMBER_OF_LINES : 100);
    setShowingMore(!showingMore);
  };

  const getColors = () => {
    ImagePalette.getNamedColors(url)
      .then(({ vibrant, muted }) => {
        setCoverColor(vibrant || colors.Primary);
        setCoverIconColor(muted || colors.Secondary);
      })
      .catch(() => {
        setCoverColor(colors.Primary); // Fallback color
        setCoverIconColor(colors.Secondary);
      });
  };

  // Get image size and colors
  Image.getSize(url, () => {
    getColors();
  });

  const onTextLayout = useCallback((e) => {
    setShowMoreText(e.nativeEvent.lines.length > NUMBER_OF_LINES);
  });

  return coverColor === colors.Primary ? (
    <>
      <View
        style={{
          height: windowHeight,
          alignItems: "center",
          justifyContent: "center",
          width: windowWidth,
          marginTop: verticalScale(10),
        }}
      >
        <LoaderPage LoadingAccent={ACCENT_STUDENT_USER_LOADER} />
      </View>
    </>
  ) : (
    <View style={{ backgroundColor: colors.WHITE }}>
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

      <View style={{ backgroundColor: coverColor, height: verticalScale(81) }}>
        <Pressable style={styles.icon} onPress={() => setModalVisible(true)}>
          <Icon
            name="menu"
            color={coverIconColor}
            size={scale(25)}
            style={{
              alignSelf: "flex-end",
              paddingRight: scale(HorizontalPadding),
              marginTop: verticalScale(6),
            }}
          />
        </Pressable>
      </View>
      <View style={styles.imageView}>
        <ImageView
          src={url !== API_STORE.getCDN ? url : NO_IMAGE_URL}
          style={styles.image}
          resizeMode={"cover"}
        />
      </View>
      <View
        style={{
          paddingTop: verticalScale(8),
          marginHorizontal: scale(HorizontalPadding),
        }}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.followers}>{followers} followers</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = ScaledSheet.create({
  text: {
    fontSize: scale(14),
    lineHeight: verticalScale(25),
    fontWeight: "300",
  },
  moreText: {
    fontSize: "14@s",
    color: colors.Blue,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  imageView: {
    width: "120@s",
    height: "120@s",
    marginTop: "-67@vs",
    borderRadius: "60@s",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(HorizontalPadding),
    backgroundColor: "transparent",
  },
  image: {
    width: "120@s",
    height: "120@s",
    borderRadius: "60@s",
    justifyContent: "center",
    borderColor: colors.Primary,
  },
  numbers: {
    color: colors.WHITE,
    fontSize: "18@s",
    fontWeight: "bold",
  },
  name: {
    fontSize: "18@s",
    fontWeight: "bold",
    color: colors.BLACK,
  },
  icon: {
    paddingHorizontal: "10@s",
    paddingRight: 0,
    paddingBottom: "7@vs",
    alignSelf: "flex-end",
  },
  modalScreen: {
    width: "100%",
    height: "auto",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  followers: {
    color: colors.Tertiary,
    paddingVertical: "2@vs",
    fontWeight: "bold",
    paddingBottom: 0,
  },
  modalView: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    width: "100%",
    bottom: "0%",
    position: "absolute",
  },
});
