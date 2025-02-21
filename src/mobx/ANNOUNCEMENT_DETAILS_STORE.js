import {action, computed, makeObservable, observable} from 'mobx';

class Announcement {
  state = {
    id: '',
    data: {links: [], documents: [], club: {}},

    loading: false,
    error: false,
    errorText: '',
  };

  reset = () => {
    this.state.id = '';
    this.state.data = {links: [], documents: [], club: {}};
    this.state.loading = false;
    this.state.error = false;
    this.state.errorText = '';
  };

  setId = val => {
    this.state.id = val;
  };

  get getId() {
    return this.state.id;
  }

  setData = val => {
    this.state.data = val;
  };

  get getData() {
    return this.state.data;
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

  constructor() {
    makeObservable(this, {
      state: observable,

      setId: action,
      getId: computed,

      setLoading: action,
      getLoading: computed,

      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setData: action,
      getData: computed,

      reset: action,
    });
  }
}

export const ANNOUNCEMENT_DETAILS_STORE = new Announcement();
