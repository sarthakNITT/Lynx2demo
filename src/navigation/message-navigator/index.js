import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Header from '../../components/Header';
import {USER_STORE} from '../../mobx/USER_STORE';
// import ClubDescriptionScreen from '../../screens/ClubDescriptionScreen';
// import EditProfileScreen from '../../screens/EditProfileScreen';
// import EditClubProfileScreen from '../../screens/EditProfileScreen_Club';
// import SettingsSceen from '../../screens/SettingsScreen';
// import StudentUserScreen from '../../screens/StudentUserScreen';
// import UserScreen from '../../screens/UserScreen';
import * as color from '../../utils/colors';
import {STUDENT} from '../../utils/USER_TYPE';
// import CircularListScreen from '../../screens/ClubDescriptionScreen/CircularList';
// import AnnouncementDetailScreen from '../../screens/AnnouncementDetailScreen';
// import QRScreen from '../../screens/QRScreen';
import NewMessageScreen from '../../screens/MessageScreen/index';
const MessageStack = createNativeStackNavigator();

function MessageNavigator() {
  const isStudent = USER_STORE.getUserType === STUDENT;
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen
        name="MessageScreen"
        component={NewMessageScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          header: props => <Header props={props} />,
          gestureEnabled: false,
        }}
      />
    </MessageStack.Navigator>
  );
}

export default MessageNavigator;