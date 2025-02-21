import {action, computed, makeObservable, observable} from 'mobx';

const maxSubjectLength = 150;
const maxAnnouncementLength = 300;

class Announcement {
  state = {
    loading: false,
    error: false,
    errorText: '',
    success: false,

    title: '',
    description: '',
    link: '', //current input
    links: [], //Array of Links
    files: [],
    official: false,

    subjectLength: maxSubjectLength,
    announcementLength: maxAnnouncementLength,
  };
  reset = () => {
    this.state.loading = false;
    this.state.error = false;
    this.state.errorText = '';
    this.state.success = false;
    this.state.title = '';
    this.state.description = '';
    this.state.link = ''; //current input
    this.state.links = []; //Array of Links
    this.state.files = [];
    (this.state.official = false),
      (this.state.subjectLength = maxSubjectLength);
    this.state.announcementLength = maxAnnouncementLength;
  };
  setSuccess = val => {
    this.state.success = val;
  };

  get getSuccess() {
    return this.state.success;
  }

  setLoading = val => {
    this.state.loading = val;
  };

  get getLoading() {
    return this.state.loading;
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

  setTitle = val => {
    this.state.title = val;
  };

  get getTitle() {
    return this.state.title;
  }

  setDescription = val => {
    this.state.description = val;
  };

  get getDescription() {
    return this.state.description;
  }

  setLink = val => {
    this.state.link = val;
  };

  get getLink() {
    return this.state.link;
  }

  setLinks = val => {
    this.state.links = val;
  };

  get getLinks() {
    return this.state.links;
  }
  setFiles = val => {
    this.state.files = val;
  };

  get getFiles() {
    return this.state.files;
  }

  setOfficial = val => {
    this.state.official = val;
  };

  get getOfficial() {
    return this.state.official;
  }

  constructor() {
    makeObservable(this, {
      state: observable,
      reset: action,

      setTitle: action,
      getTitle: computed,

      setDescription: action,
      getDescription: computed,

      setLink: action,
      getLink: computed,

      setLinks: action,
      getLinks: computed,

      setFiles: action,
      getFiles: computed,

      setLoading: action,
      getLoading: computed,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setSuccess: action,
      getSuccess: computed,

      setOfficial: action,
      getOfficial: computed,
    });
  }
}

export const ANNOUNCEMENT_CREATION_STORE = new Announcement();
