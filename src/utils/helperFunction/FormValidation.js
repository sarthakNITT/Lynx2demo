import moment from 'moment';
import {Linking} from 'react-native';
import {CLUB_REGISTER_STORE} from '../../mobx/CLUB_REGISTER_STORE';
import {EDIT_CLUB_PROFILE_STORE} from '../../mobx/EDIT_CLUB_PROFILE';

export const containOnlyNumbers = value => {
  var numbers = /^[0-9]+$/;
  if (value.match(numbers)) {
    return true;
  }
  return false;
};

export const isAadharValid = aadhar => {
  if (!containOnlyNumbers(aadhar)) return false;
  if (aadhar.trim().length === 12) return true;
  return false;
};

//deprecated
export const isStudentNameValid = name => {
  let letters = /^[A-Za-z ]+$/;
  if (name.match(letters)) {
    return true;
  }
  return false;
};

export const isValidLink = async link => {
  const res = await Linking.canOpenURL(link);
  console.log(res);
  return res;
};

export const validFileSize = (size, limit) => {
  if (size > limit * 1000000) return false;
  return true;
};

export const checkClubLinks = async () => {
  CLUB_REGISTER_STORE.setLinkError(-1);
  var er = false;
  if (EDIT_CLUB_PROFILE_STORE.getWebsiteLink != '') {
    const web = await isValidLink(
      EDIT_CLUB_PROFILE_STORE.getWebsiteLink.trim(),
    );
    if (!web) {
      CLUB_REGISTER_STORE.setLinkError(0);
      er = true;
    }
  }

  if (EDIT_CLUB_PROFILE_STORE.getInstagramLink != '') {
    const instagarm = await isValidLink(
      EDIT_CLUB_PROFILE_STORE.getInstagramLink.trim(),
    );
    if (!instagarm) {
      CLUB_REGISTER_STORE.setLinkError(1);
      er = true;
    }
  }
  if (EDIT_CLUB_PROFILE_STORE.getFacebookLink != '') {
    const facebook = await isValidLink(
      EDIT_CLUB_PROFILE_STORE.getFacebookLink.trim(),
    );
    if (!facebook) {
      CLUB_REGISTER_STORE.setLinkError(2);
      er = true;
    }
  }
  if (EDIT_CLUB_PROFILE_STORE.getYoutubeLink != '') {
    const youtube = await isValidLink(
      EDIT_CLUB_PROFILE_STORE.getYoutubeLink.trim(),
    );
    if (!youtube) {
      CLUB_REGISTER_STORE.setLinkError(3);
      er = true;
    }
  }

  if (EDIT_CLUB_PROFILE_STORE.getLinkedInLink != '') {
    const linkedin = await isValidLink(
      EDIT_CLUB_PROFILE_STORE.getLinkedInLink.trim(),
    );
    if (!linkedin) {
      CLUB_REGISTER_STORE.setLinkError(4);
      er = true;
    }
  }
  if (EDIT_CLUB_PROFILE_STORE.getMediumLink != '') {
    const medium = await isValidLink(
      EDIT_CLUB_PROFILE_STORE.getMediumLink.trim(),
    );
    if (!medium) {
      CLUB_REGISTER_STORE.setLinkError(5);
      er = true;
    }
  }

  return er;
};

export const isValidDOB = dob => {
  var eighteenYearsAgo = moment().subtract(16, 'years');
  var birthday = moment(dob);

  if (!birthday.isValid()) {
    return false;
  } else if (eighteenYearsAgo.isAfter(birthday)) {
    return true;
  } else {
    return false;
  }
};
