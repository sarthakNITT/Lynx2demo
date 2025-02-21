import {Platform} from 'react-native';

export const HorizontalPadding = 9;
export const HeaderHeight = 45;
export const ICON_SIZE = 20;
export const ICON_SIZE_LARGE = 25;

//Form validation constants
export const EVENT_TITLE_MAX_SIZE = 100;
export const EVENT_DESC_MAX_SIZE = 750;
export const CLUB_DESCRIPTION_MAX_SIZE = 900;
export const FEEDBACK_MAX_LENGTH = 250;
export const ANNOUNCEMENT_MAX_TITLE_LENGTH = 100;
export const ANNOUNCEMENT_MAX_LENGTH = 750;
export const MAX_EVENT_TAG_COUNT = 5;
export const MAX_EVENT_LINK_COUNT = 3;
export const MAX_TAG_LENGTH = 20;
export const MAX_CALENDAR_NOTICE_TITLE = 100;
export const MAX_CALENDAR_NOTICE_DESCRIPTION = 300;

// Club user page description line limit
export const NUMBER_OF_LINES = 1;

export const FONT =
  Platform.OS === 'android' ? 'SourceSansPro-Regular' : 'HelveticaNeue-Bold';

//file count
export const MAX_ANNOUNCEMENT_FILE_COUNT = 5;
export const MAX_IMAGES_IN_EVENT = 5;

//file sizes in MB
export const MAX_ANNOUNCEMENT_FILE_SIZE = 3;
export const MAX_EVENT_IMAGE_SIZE = 3;
export const MAX_STUDENT_PROFILE_PIC = 2;
export const MAX_CLUB_PROFILE_PICTURE = 2;

//number of links
export const MAX_LINKS_ANNOUNCEMENT = 5;

export const FONT_SIZE_USERPAGE_TITLE = 12;

//minimum password length
export const PASSWORD_LENGTH = 6;

//shadow opacity
export const SHADOW_OPACITY = Platform.OS === 'ios' ? 0.1 : 0.26;
