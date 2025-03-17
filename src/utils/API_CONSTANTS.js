// export const API_BASE_URL = 'https://nittapp.spider-nitt.org/';
export const API_BASE_URL = 'https://nittappdev.spider-nitt.org/';
export const API_CDN_URL = 'https://d1bn8n4samjo70.cloudfront.net/';

//development
// export const GET_BASE_URL =
//   'https://ankursinha03.github.io/nittAppUrl/devBaseUrl';
// export const GET_BASE_CDN = 'https://ankursinha03.github.io/nittAppUrl/devCDN';

//production
export const GET_BASE_URL = 'https://ankursinha03.github.io/nittAppUrl/baseUrl';
export const GET_BASE_CDN = 'https://ankursinha03.github.io/nittAppUrl/cdn';

export const GET_ANDROID_VERSION =
  'https://ankursinha03.github.io/nittAppUrl/androidVersion';

export const APP_PLAYSTORE_URL =
  'https://play.google.com/store/apps/details?id=org.spider.nittapp';
export const DEEP_LINK_BASE_URL = 'https://lynx.spider-nitt.org';

export const API_FEED_SCREEN_MESSAGES='api/class/messageList';

export const API_STUDENT_LOGIN = '/auth/student/login';

export const API_LYNXGPT_REQUEST = '/api/lynxGPT/join-waitlist';

export const API_LYNXGPT_QUERY = '/api/lynxGPT/query';

export const API_LYNXGPT_ACCEPT = '/api/lynxGPT/get-gpt-request-status'

export const API_CLUB_LOGIN = '/auth/club/login';

export const API_SEND_OTP = '/auth/student/sendOtp';

export const API_VERIFY_OTP = '/auth/student/verifyOtp';

export const API_STUDENT_REGISTER = 'auth/student/register';

export const API_ADD_EVENT = '/api/events/add-events';

export const API_EVENT_LIST = '/api/calendar/eventList';

export const API_ADMIN_EVENT_LIST = 'api/calendar/admin/events';

export const API_ADD_CALENDAR_NOTICE = 'api/admin/event/add-events';

export const API_EVENT_BY_ID = '/api/eventById/';

export const API_GET_IMAGE = API_CDN_URL;

export const API_GET_STUDENT_DETAILS = '/api/student/detail';

export const API_GET_STUDENT_CLUBS = '/api/student/followList';

export const API_GET_STUDENT_INTERESTS = '/api/student/interest/list';

export const API_DELETE_STUDENT_INTEREST = '/api/student/interest/remove';

export const API_EDIT_PROFILE_STUDENT = 'api/student/edit';

export const API_EDIT_PROFILE_CLUB = 'api/club/edit-clubs';

export const API_CLUB_REGISTER = 'api/club/edit-clubs';

export const API_IS_FOLLOWING = '/api/student/is-following/';

export const API_FOLLOW_TOGGLE = '/api/student/follow/';

// export const NO_IMAGE_URL = 'https://d1bn8n4samjo70.cloudfront.net/noimage.jpg';

export const NO_IMAGE_URL = 'https://photosbull.com/wp-content/uploads/2024/05/no-dp_16.webp';

export const API_UPCOMING_EVENTS = 'api/student/upcoming-events';

export const API_CIRCULAR_CREATION = '/api/circular';

export const API_SEARCH = '/api/search';

//temporary firebase reg token
export const reg_token = '123abc';

export const API_RESET_PASSWORD_GENERATE_OTP_CLUBS =
  'auth/forgotpwd/club/sendOtp';

export const API_RESET_PASSWORD_VALIDATE_OTP_CLUBS =
  'auth/forgotpwd/club/validateOtp';

export const API_RESET_PASSWORD_CLUBS = 'auth/forgotpwd/club/newPassword';

export const API_RESET_PASSWORD_VALIDATE_STUDENT =
  'auth/forgotpwd/student/webmail';

export const API_RESET_PASSWORD_STUDENT = 'auth/forgotpwd/student/newPassword';

export const API_CLUB_DATA_BY_ID = 'api/getclub/';

export const API_CLUB_UPCOMING_EVENTS_BY_ID = 'api/upcomingClubEvents/';

export const API_CLUB_PAST_EVENTS_BY_ID = 'api/pastClubEvents/';

export const API_TOGGLE_INTERESTED = '/api/student/interest/toggle/';

export const API_STUDENT_INTERESTED_IN_EVENT =
  '/api/student/interest/is-interested/';

export const API_CLUB_LIST = '/api/clubList/club';

export const API_SUBSCRIBE_TOGGLE = '/api/student/subscribe/';

export const API_GET_CLUB_UPCOMING_EVENTS = '/api/upcomingClubEvents/';

export const API_NEW_MESSAGE='api/message/create/';

export const API_STUDENT_ACTIVITY = 'api/notifications/student';

export const API_CLUB_ACTIVITY = 'api/notifications/club';

export const API_POST_ADD_EVENT = '/api/events/add-events';

export const API_CLUB_EDITEVENT = '/api/events/edit-events/';

export const API_GET_CLUB_PAST_EVENTS = '/api/pastClubEvents/';

export const API_GET_CLUB_DETAILS = '/api/getclub/';

export const API_GET_DELETE_CLUB_EVENTS = '/api/events/delete-events/';

export const API_GET_CIRCULAR_BY_ID = '/api/circularById/';

export const API_FEEDBACK = '/api/feedback/submit';

export const API_LOGOUT_STUDENT = 'api/student/logout';

export const API_LOGOUT_CLUB = '/api/club/logout';

export const API_DELETE_CALENDAR_NOTICE = '/api/admin/event/delete-events/';

export const API_REFRESH_JWT = '/auth/token/refresh';

export const API_GET_DEPARTMENT = '/api/department-list';

export const API_RESET_PASSWORD_GENERATE_OTP_STUDENTS =
  'auth/forgotpwd/student/sendOtp';

export const API_RESET_PASSWORD_VALIDATE_OTP_STUDENTS =
  'auth/forgotpwd/student/validateOtp';

export const DELETE_CIRCULARS = '/api/circular/delete-circular/';

export const RECAPTCHA_SITE_KEY = '6LdC9MEeAAAAABrsEfgcqmACunw6R2Qeargy08zG';

export const API_CIRCULAR_LIST = '/api/circularList/recentCirculars';

export const API_CLUB_CIRCULAR_BY_ID = 'api/circularList/byClubId/';

export const API_GET_ID = 'https://lynxidapis.spider-nitt.org/api/lynx/getID';

export const API_GET_SECURITY_KEYS =
  'https://restapis.lcas.spider-nitt.org/fetchOTP';

export const DELETE_STUDENT_ACCOUNT = 'api/student/delete';
