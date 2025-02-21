import { action, computed, makeObservable, observable } from 'mobx';

class lynxgptRequest {
  state = {
    error: false,
    errorText: '',
    loading: true,
    success: false,
    data: {
      message: '',
    },
    refreshing: false,
  };

  reset = () => {
    this.state.error = false;
    this.state.errorText = '';
    this.state.loading = true;
    this.state.success = false;
    this.state.data = {};
    this.state.refreshing = false;
  };

  setRefreshing = val => {
    this.state.refreshing = val;
  };

  get getRefreshing() {
    return this.state.refreshing;
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

  setData = val => {
    this.state.data = val;
  };

  get getData() {
    return this.state.data;
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
      setError: action,
      getError: computed,

      setErrorText: action,
      getErrorText: computed,

      setLoading: action,
      getLoading: computed,

      setData: action,
      getData: computed,

      setSuccess: action,
      getSuccess: computed,

      setRefreshing: action,
      getRefreshing: computed,

      reset: action,
    });
  }
}

export const LYNXGPT_REQUEST = new lynxgptRequest();
