import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Linking,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getStatusBarHeight } from "react-native-status-bar-height";
import * as colors from "../../utils/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import MessageAPI from "./messageAPI";
import { useToast } from "react-native-toast-notifications";
import { launchImageLibrary } from "react-native-image-picker";

const pic = require("../../res/images/postSplash.png");

const NewMessageScreen = () => {
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState([]);
  const [response, setResponse] = useState();
  const [charCount, setCharCount] = useState(0);
  const [tags, setTags] = useState({
    deadline: false,
    update: false,
    other: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState("Everyone");

  const handleMessageChange = (text) => {
    setMessage(text);
    setCharCount(text.length);
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleTagClick = (tag) => {
    setTags((prevTags) => ({
      deadline: tag === "deadline" ? !prevTags.deadline : false,
      update: tag === "update" ? !prevTags.update : false,
      other: tag === "other" ? !prevTags.other : false,
    }));
  };

  const handleSend = async () => {
    await MessageAPI(message, title, selectedImage, links, toast, setResponse);
    if (response) {
      console.log(response);
    } else {
      console.log("No response received or error occurred");
    }
    setMessage("");
    setTitle("");
    setCharCount(0);
    setSelectedImage(null);
    setLinks([]);
  };

  // const handleSend = async () => {
  //   await MessageAPI(
  //     title,
  //     message,
  //     selectedImage,
  //     links,
  //     toast,
  //     setResponse => {
  //       if (response) {
  //         console.log(response);
  //       } else {
  //         console.log('No response received or error occurred');
  //       }
  //       setMessage('');
  //       setTitle('');
  //       setCharCount(0);
  //       setSelectedImage(null);
  //       setLinks([]);
  //     },
  //   );
  // };

  const handleLinkChange = (text) => {
    const newLinks = text.split(/\s+/);
    setLinks(newLinks);
  };

  const openPicker = () => {
    const options = {
      mediaType: "photo",
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity>
          <Icon name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <View style={{ ...styles.header, flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: moderateScale(17), fontWeight: "700" }}>
            New Message
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: colors.tabBarInactiveTintColor,
          borderRadius: 50,
          width: moderateScale(90),
          padding: moderateScale(4.5),
          marginTop: moderateScale(20),
        }}
      >
        <Text
          style={{
            color: colors.tabBarActiveTintColor,
            fontWeight: "700",
            fontSize: moderateScale(12),
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          Class Activity
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={pic}
          style={{
            width: moderateScale(40),
            height: moderateScale(40),
            borderRadius: 50,
            marginTop: moderateScale(10),
          }}
        />
        <TextInput
          style={{
            padding: 10,
            fontWeight: "400",
            color: colors.BLACK,
            width: "90%",
            marginTop: moderateScale(5),
            fontSize: moderateScale(18),
          }}
          placeholder="Type your title here.."
          placeholderTextColor="#687684"
          multiline={true}
          maxLength={420}
          textAlignVertical="auto"
          value={title}
          onChangeText={handleTitleChange}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{ ...styles.messageInput, fontSize: moderateScale(18) }}
          placeholder="Type your message here.."
          placeholderTextColor="#687684"
          multiline={true}
          maxLength={420}
          textAlignVertical="top"
          value={message}
          onChangeText={handleMessageChange}
        />
      </View>
      <View>
        <TextInput
          style={{
            fontSize: moderateScale(18),
            marginTop: moderateScale(10),
            color: colors.BLACK,
          }}
          placeholder="Add links here.."
          placeholderTextColor="#687684"
          value={links.join(" ")}
          onChangeText={handleLinkChange}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        {selectedImage && (
          <>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 4.5,
                right: -6,
                zIndex: 1,
                backgroundColor: "#1E509E",
                borderRadius: 10,
              }}
              onPress={() => setSelectedImage(null)}
            >
              <Icon name="close" size={15} color="white" />
            </TouchableOpacity>
            <Image
              source={{
                uri: selectedImage,
              }}
              style={{
                width: moderateScale(200),
                height: moderateScale(120),
                borderRadius: 10,
                marginTop: moderateScale(10),
              }}
              resizeMode="stretch"
            />
          </>
        )}
      </View>
      <View style={styles.dropdownContainer}>
        <Text
          style={{
            color: colors.tabBarActiveTintColor,
            fontSize: moderateScale(14),
          }}
        >
          To:
        </Text>
        {/* <Picker
          selectedValue={selectedRecipient}
          onValueChange={(itemValue) => setSelectedRecipient(itemValue)}
          style={styles.dropdown}
          itemStyle={{ fontSize: moderateScale(10) }}
        >
          <Picker.Item label="Everyone" value="Everyone" />
          <Picker.Item label="None" value="None" />
        </Picker> */}
        <TouchableOpacity
          onPress={() => handleTagClick("deadline")}
          style={[styles.tag, tags.deadline && styles.tagClicked]}
        >
          <Text
            style={[styles.tagText, tags.deadline && styles.tagTextClicked]}
          >
            Deadline
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTagClick("update")}
          style={[styles.tag, tags.update && styles.tagClicked]}
        >
          <Text style={[styles.tagText, tags.update && styles.tagTextClicked]}>
            Update
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTagClick("other")}
          style={[styles.tag, tags.other && styles.tagClicked]}
        >
          <Text style={[styles.tagText, tags.other && styles.tagTextClicked]}>
            Other
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#EEEEEE",
          marginBottom: moderateScale(10),
          marginTop: moderateScale(-10),
        }}
      ></View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={openPicker}
          style={{ marginRight: moderateScale(15) }}
        >
          <Icon name="image" size={30} color="#1E509E" />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Icon name="poll" size={30} color="#1E509E" />
        </TouchableOpacity> */}
        <View style={{ flex: 1 }}></View>
        <View
          style={{
            justifyContent: "center",
            marginRight: moderateScale(10),
            marginBottom: moderateScale(5),
          }}
        >
          <Text style={{ color: colors.tabBarInactiveTintColor }}>
            {charCount}/420
          </Text>
        </View>
        <TouchableOpacity onPress={handleSend}>
          <Icon name="send" size={30} color="#1E509E" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#EEEEEE",
          marginTop: moderateScale(10),
        }}
      ></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(15),
    backgroundColor: colors.WHITE,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  messageInput: {
    padding: 10,
    fontWeight: "400",
    minHeight: 250,
    color: colors.BLACK,
    marginTop: 10,
    // marginBottom: moderateScale(150),
    // width: '90%',
  },
  dropdownContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dropdown: {
    width: moderateScale(150),
    color: colors.tabBarActiveTintColor,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.tabBarInactiveTintColor,
    borderRadius: 50,
    padding: moderateScale(4.5),
    marginRight: moderateScale(6),
  },
  tagText: {
    color: colors.tabBarInactiveTintColor,
    fontWeight: "400",
    fontSize: moderateScale(12),
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: moderateScale(20),
  },
  tagClicked: {
    backgroundColor: colors.tabBarActiveTintColor,
  },
  tagTextClicked: {
    color: colors.WHITE,
  },
});

export default NewMessageScreen;
