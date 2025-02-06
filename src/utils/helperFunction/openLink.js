import {Linking} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import * as colors from '../../utils/colors';
export const openLink = async url => {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#453AA4',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'currentContext',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: 'white',
        secondaryToolbarColor: colors.Secondary,
        navigationBarColor: 'white',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
        showInRecents: true,
        // // Specify full animation resource identifier(package:anim/name)
        // // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
      });
    } else {
      console.log('Open in Browser');
      Linking.openURL(url);
    }
  } catch (error) {
    console.log('ERROR' + error);
    Linking.openURL(url);
  }
};
