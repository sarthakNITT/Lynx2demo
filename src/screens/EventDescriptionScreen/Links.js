import React from "react";
import { TouchableOpacity, View } from "react-native";
import { verticalScale } from "react-native-size-matters";
import Text from "../../components/TextComponent";
import * as colors from "../../utils/colors";
import { openLink } from "../../utils/helperFunction/openLink";
import styles from "./SharedStyles";

const Links = ({ links }) => {
  return (
    <View
      style={{
        ...styles.fragment,
        backgroundColor: colors.WHITE,
        paddingTop: verticalScale(15),
        marginBottom: verticalScale(-20),
      }}
    >
      <View style={{}}>
        {links.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // Linking.openURL(item).catch(err =>
                //   console.error('Invalid URL', err),
                // );
                openLink(item);
              }}
            >
              <Text
                numberOfLines={1}
                style={{ ...styles.url, textAlign: "center" }}
                ellipsizeMode="tail"
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default Links;
