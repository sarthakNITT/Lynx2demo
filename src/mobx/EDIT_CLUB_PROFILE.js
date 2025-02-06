import {action, computed, makeObservable, observable} from 'mobx';
import {NO_IMAGE_URL} from '../utils/API_CONSTANTS';

class ClubProfile {
  state = {
    clubImage: NO_IMAGE_URL,
    image: {},
    clubDescription: '',
    instagramLink: '',
    websiteLink: '',
    facebookLink: '',
    youtubeLink: '',
    linkedInLink: '',
    mediumLink: '',
    error: false,
    errorText: '',
    success: false,
    loading: false,
  };

  reset = () => {
    this.state.clubImage = NO_IMAGE_URL;
    this.state.image = {};
    this.state.clubDescription = '';
    this.state.instagramLink = '';
    this.state.websiteLink = '';
    this.state.facebookLink = '';
    this.state.youtubeLink = '';
    this.state.linkedInLink = '';
    this.state.mediumLink = '';
    this.state.error = false;
    this.state.errorText = '';
    this.state.loading = false;
    this.state.success = false;
  };

  setClubDescription = val => {
    this.state.clubDescription = val;
  };

  get getClubDescription() {
    return this.state.clubDescription;
  }

  setClubImage = val => {
    this.state.clubImage = val;
  };

  get getClubImage() {
    return this.state.clubImage;
  }

  setImage = img => {
    this.state.image = img;
  };

  get getImage() {
    return this.state.image;
  }

  setInstagramLink = val => {
    this.state.instagramLink = val;
  };

  get getInstagramLink() {
    return this.state.instagramLink;
  }

  setWebsiteLink = val => {
    this.state.websiteLink = val;
  };

  get getWebsiteLink() {
    return this.state.websiteLink;
  }

  setFacebookLink = val => {
    this.state.facebookLink = val;
  };

  get getFacebookLink() {
    return this.state.facebookLink;
  }

  setYoutubeLink = val => {
    this.state.youtubeLink = val;
  };

  get getYoutubeLink() {
    return this.state.youtubeLink;
  }

  setLinkedInLink = val => {
    this.state.linkedInLink = val;
  };

  get getLinkedInLink() {
    return this.state.linkedInLink;
  }

  setMediumLink = val => {
    this.state.mediumLink = val;
  };

  get getMediumLink() {
    return this.state.mediumLink;
  }

  setError = val => {
    this.state.error = val;
  };

  get getError() {
    return this.state.error;
  }

  setErrorText = val => {
    this.state.errorText = val;
  };

  get getErrorText() {
    return this.state.errorText;
  }

  setLoading = val => {
    this.state.loading = val;
  };

  get getLoading() {
    return this.state.loading;
  }

  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,
      setInstagramLink: action,
      getInstagramLink: computed,

      setFacebookLink: action,
      getFacebookLink: computed,

      setMediumLink: action,
      getMediumLink: computed,

      setLinkedInLink: action,
      getLinkedInLink: computed,

      setYoutubeLink: action,
      getYoutubeLink: computed,

      setWebsiteLink: action,
      getWebsiteLink: computed,

      setClubDescription: action,
      getClubDescription: computed,

      setClubImage: action,
      getClubImage: computed,

      setImage: action,
      getImage: computed,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,

      setSuccess: action,
      getSuccess: computed,
    });
  }
}

export const EDIT_CLUB_PROFILE_STORE = new ClubProfile();
