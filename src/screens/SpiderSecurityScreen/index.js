import { View, FlatList, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import Text from "../../components/TextComponent";
import { BOTTOM_NAV_STORE } from "../../mobx/BOTTOM_NAV_STORE";
import { scale, verticalScale } from "react-native-size-matters";
import { HorizontalPadding } from "../../utils/UI_CONSTANTS";
import AccessSecurityCard from "../../components/AccessSecurityCard";
import { SECURE_STORE } from "../../mobx/SECURITY_STORE";
import { secureAPI } from "./Secure_api";
import * as colors from "../../utils/colors";
import { observer } from "mobx-react";
import { getPermission } from "../../utils/helperFunction/getPermissions";

const SecurityScreen = observer(() => {
  const onRefresh = React.useCallback(() => {
    SECURE_STORE.setRefreshing(true);
    SECURE_STORE.setError(false);
    SECURE_STORE.setErrorText("");
    //FEEDS_STORE.setLoading(true);

    secureAPI(true);
  }, []);

  useEffect(() => {
    BOTTOM_NAV_STORE.setTabVisibility(false);
    SECURE_STORE.setLoading(true);
    secureAPI(false);
  }, []);

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
        refreshControl={
          <RefreshControl
            refreshing={SECURE_STORE.getRefreshing}
            colors={[colors.Accent]}
            tintColor={colors.Accent}
            onRefresh={onRefresh}
            progressViewOffset={verticalScale(50)}
          />
        }
        data={SECURE_STORE.getData}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{ width: scale(HorizontalPadding) }} />
        )}
        ListEmptyComponent={
          <Text
            style={{
              marginTop: "75%",
              fontSize: scale(16),
              fontWeight: "bold",
              textAlign: "center",
              marginHorizontal: scale(HorizontalPadding),
            }}
          >
            Security codes have not been requested for your account.
          </Text>
        }
        renderItem={({ item, index }) => {
          return (
            <>
              <AccessSecurityCard
                image={item.clientLogo}
                clientName={item.clientName}
                permissions={getPermission(item.permissions)}
                code={item.otp}
                expiry={item.ttl}
              />
            </>
          );
        }}
      />
    </>
  );
});

export default SecurityScreen;
