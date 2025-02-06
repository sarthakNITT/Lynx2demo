import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { scale, verticalScale } from "react-native-size-matters";
import * as colors from "../../utils/colors";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import { Button, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useToast } from "react-native-toast-notifications";
import Clipboard from "@react-native-clipboard/clipboard";
import ImageView from "../ImageView";
import { NO_IMAGE_URL } from "../../utils/API_CONSTANTS";

const AccessSecurityCard = ({
  clientName = "",
  permissions = [],
  code = "",
  image = NO_IMAGE_URL,
  expiry,
}) => {
  const [allow, setAllow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const toast = useToast();

  return (
    <View
      style={{
        margin: scale(HorizontalPadding),
        backgroundColor: colors.WHITE,
        elevation: 1,
        padding: scale(9),
        borderRadius: scale(9),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: verticalScale(3),
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: scale(18),
              maxWidth: scale(200),
            }}
            numberOfLines={1}
          >
            {clientName.toUpperCase()}
          </Text>
          <Text>{clientName} requires access to your data </Text>
        </View>

        <ImageView
          style={{
            width: scale(50),
            height: scale(50),
            borderRadius: scale(25),
          }}
          src={image}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: verticalScale(6),
        }}
      >
        <View
          style={{
            marginTop: verticalScale(3),
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "80%",
            minWidth: "80%",

            marginRight: scale(3),
          }}
        >
          {showMore ? (
            <>
              {permissions.map((val, index) => {
                return (
                  <Chip
                    key={index}
                    mode="outlined"
                    style={{
                      backgroundColor: "transparent",
                      marginRight: scale(3),
                      marginTop: verticalScale(3),
                    }}
                    textStyle={{
                      fontSize: scale(10),
                      color: colors.EventDescriptionScreen_TagText,
                      fontWeight: "300",
                    }}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {val.toUpperCase()}
                  </Chip>
                );
              })}
            </>
          ) : (
            <>
              {permissions.slice(0, 2).map((val, index) => {
                return (
                  <Chip
                    key={index}
                    mode="outlined"
                    style={{
                      backgroundColor: "transparent",
                      marginRight: scale(3),
                      marginTop: verticalScale(3),
                    }}
                    textStyle={{
                      fontSize: scale(10),
                      color: colors.EventDescriptionScreen_TagText,
                      fontWeight: "300",
                    }}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {val.toUpperCase()}
                  </Chip>
                );
              })}
              <TouchableOpacity onPress={() => setShowMore(true)}>
                <View
                  style={{
                    marginHorizontal: scale(3),

                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: scale(14),
                      textAlign: "center",
                    }}
                  >
                    +{permissions.length - 2}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View>
          <TouchableOpacity
            disabled={loading || allow}
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setAllow(true);
              }, 1000);
            }}
          >
            <View
              loading={loading}
              style={{
                justifyContent: "center",
                backgroundColor: loading ? colors.GRAY_DARK : colors.Green,
                padding: scale(6),
                borderRadius: scale(6),
                width: scale(60),
                height: verticalScale(35),
              }}
            >
              {allow ? (
                <>
                  <MaterialIcons
                    name="done-all"
                    style={{
                      color: colors.GRAY_LIGHT,
                      alignSelf: "center",
                    }}
                    size={scale(25)}
                  />
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: colors.GRAY_LIGHT,
                      fontSize: scale(11.5),
                    }}
                  >
                    ALLOW
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {allow ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: verticalScale(3),
              marginTop: verticalScale(9),
            }}
          >
            <Text
              style={{
                fontWeight: "300",
                fontSize: scale(15),
              }}
            >
              Your Security code is{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: scale(18),
                  maxWidth: scale(200),
                }}
              >
                {code}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(`${code}`);
                toast.show(`Security Code copied to Clipboard`, {
                  type: "success",
                });
              }}
            >
              <Icon name="content-copy" size={scale(25)} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: scale(10) }}>
            Will expire in {expiry} seconds
          </Text>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default AccessSecurityCard;
