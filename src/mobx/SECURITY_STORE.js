import {action, makeObservable, observable, computed} from 'mobx';

class Secure_Data {
  state = {
    loading: false,
    data: [],
    error: false,
    errorText: '',
    refreshing: false,
  };

  reset = () => {
    this.state.error = false;
    this.state.errorText = '';
    this.state.data = [];
    this.state.loading = false;
    this.state.refreshing = false;
  };

  setLoading = val => {
    this.state.loading = val;
  };

  get getLoading() {
    return this.state.loading;
  }
  setData = val => {
    this.state.data = val;
  };

  get getData() {
    return this.state.data;
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
  setRefreshing = val => {
    this.state.refreshing = val;
  };

  get getRefreshing() {
    return this.state.refreshing;
  }

  constructor() {
    makeObservable(this, {
      state: observable,

      setError: action,
      getError: computed,

      setRefreshing: action,
      getRefreshing: computed,

      setErrorText: action,
      getErrorText: computed,

      setData: action,
      getData: computed,

      setLoading: action,
      getLoading: computed,

      reset: action,
    });
  }
}

export const SECURE_STORE = new Secure_Data();
